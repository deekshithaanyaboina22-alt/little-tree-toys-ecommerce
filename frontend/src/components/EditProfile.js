import { useState, useEffect } from 'react';
import '../styles/Account.css';
import axios from 'axios';

function EditProfile() {

    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

useEffect(() => {

  const savedUser = JSON.parse(

    localStorage.getItem("user")

  );

  if (savedUser) {
    setName(savedUser.name);
    setPhone(savedUser.phone);
    setAddress(savedUser.address || "");

    setUser(savedUser);

  }

}, []);

if (!user) {

  return null;

}

const handleSave = async () => {

  try {

    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    const response = await axios.put(

      "https://little-tree-toys-ecommerce.onrender.com/update-profile",

      {

        name,

        phone,

        address

      },

      {

        headers: {

          Authorization: token

        }

      }

    );

    alert("Profile updated successfully");

    localStorage.setItem(
     "user",
     JSON.stringify(response.data.user)
);

    console.log(response.data);

    console.log(response.data.user);

  } catch (error) {

    console.log(error);

    alert("Failed to update profile");

  }

};

  return (

    <section className="account-section">

      <div className="account-card">

        <h1>
  Edit Profile
</h1>

<p className="account-subtitle">
  Update your personal information.
</p>


<h3>
  Edit Information
</h3>

<div className="account-form">

 <input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
<input
  type="tel"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>

  <textarea
  rows="4"
  value={address}
  onChange={(e) => setAddress(e.target.value)}
/>

  <button
  className="submit-btn"
  onClick={handleSave}
>
  Save Changes
</button>

</div>
      </div>

    </section>

  );

}

export default EditProfile;