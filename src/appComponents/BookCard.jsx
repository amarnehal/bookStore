import dbServices from "@/appWrite/db/db";
import PropTypes from "prop-types";
// import PrimaryButton from "./PrimaryButton";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookCard = ({ book, userId = "", loggedInUserId = "" }) => {
  const { author, name, price, description, image, $id, category } = book;

  const isCurrentUserBook = userId === loggedInUserId;

  const navigate = useNavigate();

  function handleBookUpdate(book) {
    navigate(`/books/${book.$id}`);
  }

  /////to delete book ////
  async function handleBookDelete(book) {
    try {
      const fileToDelete = await dbServices.deleteFile(book.fileId);
      if (fileToDelete) {
        const bookToDelete = await dbServices.deleteBook(book.$id);
        if (bookToDelete) {
          toast.warn("Book has been Removed");
          navigate("/");
        }
      }
    } catch (error) {
      console.log("Failed to delete this book", error);
      alert("Failed to remove this book");
    }
  }

  //// navigate to book detail page//
  function handleBookInfo(bookId) {
    navigate(`/bookInfo/${bookId}`);
  }

  return (
    <div className="w-full p-4" key={$id}>
      <div className="relative bg-[#6E6876] flex w-70 flex-col rounded-xl bg-clip-border text-white shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-[#5C596A]">
        <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-none bg-clip-border text-white shadow-lg shadow-rose-600/40  from-rose-500 to-rose-600">
          <img
            className="w-full h-full object-contain"
            src={image}
            alt={name}
          />
        </div>
        <div className="p-6">
          <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-white antialiased">
            Name: {name}
          </h5>
          <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
            <span className="font-semibold text-white">Price:Rs. </span>
            {price}
          </p>
          <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
            <span className="font-semibold text-white">Author: </span>
            {author}
          </p>
          <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
            <span className="font-semibold text-white">Category: </span>
            {category}
          </p>
          <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
            <span className="font-semibold text-white">Description: </span>
            {description}
          </p>
        </div>
        <div className="p-6 pt-0">
          {loggedInUserId ? (
            isCurrentUserBook ? (
              <div className="flex flex-col w-full">
                <button
                  className="mb-2 select-none rounded-lg bg-rose-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-rose-600/20 transition-all hover:shadow-lg hover:shadow-rose-600/40 focus:opacity-85 focus:shadow-none active:opacity-85 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  onClick={() => handleBookUpdate(book)}
                >
                  Update
                </button>
                <button
                  className="select-none rounded-lg bg-rose-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-rose-600/20 transition-all hover:shadow-lg hover:shadow-rose-600/40 focus:opacity-85 focus:shadow-none active:opacity-85 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  onClick={() => handleBookDelete(book)}
                >
                  Delete
                </button>
                <ToastContainer />
              </div>
            ) : (
              <button className="select-none rounded-lg bg-rose-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-rose-600/20 transition-all hover:shadow-lg hover:shadow-rose-600/40 focus:opacity-85 focus:shadow-none active:opacity-85 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                View More
              </button>
            )
          ) : (
            <button
              onClick={() => handleBookInfo(book.$id)}
              className="select-none rounded-lg bg-rose-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-rose-600/20 transition-all hover:shadow-lg hover:shadow-rose-600/40 focus:opacity-85 focus:shadow-none active:opacity-85 active:shadow-none
             disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              View More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
BookCard.propTypes = {
  book: PropTypes.shape({
    $id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    fileId: PropTypes.string,
    category: PropTypes.string,
  }),
  userId: PropTypes.string,
  loggedInUserId: PropTypes.string,
};

export default BookCard;
