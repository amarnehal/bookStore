import PropTypes from "prop-types";

const PrimaryButton = ({
  children,
  type = "button",
  bgColor = "bg-lime-700",
  textColor = "text-white",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`${bgColor} ${textColor} rounded-xl font-bold py-2 px-4  hover:bg-emerald-800 ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["submit"]),
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  className: PropTypes.string,
};

export default PrimaryButton;
