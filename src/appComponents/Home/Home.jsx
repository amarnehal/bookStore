import { fetchAllBooks } from "@/store/features/bookSlice";
import { useDispatch, useSelector } from "react-redux";
import BookCard from "../BookCard";
import { useEffect } from "react";
import PrimaryButton from "../PrimaryButton";

const Home = () => {
  const booksInfo = useSelector((store) => store.book.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  return (
    <>
      <div className="w-full mr-0 grid gap-4 p-8 sm:grid-cols-2 grid-cols-1 bg-[#FFCDB2]">
        <div className="mt-2">
          <img
            className="w-full shadow-xl rounded-3xl h-auto md:h-96 object-cover"
            src="/Images/cover.jpg"
            alt="Banner Image"
          />
        </div>
        <div className="text-center rounded-3xl bg-[#B5838C] sm:h-4/6 h-5/6 mt-10">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl text-white md:text-3xl font-bold m-4">
            Welcome to My Website
          </h1>
          {/* Short Quote */}
          <p className="text-sm text-center md:text-xl max-w-md mx-auto text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <PrimaryButton className="m-4 bg-red-600">Learn More</PrimaryButton>
        </div>
      </div>
      <div className="w-full h-1/4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#6E6876]">
        {/* /////About Us /// */}
        <div className="p-8 ">
          <h2 className="p-4 text-center text-white text-2xl sm:text-3xl font-bold border-b-4 border-[#FFCDB2]">
            Who we are !
          </h2>
          <p className="text-white text-wrap mt-3">
            At BookMate, we believe that managing your book collection should be
            as enjoyable as reading the books themselves. Our intuitive
            interface and robust features are crafted to provide a seamless and
            enriching user experience. Say goodbye to the hassle of disorganized
            shelves and unread piles of books. Embrace a smarter way to manage
            your reading life with BookMate. Join the BookMate community today
            and turn your reading passion into a well-organized, insightful, and
            shared experience. Happy reading!
          </p>
        </div>
        <div className="p-8 h-3/4 sm:w-4/5 w-full">
          <img
            className="h-full w-full rounded-2xl"
            src="/Images/library.jpg"
            alt="lbraryImage"
          />
        </div>
      </div>

      <div className="w-full grid bg-[#6E6876]">
        {/* Products Section */}
        <div className="col-span-1 p-4 mb-2">
          <h2 className="m-4 text-center text-white text-2xl sm:text-3xl font-bold border-b-4 border-[#FFCDB2]">
            Our Books
          </h2>
          <p className="text-white text-center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
          </p>
          <div className="w-full mt-2 p-5 grid gap-4 grid-cols-1 sm:grid-cols-3 bg-[#B5838C] rounded-3xl">
            {booksInfo.length > 0 ? (
              booksInfo.map((book) => (
                <BookCard
                  key={book.$id}
                  id={book.$id}
                  author={book.author}
                  name={book.name}
                  price={book.price}
                  description={book.description}
                  image={book.image}
                  book={book}
                  className="w-full"
                />
              ))
            ) : (
              <h1>No Books found. Please Login</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
