/* eslint-disable react/prop-types */
function Button({ children, onClick, onMouseEnter, onMouseLeave }) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative rounded-xl bg-sky-950 px-3 py-2 text-white hover:bg-sky-300 hover:text-gray-950"
    >
      {children}
    </button>
  );
}

export default Button;
