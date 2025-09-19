import "./Alert.css";

const Alert = ({ children, type = "info" }) => {
  return <div className={`alert ${type}`}>{children}</div>;
};

export default Alert;
