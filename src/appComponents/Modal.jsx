import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Input from "./Input";
import PrimaryButton from "./PrimaryButton";
import { X } from "lucide-react";
import emailjs from "@emailjs/browser";
import config from "@/config/config";

const Modal = ({ onClose }) => {
  const [error, setError] = useState(""); // State to handle error messages
  const { register, handleSubmit } = useForm(); // React Hook Form setup

  const formRef = useRef(); // Reference to the form
  const modalRef = useRef(); // Reference to the modal container for click detection

  // Function to close the modal when clicking outside of it
  function closeModal(e) {
    if (modalRef.current === e.target) {
      onClose();
    }
  }

  // Function to handle form submission
  async function inquiryForm() {
    setError("");
    try {
      const response = await emailjs.sendForm(
        config.emailjsServiceId,
        config.emailjsTemplateId,
        formRef.current,
        { publicKey: config.emailjsPublicKey }
      );
      if (response.status === 200) {
        alert("Message sent to user");
        onClose(); // Close the modal on success
      } else {
        alert("Some error occurred");
      }
    } catch (error) {
      console.log("Failed to send inquiry", error);
      setError("Failed to send message. Please try again later.");
    }
  }

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
    >
      <div className="bg-red-900 text-white p-8 rounded-lg relative max-w-lg w-full">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <X size={30} />
        </button>
        <h2 className="text-center text-2xl font-bold mb-4">
          Send enquiry to the user
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form ref={formRef} onSubmit={handleSubmit(inquiryForm)}>
          <div className="space-y-4">
            <Input
              label="Name: "
              placeholder="Enter Your Name"
              type="text"
              className="w-full"
              {...register("name", { required: true })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                      value
                    ) || "Email address must be valid",
                },
              })}
            />
            <label className="block mb-1 pl-1">Message: </label>
            <textarea
              name="message"
              className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
              {...register("message", { required: true })}
            ></textarea>
          </div>
          <PrimaryButton type="submit" className="bg-rose-700 w-full mt-4">
            Send
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Modal;
