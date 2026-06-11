import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Account.css';

function Account({

  user,

  setUser

}) {

  const navigate = useNavigate();

  const [isLoginMode, setIsLoginMode] = useState(true);

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [phone, setPhone] = useState('');


  const [password, setPassword] = useState('');

  const [address, setAddress] = useState("");

  useEffect(() => {

  const savedUser = localStorage.getItem("user");

  if (savedUser) {

    setUser(

      JSON.parse(savedUser)

    );

  }

},
 [setUser]);
  
   const handleRegister = async () => {

  try {

   const response = await axios.post(

      "http://localhost:5000/register",

      {

        name,

        email,

        phone,

         address,

        password

      }

    );

    alert("Account created successfully!");

    console.log("Updated User:", response.data.user);

  } catch (error) {

  console.log(error);

  console.log(error.response.data);

  alert(

  error.response?.data?.message ||

  "Registration failed"

);

}
};

  const handleLogin = async () => {

  try {

    const response = await axios.post(

      "http://localhost:5000/login",

      {

        email,

        password

      }

    );

    localStorage.setItem(

      "token",

      response.data.token

    );

    setUser(response.data.user);

     localStorage.setItem(

    "user",

    JSON.stringify(response.data.user)

);

alert("Login successful!");

    console.log(response.data);

  } catch (error) {

  console.log(error);

  console.log(error.response?.data);

  alert(

    error.response?.data?.message ||

    "Login failed"

  );

}
  }



  return (

    <section className="account-section">

      <div className="account-card">

       <h1>
        My Account
      </h1>

        <p className="account-subtitle">
     {user
    ? "Manage your profile, orders and shopping activity."
    : "Welcome to Little Tree Toys."}
     </p>
       {!user && (

        <>
       <div className="account-actions">

          <button
            onClick={() => setIsLoginMode(true)}
          >
            Sign In
          </button>

           <button
             className="secondary-btn"
             onClick={() => setIsLoginMode(false)}
            >
              Register
            </button>

            </div>

           <div className="account-form">

         {!isLoginMode && (

              <input
               type="text"
               placeholder="Full Name"
               value={name}
               onChange={(e) =>
               setName(e.target.value)
            }
          />

         )}

         {!isLoginMode && (

         <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
            setPhone(e.target.value)
           }
         />

        )}


        {!isLoginMode && (

        <input
            type="text"
           placeholder="Address"
           value={address}
           onChange={(e) =>
            setAddress(e.target.value)
          }
  />

)}
           <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
          setEmail(e.target.value)
          }
        />

         <input
           type="password"
           placeholder="Password"
           value={password}
            onChange={(e) =>
            setPassword(e.target.value)
           }
       />

         <button
           className="submit-btn"
           onClick={
           isLoginMode
           ? handleLogin
           : handleRegister
            }
            >

        {isLoginMode
        ? 'Sign In'
        : 'Create Account'}

      </button>

         </div>

         </>

)}


{user && (

  <div className="account-info">


   <div className="profile-details">

  <h3>Profile Information</h3>

  <div className="profile-item">
    <span>Name</span>
    <p>{user.name}</p>
  </div>

  <div className="profile-item">
    <span>Email</span>
    <p>{user.email}</p>
  </div>

  <div className="profile-item">
    <span>Phone</span>
    <p>{user.phone}</p>
  </div>

  <div className="profile-item">
  <span>Address</span>
  <p>
    {user.address || "Not Added Yet"}
  </p>
</div>

</div>


    <div className="account-links">

    <button
       
       onClick={() => navigate('/edit-profile')}
         >
        Edit Profile
      </button>


      <button
       onClick={() => navigate('/my-orders')}
      >
         My Orders
        </button>

      <button
        onClick={() => {

         localStorage.removeItem("token");

        localStorage.removeItem("user");

         setUser(null);
        }}
      >
        Logout
      </button>

    </div>

  </div>

)}

      </div>

    </section>

  );

}

export default Account;