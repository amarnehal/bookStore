import PropTypes from "prop-types";
import PrimaryButton from "./PrimaryButton";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Select from "./Select";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchBookById } from "@/store/features/bookSlice";
import { updateBook } from "@/store/features/bookSlice";
import Spinner from "./Spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateBook = () => {
  // const [error, setError] = useState("");
  const [bookToUpdateLocal, setBookToUpdateLocal] = useState(null);
  const userData = useSelector((store) => store.auth.userData);
  const bookToUpdate = useSelector((store) => store.book.book);
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    name = "",
    category = "",
    description = "",
    price = "",
    rating = "",
    author = "",
    image = "",
  } = bookToUpdate || {};

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      name,
      category,
      description,
      price,
      rating,
      author,
      image,
    },
  });
  const { errors } = formState;

  //// categories
  const categories = [
    { id: 101, name: "Comic" },
    { id: 102, name: "Fiction" },
    { id: 103, name: "Kids" },
    { id: 104, name: "Finance" },
    { id: 105, name: "History" },
    { id: 106, name: "Science" },
  ];

  useEffect(() => {
    dispatch(fetchBookById(bookId))
      .then((action) => {
        setBookToUpdateLocal(action.payload);
        reset(action.payload);
      })
      .catch((error) => console.log(error));
  }, [dispatch, bookId]);

  if (!bookToUpdateLocal) {
    // Display loading spinner or placeholder
    return <Spinner />;
  }

  async function updateBookForm(data) {
    toast.success("Book has been updated successfully !");
    if (data) {
      console.log("data from book update and userData", data, userData?.$id);
      dispatch(updateBook({ data: data, userId: userData?.$id }))
        .then((response) => console.log("response", response))
        .catch((error) => console.log("error in updating", error));
      navigate("/");
    } else {
      toast.error("Failed to Update the Book. Try Again !");
    }
  }

  return (
    <>
      <div className="w-full sm:w-full  md:full p-4">
        <div className="mt-1 flex items-center justify-center w-full">
          <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
            <h2 className="my-3 p-1 text-center text-white text-3xl bg-blue-950 rounded-xl">
              Update Book
            </h2>
            <form
              onSubmit={handleSubmit(updateBookForm)}
              className="w-full"
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
                  <p className="m-2 text-rose-700">{errors?.price?.message}</p>
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
                      placeholder="Autor name"
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
                <p className="m-2 text-rose-700">{errors?.image?.message}</p>
                <PrimaryButton
                  type="submit"
                  className="bg-rose-600 w-full mt-6"
                >
                  Update Book
                </PrimaryButton>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateBook;
UpdateBook.propTypes = {
  Book: PropTypes.shape({
    $id: PropTypes.string,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }),
};
