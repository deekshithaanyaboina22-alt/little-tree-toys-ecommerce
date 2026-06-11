require("dotenv").config();

const express = require("express");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const cors = require("cors");

const User = require("./models/User");

const Order = require("./models/Order");


const app = express();

app.use(cors());

app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY;

mongoose.connect(process.env.MONGO_URI)
.then(() => {

  console.log("MongoDB Connected");
  console.log(mongoose.connection.name);

})

.catch((error) => {

  console.log(error);

});


const products = [

  {
    id: 1,
    name: "Wooden Rainbow Stacker",
    price: 1499
  },

  {
    id: 2,
    name: "Forest Animal Puzzle",
    price: 999
  },

  {
    id: 3,
    name: "Pull Along Elephant",
    price: 1299
  }

];



app.get("/", (req, res) => {

  res.send("Little Tree Toys Backend");

});

app.get("/products", (req, res) => {

  res.json(products);

});

app.get("/products/:id", (req, res) => {

  const productId = Number(req.params.id);

  const product = products.find(
    item => item.id === productId
  );

  if (!product) {

    return res.status(404).json({

      message: "Product not found"

    });

  }

  res.json(product);

});


app.post("/orders", async (req, res) => {

  const authHeader = req.headers.authorization;


  if (!authHeader) {

    return res.status(401).json({

      message: "Access denied"

    });

  }


const token = authHeader.split(" ")[1];

  try {

    const decoded = jwt.verify(
      token,
      SECRET_KEY
    );

    const { products, totalAmount } = req.body;

    const order = await Order.create({

      userId: decoded.id,

      products,

      totalAmount

    });

    res.status(201).json({

      message: "Order placed successfully",

      order

    });

  } catch {

    res.status(401).json({

      message: "Invalid token"

    });

  }

});

app.get("/orders", async (req, res) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {

    return res.status(401).json({

      message: "Access denied"

    });

  }

const token = authHeader.split(" ")[1];

  try {

    const decoded = jwt.verify(

      token,

      SECRET_KEY

    );

    const orders = await Order.find({

      userId: decoded.id

    });

    res.status(200).json({

      orders

    });

  } catch {

    res.status(401).json({

      message: "Invalid token"

    });

  }

});


app.get("/admin/orders", async (req, res) => {

  try {

    const orders = await Order.find();

    const ordersWithUsers = await Promise.all(

      orders.map(async (order) => {

        const user = await User.findById(order.userId);

        return {

          ...order.toObject(),

          customerName: user?.name,

          customerPhone: user?.phone,

          customerAddress: user?.address

        };

      })

    );

    res.status(200).json({

      orders: ordersWithUsers

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Failed to fetch orders"

    });

  }

});

app.put("/admin/orders/:id", async (req, res) => {

  try {

    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(

      req.params.id,

      {
        status
      },

      {
        new: true
      }

    );

    res.status(200).json({

      message: "Order status updated",

      order: updatedOrder

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Failed to update order"

    });

  }

});


app.get("/test-order", (req, res) => {

  const order = {

    name: "Deechu",

    address: "Hyderabad"

  };

  res.json(order);

});


app.post("/register", async (req, res) => {

 
   const { name, email, phone, address, password } = req.body;
   if (!name || !email || !phone || !address || !password) {

    return res.status(400).json({

      message: "Name, email, phone, address and password are required"
    });

  }

  const existingUser = await User.findOne({

    email

  });

  if (existingUser) {

    return res.status(400).json({

      message: "Email already registered"

    });

  }

  const hashedPassword = await bcrypt.hash(

    password,

    10

  );

 const user = await User.create({

  name,

  email,

  phone,

  address,

  password: hashedPassword

});

  res.status(201).json({

    id: user._id,

    name: user.name,

    email: user.email

  });

});


app.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({

  email

});


  if (!user) {

    return res.status(401).json({

      message: "Invalid email or password"

    });

  }

  const passwordMatch = await bcrypt.compare(

    password,

    user.password

  );

  if (!passwordMatch) {

    return res.status(401).json({

      message: "Invalid email or password"

    });

  }

   const token = jwt.sign(

  {

    id: user.id,

    email: user.email

  },

  SECRET_KEY,

  {

    expiresIn: "1h"

  }

);

res.status(200).json({

  message: "Login successful",

  token,

 user: {

  id: user.id,

  name: user.name,

  email: user.email,

  phone: user.phone,

  address: user.address

}

})

});

app.get("/profile", (req, res) => {

  const token = req.headers.authorization;

  if (!token) {

    return res.status(401).json({

      message: "Access denied"

    });

  }

  try {

    const decoded = jwt.verify(

      token,

      SECRET_KEY

    );

    res.status(200).json({

      message: "Profile accessed",

      user: decoded

    });

  } catch {

    res.status(401).json({

      message: "Invalid token"

    });

  }

});

app.put("/update-profile", async (req, res) => {

  const token = req.headers.authorization;

  if (!token) {

    return res.status(401).json({

      message: "Access denied"

    });

  }

  try {

    const decoded = jwt.verify(

      token,

      SECRET_KEY

    );

    const { name, phone, address } = req.body;

    console.log(req.body);

    console.log("ADDRESS RECEIVED:", address);

    const updatedUser = await User.findByIdAndUpdate(

      decoded.id,

      {

        name,

        phone,

        address

      },

      {

        new: true

      }

    );

    res.status(200).json({


      message: "Profile updated",

      user: updatedUser

    });
    console.log("UPDATED USER:", updatedUser);

  } catch {

    res.status(401).json({

      message: "Invalid token"

    });

  }

});



app.listen(5000, () => {

  console.log("Express server running on port 5000");

});

