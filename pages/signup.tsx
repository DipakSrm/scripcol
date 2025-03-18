import React, { useState } from "react";
import { useAuth } from "./hooks/authenication";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { account } from "@/utils/appwrite";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const SignUpForm = () => {

  const { signUp } = useAuth();
  const [pass, setpass] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const router = useRouter();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // You can access the form data in the `formData` state object here
    // For example, you can send it to your API for user registration
    try {
      await signUp(formData.email, formData.password, formData.name);
      router.push("/login");
      console.log("Form data submitted:", formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-4 p-4 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password:
          </label>
          <input
            type={pass ? `text` : `password`}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            minLength={8}
            required
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
          />
          <FontAwesomeIcon
            icon={faEye}
            className="w-3 p-2 cursor-pointer"
            onClick={() => setpass(!pass)}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Sign Up
        </button>
        or{" "}
        <button
          onClick={() => router.push("/login")}
          className="w-full my-4 py-2 px-4 bg-white border-2 border-blue-500 text-black font-semibold rounded hover:bg-slate-100 "
        >
          Sign In
        </button>
        <button
          onClick={() => account.createOAuth2Session('google')}
          className="w-full my-4 py-2 px-4 bg-white border-2 border-blue-500 text-black font-semibold rounded hover:bg-slate-100 "
        >
          Sign In With Google <FontAwesomeIcon icon={faGoogle} />
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
