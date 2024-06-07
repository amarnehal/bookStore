import React, { useId } from "react";
import PropTypes from "prop-types";

const Select = React.forwardRef(
  ({ label, options, className = "", ...props }, ref) => {
    const Id = useId();
    return (
      <div className="w-full">
        {label && <label htmlFor={Id}>{label}</label>}
        <select
          id={Id}
          ref={ref}
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-grey-50 duration-200 border border-gray-200 w-full ${className}`}
          {...props}
        >
          {options
            ? options.map((option) => (
                <option key={option.id} value={option.name}>
                  {option.name}
                </option>
              ))
            : null}
        </select>
      </div>
    );
  }
);

Select.propTypes = {
  label: PropTypes.string,
  // options: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};
Select.displayName = "Select";

export default Select;
