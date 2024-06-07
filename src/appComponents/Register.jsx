import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import appWriteAuth from "@/appWrite/auth/authService";
import PrimaryButton from "./PrimaryButton";
import dbServices from "@/appWrite/db/db";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  async function registerUser(data) {
    setErrors("");
    if (data !== null) {
      const { name, email, password, phone, streetAddress, city, postalCode } =
        data;

      const userAccount = await appWriteAuth.createAccount({
        name,
        email,
        password,
      });
      const userId = userAccount.$id;
      const newUser = await dbServices.registerUserWithDetails({
        userId,
        streetAddress,
        city,
        postalCode,
        phone,
        name,
        email,
      });
      toast.success("User Registered Successfully !");
      if (newUser) {
        navigate("/login");
      }
    } else {
      toast.error("Failed to register user !");
      console.log("failed to register user");
    }
  }

  return (
    <>
      <div className="flex flex-row mt-2 items-center justify-center w-full">
        <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
          <h2 className="text-center text-2xl font-bold leading-tight ">
            Register your account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Already have an account.
            <Link
              to="/login"
              className="font-medium text-rose-600 transition-all duration-200 hover:text-rose-900"
            >
              Login
            </Link>
          </p>
          {errors && <p className="text-red-500 mt-8 text-center">{errors}</p>}
          <form onSubmit={handleSubmit(registerUser)} className="w-full mt-2">
            <div className="space-y-2">
              <Input
                label="Name: "
                placeholder="Enter Full Name here"
                {...register("name", { required: "Name is required" })}
              />
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
              <Input
                label="Phone: "
                placeholder="Enter your phone number here"
                type="tel"
                {...register("phone", { required: "Phone number is required" })}
              />
              <Input
                label="Street: "
                placeholder="Enter street address here"
                {...register("streetAddress", {
                  required: "Please enter street address",
                })}
              />
              <Input
                label="City: "
                placeholder="Enter city name here"
                {...register("city", { required: "City name is required" })}
              />
              <div className="flex flex-row  flex-shrink">
                <div className="w-1/2 mx-2">
                  <Input
                    label="Country: "
                    placeholder="Enter Country here"
                    {...register("country", {
                      required: "COuntry name is required",
                    })}
                  />
                </div>
                <div className="w-1/2">
                  <Input
                    label="Postal-Code: "
                    placeholder="Enter postal Code "
                    {...register("postalCode", {
                      required: "Postal code is required",
                    })}
                  />
                </div>
              </div>

              <PrimaryButton type="submit" className="w-full bg-rose-600">
                Register
              </PrimaryButton>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};
export default Register;
