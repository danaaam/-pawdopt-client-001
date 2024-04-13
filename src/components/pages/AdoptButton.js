import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdoptButton = ({ imageUrl }) => {
  const [isAdoptFormVisible, setIsAdoptFormVisible] = useState(false);
  const [email, setEmail] = useState('')
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [address, setAddress] = useState('');
  const [contactinfo, setContactInfo] = useState('');
  const navigate = useNavigate();


  const useremail = localStorage.getItem('email')

  const handleAdoptFormVisibility = () => {
    setIsAdoptFormVisible(!isAdoptFormVisible);
  };

  const handleSubmitAdoptionRequest = async () => {
    try {
      const token = localStorage.getItem('token');
      const verified = localStorage.getItem('verified');
      if (!token) {
        toast.error("You need to log in first, please log in");
        navigate('/login');
        return;
      }
      if (!verified) {
        toast.error('Not yet verified, Click Ok to see Verification status');
        navigate('/valid');
        return;
      }
      
      const adoptionData = {
        firstname,
        lastname,
        address,
        contactinfo,
        imageUrl: imageUrl, 
      };
  
      const response = await axios.post(
        'http://localhost:8000/api/adoption/request',
        adoptionData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      if (response.status === 201) {
        toast.success("Successfully submitted a request");
      } else {
        console.error("Error submitting adoption request:", response.data.error);
      }
    } catch (error) {
      console.error("Error submitting adoption request:", error);
    }
  };

  return (
    <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center px-5 py-5">
    <div
      className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
      style={{ maxWidth: 1000 }}
    >
      <div className="md:flex w-full">
        <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
          <div className="text-center mb-10">
            <h1 className="font-bold text-3xl text-gray-900">Register</h1>
            <p>Enter your information to register</p>
          </div>
          <div>
            <div className="flex -mx-3">
              {/* First Name */}
              <div className="w-1/2 px-3 mb-5">
                <label htmlFor className="text-xs font-semibold px-1">
                  First name
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-account-outline text-gray-400 text-lg" />
                  </div>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="fistname"
                    onChange={(e) => setFirstname(e.target.value)}
                    value={firstname}
                    required
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                  />
                </div>
              </div>
              {/* Last Name */}
              <div className="w-1/2 px-3 mb-5">
                <label htmlFor className="text-xs font-semibold px-1">
                  Last name
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-account-outline text-gray-400 text-lg" />
                  </div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastname"
                    onChange={(e) => setLastname(e.target.value)}
                    value={lastname}
                    required
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                  />
                </div>
              </div>
            </div>
            {/* Email */}
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                <label htmlFor className="text-xs font-semibold px-1">
                  Email
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                  </div>
                  <input
                    type="text"
                    placeholder="Email Address"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                  />{useremail}
                </div>
              </div>
            </div>
            {/* Contact Info */}
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                <label htmlFor className="text-xs font-semibold px-1">
                  Contact Number
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                  </div>
                  <input
                    type="text"
                    placeholder="Contact Number"
                    name="contactinfo"
                    onChange={(e) => setContactInfo(e.target.value)}
                    value={contactinfo}
                    required
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                  />
                </div>
              </div>
            </div>
            {/* Address */}
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                <label htmlFor className="text-xs font-semibold px-1">
                  Address
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                  </div>
                  <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    required
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                  />
                </div>
              </div>
            </div>
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleSubmitAdoptionRequest}>Submit</button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleAdoptFormVisibility}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AdoptButton;
