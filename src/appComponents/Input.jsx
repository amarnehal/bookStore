import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, name, type = "text", className = "", ...props },
  ref
) {
  const Id = useId();
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={Id}>
          {label}
        </label>
      )}
      <input
        name={name}
        type={type}
        {...props}
        id={Id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      />
    </div>
  );
});

export default Input;
