import "./Input.css";

const Input = ({ value, onChange, placeholder }) => (
  <input
    className="input"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

export default Input;
