import "./Input.css";

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
  min,
  max,
  ...props
}) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field"
        min={min}
        max={max}
        {...props}
      />
    </div>
  );
};

export default Input;
