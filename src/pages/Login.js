import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { login as loginAction } from '../features/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const [login, setLogin] = useState({
    email: '',
    password: ''
  });

  const loggedIn = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/loginUser`, login)

      .then((jsonRes) => {
        localStorage.setItem('token', jsonRes.data.token);
        dispatch(loginAction(jsonRes.data));

        setLogin((prev) => {
          return {
            ...prev,
            email: '',
            password: ''
          };
        });
        router('/');
      })
      .catch((error) => {
        console.log(error.response);
        toast.warning(error.response.data.message || 'Something went wrong!', {
          theme: 'dark',
          position: 'top-right',
          autoClose: 5000
        });
      });
  };

  return (
    <div className="bg-grey-lighter min-h-screen bg-slate-100 bg-opacity-60 flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-lg mt-2 text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Log in</h1>

          <input
            type="text"
            onChange={(event) => {
              setLogin((prev) => {
                return {
                  ...prev,
                  email: event.target.value
                };
              });
            }}
            value={login.email}
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
          />

          <input
            type="password"
            onChange={(event) => {
              setLogin((prev) => {
                return {
                  ...prev,
                  password: event.target.value
                };
              });
            }}
            value={login.password}
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
          />

          <button
            onClick={loggedIn}
            className="w-full text-center py-3 rounded bg-brand-3 text-white hover:bg-green-dark focus:outline-none my-1">
            Log in
          </button>
        </div>
        <div className=" mt-6 flex gap-2 items-center">
          <span className="text-gray-400">Do not have an account?</span>
          <span className=" text-gray-400 hover:text-blue-600 font-semibold">
            <Link to="/signup">Sign up</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
