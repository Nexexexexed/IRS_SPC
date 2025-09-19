import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname === "/") return "Дашборд";
    if (location.pathname.startsWith("/citizens/"))
      return "Информация о гражданине";
    if (location.pathname.startsWith("/citizens")) return "Картотека граждан";
    return "Система управления";
  };

  return (
    <header className="header">
      <h1>{getTitle()}</h1>
      <nav>
        <Link to="/">Дашборд</Link>
        <Link to="/citizens">Картотека</Link>
      </nav>
    </header>
  );
};

export default Header;
