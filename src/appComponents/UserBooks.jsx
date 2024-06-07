import { useEffect, useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooks, getBooksByUser } from "@/store/features/bookSlice";
import Select from "./Select.jsx";
import BookCard from "./BookCard";
import { createBook } from "@/store/features/bookSlice";
import { X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserBooks = () => {
  const [bookModal, setBookModal] = useState(false);

  const [error, setError] = useState("");
  /// get logIn user info
  const userData = useSelector((store) => store.auth?.userData);
  /// get Books by Logged in user
  const booksByUser = useSelector((store) => store.book.filteredBooks);
  /// react form
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const dispatch = useDispatch();

  ////// fetch all books
  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  //// fetch books by login user
  useEffect(() => {
    if (userData) {
      dispatch(getBooksByUser(userData?.$id));
    }
  }, [dispatch, userData]);

  //// categories
  const categories = [
    { id: 101, name: "Comic" },
    { id: 102, name: "Fiction" },
    { id: 103, name: "Kids" },
    { id: 104, name: "Finance" },
    { id: 105, name: "History" },
    { id: 106, name: "Science" },
  ];

  /////////pop up modal for new book////
  function handleBookModel() {
    setBookModal(true);
  }
  const handleClickOutside = (e) => {
    if (e.target.id === "overlay") {
      setBookModal(false);
    }
  };

  ////////// add new Book /////////
  function addNewBook(data) {
    toast.success("Book Created SuccessFully !");
    dispatch(createBook({ data: data, userId: userData?.$id }))
      .unwrap()
      .then((result) => {
        // Clear form fields or provide other feedback upon successful book creation
        setBookModal(false);
        dispatch(getBooksByUser(userData.$id));
        console.log("Book created successfully:", result);
      })
      .catch((error) => {
        setError(error.message || "Failed to create a new book");
      });
  }

  return (
    <>
      <div className="flex flex-col min-h-screen bg-[#6E6876]">
        <div className=" text-white p-6">
          <h1 className="text-center text-2xl font-bold mb-2">
            List of your books
          </h1>
          <PrimaryButton className="text-center" onClick={handleBookModel}>
            Add NewBook
          </PrimaryButton>

          {/* ///////////////////book Model////////////////// */}
          {bookModal && (
            <div
              id="overlay"
              onClick={handleClickOutside}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
            >
              <div className="bg-[#B5838C] text-white p-6 rounded-lg max-w-lg w-full mx-4">
                <button
                  className="absolute top-4 right-4"
                  onClick={() => setBookModal(false)}
                >
                  <X size={30} />
                </button>

                <h2 className="text-white text-2xl font-bold mb-2">
                  Create a new Book
                </h2>
                {error && <p className="text-rose-700 text-center">{error}</p>}
                <form
                  onSubmit={handleSubmit(addNewBook)}
                  className="w-full relative"
                  noValidate
                >
                  <div className="space-y-2">
                    <Input
                      label="Name: "
                      placeholder="Enter Book Name"
                      className="w-full"
                      {...register("name", {
                        required: { value: true, message: "Name is required" },
                      })}
                    />
                    <p className="m-2 text-rose-700">{errors?.name?.message}</p>
                    <Select
                      label="Category: "
                      options={categories}
                      {...register("category", { required: true })}
                    ></Select>
                    <Input
                      label="Description: "
                      placeholder="Description here"
                      {...register("description", {
                        required: {
                          value: true,
                          message: "Please enter description",
                        },
                      })}
                    />
                    <p className="m-2 text-rose-700">
                      {errors?.description?.message}
                    </p>
                    <div className="flex flex-row flex-shrink">
                      <div className="w-1/2 mx-1">
                        <Input
                          label="price: "
                          type="number"
                          min={50}
                          max={4000}
                          step="any"
                          {...register("price", {
                            required: {
                              value: true,
                              message: "Price is required",
                            },
                          })}
                        />
                      </div>
                      <p className="m-2 text-rose-700">
                        {errors?.price?.message}
                      </p>
                      <div className="w-1/2 ">
                        <Input
                          label="Rating: "
                          type="number"
                          min={1}
                          max={5}
                          {...register("rating", {
                            required: {
                              value: true,
                              message: "Please select between 1 to 5",
                            },
                          })}
                        />
                        <p className="m-2 text-rose-700">
                          {errors?.rating?.message}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row flex-shrink">
                      <div className="w-full mx-1">
                        <Input
                          label="Author: "
                          placeholder="Author name"
                          {...register("author", {
                            required: {
                              value: true,
                              message: "Author name is required",
                            },
                          })}
                        />
                        <p className="m-2 text-rose-700">
                          {errors?.author?.message}
                        </p>
                      </div>
                    </div>
                    <Input
                      label="Image: "
                      type="file"
                      accept="image/png, image/jpeg"
                      {...register("image", {
                        required: {
                          value: true,
                          message:
                            "File is required image must be from these formats jpg, jpeg, png",
                        },
                      })}
                    />
                    <p className="m-2 text-rose-700">
                      {errors?.image?.message}
                    </p>
                    <PrimaryButton
                      type="submit"
                      className="bg-rose-600 w-full mt-6"
                    >
                      Add Book
                    </PrimaryButton>
                  </div>
                </form>
                <ToastContainer />
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 p-8 bg-[#B5838C] rounded-3xl mb-3">
          {booksByUser && booksByUser.length > 0 ? (
            booksByUser.map((book) => (
              <div key={book.$id}>
                <BookCard
                  userId={book.userId}
                  loggedInUserId={userData.$id}
                  book={book}
                />
              </div>
            ))
          ) : (
            <h1 className="p-4 text-white">No books found. Please add.</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default UserBooks;
