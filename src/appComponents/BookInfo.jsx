import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBookById } from "@/store/features/bookSlice";
import { getUserById } from "@/store/features/userSlice";
import Modal from "./Modal";

const BookInfo = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();

  /////if user is logedIn///////////
  const authUser = useSelector((store) => store.auth);
  const navigate = useNavigate();

  // Fetching book data from Redux store

  const book = useSelector((store) => store.book.book);
  const user = useSelector((store) => store.user.userInfo);
  const isLoading = useSelector((store) => store.user.isLoading);
  const isError = useSelector((store) => store.user.isError);

  ////////Inquiry Form ////////////////////////////
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch book by ID when the component mounts or bookId changes
  useEffect(() => {
    dispatch(fetchBookById(bookId));
  }, [bookId, dispatch]);

  // Fetch user details when the book data is available and userId exists
  useEffect(() => {
    if (book && book.userId) {
      dispatch(getUserById(book.userId));
    }
  }, [book, dispatch]);

  // Loading and error states for book
  if (!book) {
    return <div className="container mx-auto p-4 text-center">Loading...</div>;
  }
  if (isLoading) {
    return (
      <div className="container mx-auto p-4 text-center">Loading user...</div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4 text-center">
        Failed to load user.
      </div>
    );
  }

  function handleFormData() {
    ///// if user is logged in ////
    if (authUser.status === true) {
      setIsModalOpen(true);
    } else {
      alert("Please LogIn first");
      navigate("/login");
    }
  }
  return (
    <div className="w-full p-4 flex flex-col min-h-screen bg-[#FFCDB2]">
      <div className="bg-[#6E6876] text-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 w-full h-80 relative mb-6 md:mb-0">
            <img
              className="w-3/4 sm:w-full h-full object-fill rounded-lg shadow-lg"
              src={book.image}
              alt={book.name}
            />
          </div>
          <div className="md:w-2/3 w-full md:pl-6">
            <div className="container flex justify-evenly">
              <div className="bookDatailsCard">
                <h1 className="text-xl Sm:text-2xl font-semibold mb-4">
                  Name-{book.name}
                </h1>
                <p className="mb-2">
                  <span className="font-bold">Price: Rs. </span>
                  {book.price}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Author: </span>
                  {book.author}
                </p>
                <p className="mb-4 me-3">
                  <span className="font-bold">Description: </span>
                  {book.description}
                </p>
              </div>

              <div className="userDetailsCard">
                <h1 className="text-xl sm:text-2xl font-semibold mb-4">
                  PostedBy- {user.name}
                </h1>
                {user?.email && (
                  <p className="mb-2">
                    <span className="font-bold">Email: </span>
                    {user.email}
                  </p>
                )}
                {user?.city && (
                  <p className="mb-4">
                    <span className="font-bold">City: </span>
                    {user.city}
                  </p>
                )}
              </div>
            </div>

            <button
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleFormData}
            >
              Send Enquiry
            </button>
            {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
