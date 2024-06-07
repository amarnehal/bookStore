import { useDispatch } from "react-redux";
import { logOut } from "@/store/features/authSlice";
import appWriteAuth from "@/appWrite/auth/authService";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../PrimaryButton";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogOut() {
    appWriteAuth
      .logOutUser()
      .then(() => {
        dispatch(logOut());
        navigate("/");
      })
      .catch((error) => {
        console.log("Failed to logOut some error occured ", error);
      });
  }

  return (
    <PrimaryButton
      className=" text-gray-300 hover:bg-gray-700  hover:text-white"
      onClick={handleLogOut}
    >
      LogOut
    </PrimaryButton>
  );
};

export default Logout;
