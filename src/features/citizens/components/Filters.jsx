import { useState } from "react";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import "./Filter.css";

const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: "",
    gender: "",
    status: "",
  });

  const handleChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const cleared = { search: "", gender: "", status: "" };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  return (
    <div className="filters">
      <Input
        placeholder="Поиск по ФИО"
        value={filters.search}
        onChange={(e) => handleChange("search", e.target.value)}
      />

      <select
        value={filters.gender}
        onChange={(e) => handleChange("gender", e.target.value)}
      >
        <option value="">Все полы</option>
        <option value="Мужской">Мужской</option>
        <option value="Женский">Женский</option>
      </select>

      <select
        value={filters.status}
        onChange={(e) => handleChange("status", e.target.value)}
      >
        <option value="">Все статусы</option>
        <option value="Активен">Активен</option>
        <option value="Неактивен">Неактивен</option>
        <option value="В процессе">В процессе</option>
      </select>

      <Button variant="outline" onClick={clearFilters}>
        Очистить
      </Button>
    </div>
  );
};

export default Filters;
