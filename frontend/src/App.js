import React, { useState, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';

import Shop from './components/Shop';

import ProductPage from './components/ProductPage';

import Wishlist from './components/Wishlist';

import Cart from './components/Cart';

import Checkout from './components/Checkout';

import OrderConfirmed from './components/OrderConfirmed';

import Account from './components/Account';

import MyOrders from './components/MyOrders';

import EditProfile from './components/EditProfile';

import AdminOrder from "./components/AdminOrder";

import Navbar from './components/Navbar';

import Hero from './components/Hero';

import Collections from './components/Collections';

import Featured from './components/Featured';

import WhyChooseUs from './components/WhyChooseUs';

import Testimonials from './components/Testimonials';

import OurStory from './components/OurStory';

import Footer from './components/Footer';


function HomePage() {

  return (

    <>

      <Hero />

      <Collections />

      <Featured />

      <WhyChooseUs />

      <Testimonials />

      

    </>

  );
}

function App() {

  const [user, setUser] = useState(() => {

  const savedUser = localStorage.getItem("user");

  return savedUser
    ? JSON.parse(savedUser)
    : null;

   });

  const [wishlist, setWishlist] = useState([]);


 const [cart, setCart] = useState([]);

 useEffect(() => {

  if (!user) {

    setCart([]);

    setWishlist([]);

    return;

  }

  const savedCart = localStorage.getItem(

    `cart_${user.email}`

  );

  const savedWishlist = localStorage.getItem(

    `wishlist_${user.email}`

  );

  setCart(

    savedCart
      ? JSON.parse(savedCart)
      : []

  );

  setWishlist(

    savedWishlist
      ? JSON.parse(savedWishlist)
      : []

  );

}, [user]);

useEffect(() => {

  if (!user) return;

  localStorage.setItem(

    `wishlist_${user.email}`,

    JSON.stringify(wishlist)

  );

}, [wishlist, user]);

useEffect(() => {

  if (!user) return;

  localStorage.setItem(

    `cart_${user.email}`,

    JSON.stringify(cart)

  );

}, [cart, user]);


  const toggleWishlist = (productId) => {

    if (wishlist.includes(productId)) {

      setWishlist(

        wishlist.filter(
          (id) => id !== productId
        )

      );

    } else {

      setWishlist([
        ...wishlist,
        productId
      ]);

    }

  };

    const addToCart = (product) => {

  const alreadyInCart = cart.find(

    (item) => item.id === product.id

  );

  if (alreadyInCart) {

    setCart(

      cart.filter(
        (item) => item.id !== product.id
      )

    );

  } else {

    setCart([
      ...cart,
      product
    ]);

  }

};
  
  const removeFromCart = (productId) => {

    setCart(

      cart.filter(
        (item) => item.id !== productId
      )

    );

  };


  return (

    <>
       

        <Navbar

            wishlistCount={wishlist.length}

             cartCount={cart.length}

          />
      <Routes>

           <Route
              path="/"
             element={<HomePage />}
         />


  <Route

    path="/shop"

    element={

      <Shop

           wishlist={wishlist}

           toggleWishlist={toggleWishlist}

           cart={cart}

           addToCart={addToCart}


      />

    }

  />

  <Route
  path="/about"
  element={<OurStory />}
/>

<Route

  path="/wishlist"

  element={

    <Wishlist

      wishlist={wishlist}

      toggleWishlist={toggleWishlist}

      cart={cart}

      addToCart={addToCart}

    />

  }

/>
  

  <Route

  path="/product/:id"

  element={

    <ProductPage

      wishlist={wishlist}

      toggleWishlist={toggleWishlist}

      cart={cart}

      addToCart={addToCart}

    />

  }

/>

  <Route

      path="/cart"

      element={

   <Cart

  cart={cart}

  removeFromCart={removeFromCart}

/> 
  }

/>

<Route
  path="/checkout"
  element={

    <Checkout

      cart={cart}

      setCart={setCart}

    />

  }
/>

<Route
  path="/order-confirmed"
  element={<OrderConfirmed />}
/>

<Route
  path="/my-orders"
  element={<MyOrders />}
/>

<Route
  path="/admin-order"
  element={<AdminOrder/>}
/>

<Route
  path="/account"
  element={

    <Account

      user={user}

      setUser={setUser}

    />

  }
  />

  <Route
  path="/edit-profile"
  element={<EditProfile />}
/>
  </Routes>

      <Footer />

    </>

  );
}


export default App;