import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn as authLogin } from "@/store/features/authSlice";
import { useForm } from "react-hook-form";
import Input from "./Input";
import appWriteAuth from "@/appWrite/auth/authService";
import PrimaryButton from "./PrimaryButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  async function login(data) {
    setError("");
    try {
      console.log("User data found, showing toast notification");
      toast.success("Login Successfull !", { position: "top-center" });
      const session = await appWriteAuth.loginAccount(data);
      if (session) {
        const userData = await appWriteAuth.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      toast.error("Failed to login !", { position: "top-center" });
      console.log("error occured in login", error);
      setError(error.message);
    }
  }

  return (
    <div className="mt-5 mb-6 flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <h2 className="text-center text-2xl font-bold leading-tight ">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/register"
            className="font-medium text-rose-600 transition-all duration-200 hover:text-rose-900"
          >
            Register
          </Link>
        </p>
        {error && <p className="text-red-500 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                      value
                    ) || "Email address must be valid ",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            <PrimaryButton type="submit" className="bg-rose-700 w-full">
              Log In
            </PrimaryButton>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
