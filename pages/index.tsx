import ReactDOM from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import axios from "axios";
import { User } from "@/utils/interfaces";

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      const response = await axios.post("/api/user/", {
        Name: data.Name,
        Email: data.Email,
        Password: data.Password,
      });
      if (response.status === 201) {
        console.log(response);
        console.log("sent sucessfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-200 h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mx-auto p-4 w-1/2 bg-white"
      >
        <label>First Name</label>
        <input {...register("Name")} className="bg-slate-300" />
        <label htmlFor="email">Email</label>
        <input
          {...(register("Email"), errors)}
          id="email"
          className="bg-slate-300"
        />
        <label htmlFor="password">Password</label>
        <input
          {...(register("Password"), {})}
          id="password"
          className="bg-slate-300"
        />
        <button type="submit" className="bg-black text-white">
          Get Started
        </button>
      </form>
    </div>
  );
}
