import { useEffect, useState } from "react";
import { getUserById } from "@/store/features/userSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  console.log("userId", userId);
  useEffect(() => {
    dispatch(getUserById(userId))
      .then((response) => {
        setUser(response.payload);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error in getting the user", error);
        setError(error);
        setLoading(false);
      });
  }, [dispatch, userId]);
  console.log("user", user);
  return (
    <div className="bg-[#6E6876] text-white flex-grow h-full">
      <div className="p-8 mb-2">
        <h1 className="text-center text-2xl">User Profile</h1>
      </div>
      <hr />
      <div className="container w-3/4 mx-auto p-8 bg-[#B5838C] rounded-3xl mt-2 mb-3">
        {loading && <h2>Loading.....</h2>}
        {error && <h2>Error loading user data</h2>}
        {!loading && !error && user && (
          <>
            <h2 className="mb-2">Name : {user.name}</h2>
            <p className="mb-2">Phone :+91{user.phone}</p>
            <p className="mb-2">Email :{user.email}</p>
            <p className="mb-2">Street :{user.streetAddress}</p>
            <p className="mb-2">City :{user.city}</p>
            <p className="mb-2">PostalCode :{user.postalCode}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
