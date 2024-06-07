import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dbServices from "../../appWrite/db/db";

///////////////////////////// fetching allBooks /////////////

export const fetchAllBooks = createAsyncThunk("fetchAllBooks", async () => {
  try {
    const booksList = await dbServices.getBooks();
    return booksList?.documents;
  } catch (error) {
    console.log("error occured in getting the books ", error);
  }
});

//////////////////////////// fetch single Book byId ///////////

export const fetchBookById = createAsyncThunk(
  "fecthBookById",
  async (bookId, { rejectWithValue }) => {
    try {
      if (bookId) {
        const book = await dbServices.getBook(bookId);
        if (book) {
          return book;
        } else {
          return rejectWithValue("Book not found");
        }
      }
    } catch (error) {
      console.log("Failed to fetch book by Id ", error);
      return rejectWithValue("Failed to fetch book by ID");
    }
  }
);

//////////////////////// create new book /////////////////////

export const createBook = createAsyncThunk(
  "createBook",
  async ({ data, userId }, { rejectWithValue }) => {
    console.log("book Slice create Book data and userId -----", data, userId);
    try {
      /// create file
      if (data?.image[0]) {
        const fileId = await dbServices.fileUpload(data?.image[0]);
        /// getting image url using fileId
        if (fileId) {
          const imageFile = await dbServices.getFilePreview(fileId);
          /// after getting file saving it to db
          const newBook = await dbServices.createBook({
            ...data,
            image: imageFile.href,
            fileId: fileId,
            userId: userId,
          });
          return newBook;
        } else {
          console.log("Failed to fetch the image");
        }
      } else {
        console.log("Failed to upload image");
      }
    } catch (error) {
      console.log("error occured in creating a new book ", error);
      return rejectWithValue(
        "Failed to create a new book. Please try again later."
      );
    }
  }
);

//////////////////////////// Updating Book /////////////////////////

export const updateBook = createAsyncThunk(
  "updateBook",
  async ({ data, userId }, { rejectWithValue }) => {
    console.log("Data recived in Update store book", data, userId);
    try {
      if (data && userId) {
        /// handle file upload ////
        console.log("data and userId from book Update slice", data, userId);
        const fileId = await dbServices.fileUpload(data?.image[0]);
        if (fileId) {
          console.log("File ID from slice update", fileId);
          //// save image reference in db////
          const image = await dbServices.getFilePreview(fileId);

          console.log("Image from updatedBook slice -----", image);
          //// remove old file ///
          await dbServices.deleteFile(data?.fileId);

          //// saving new file to db ////////
          const updatedBook = await dbServices.updateBook(data.$id, {
            ...data,
            price: parseInt(data.price, 10),
            rating: parseFloat(data.rating),
            image: image.href,
            userId: userId,
          });
          if (updatedBook) {
            console.log("Book has been updated", updatedBook);
            return updatedBook;
          } else {
            return rejectWithValue("Failed to Update the Book.");
          }
        } else {
          console.log("File Id not recieved ");
          return rejectWithValue(
            "Failed to Upload the Image. Please try again later."
          );
        }
      }
    } catch (error) {
      console.log("Failed to update the book ", error);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: {
    isLoading: true,
    success: false,
    data: [],
    filteredBooks: [],
    book: null,
    message: "",
    isError: false,
  },
  reducers: {
    addBook: (state, action) => {
      state.success = true;
      state.data.push(action.payload);
    },
    getBooksByUser: (state, action) => {
      console.log("action payload book", action.payload);
      state.filteredBooks = state.data.filter((book) => {
        return book.userId == action.payload;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.data = action.payload;
    });
    builder.addCase(fetchAllBooks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.error.message || "Error fetching books";
    });

    //////// for new Book //////
    builder.addCase(createBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.success = true;
      state.message = "New Book has been created";
    });
    builder.addCase(createBook.pending, (state) => {
      state.isLoading = true;
      state.message = "Creating new book";
    });
    builder.addCase(createBook.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.error.message || "Failed to create a new book";
    });

    //////////////////// fetching a single book /////////////////
    builder.addCase(fetchBookById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.message = "Book found";
      state.book = action.payload;
    });
    builder.addCase(fetchBookById.pending, (state) => {
      state.isLoading = true;
      state.message = "Loading book please wait";
    });
    builder.addCase(fetchBookById.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.error.message || "Failed to get book ";
      state.isError = true;
    });

    /////////////////update Book ///////////////////////////////
    builder.addCase(updateBook.fulfilled, (state, action) => {
      console.log("book to update action.payload.update : ", action.payload);
      state.isLoading = false;
      state.message = "Book updated successfully !!";
      state.data = state.data.map((book) =>
        book.id === action.payload.id ? action.payload : book
      );
    });
    builder.addCase(updateBook.pending, (state) => {
      state.isLoading = true;
      state.message = "Updating book please wait";
    });
    builder.addCase(updateBook.rejected, (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.message = action.error.message || "Failed to update the book";
      state.isError = true;
    });
  },
});

export const { getAllBooks, addBook, getBooksByUser } = bookSlice.actions;
export default bookSlice.reducer;
