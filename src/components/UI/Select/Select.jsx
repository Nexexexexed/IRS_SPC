import "./Select.css";

const Select = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Выберите...",
  className = "",
}) => {
  return (
    <div className={`select-group ${className}`}>
      {label && <label className="select-label">{label}</label>}
      <select value={value} onChange={onChange} className="select-input">
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
