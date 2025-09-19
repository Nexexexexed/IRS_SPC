import { useState } from "react";
import Select from "../../../components/UI/Select/Select";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import "./Filter.css";

const Filters = ({ onFilterChange, onClearFilters }) => {
  const [filters, setFilters] = useState({
    search: "",
    gender: "",
    status: "",
    ageFrom: "",
    ageTo: "",
    maritalStatus: "",
    education: "",
  });

  const genderOptions = [
    { value: "Мужской", label: "Мужской" },
    { value: "Женский", label: "Женский" },
  ];

  const statusOptions = [
    { value: "Активен", label: "Активен" },
    { value: "Неактивен", label: "Неактивен" },
    { value: "В процессе", label: "В процессе" },
  ];

  const maritalStatusOptions = [
    { value: "Холост/Не замужем", label: "Холост/Не замужем" },
    { value: "Женат/Замужем", label: "Женат/Замужем" },
    { value: "Разведен(а)", label: "Разведен(а)" },
    { value: "Вдовец/Вдова", label: "Вдовец/Вдова" },
  ];

  const educationOptions = [
    { value: "Среднее общее", label: "Среднее общее" },
    { value: "Среднее профессиональное", label: "Среднее профессиональное" },
    { value: "Неполное высшее", label: "Неполное высшее" },
    { value: "Бакалавр", label: "Бакалавр" },
    { value: "Специалист", label: "Специалист" },
    { value: "Магистр", label: "Магистр" },
  ];

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: "",
      gender: "",
      status: "",
      ageFrom: "",
      ageTo: "",
      maritalStatus: "",
      education: "",
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  return (
    <div className="filters-container">
      <Input
        label="Поиск по ФИО"
        placeholder="Фамилия, Имя или Отчество"
        value={filters.search}
        onChange={(e) => handleFilterChange("search", e.target.value)}
      />

      <Select
        label="Пол"
        value={filters.gender}
        onChange={(e) => handleFilterChange("gender", e.target.value)}
        options={genderOptions}
        placeholder="Все"
      />

      <Select
        label="Статус"
        value={filters.status}
        onChange={(e) => handleFilterChange("status", e.target.value)}
        options={statusOptions}
        placeholder="Все"
      />

      <div className="inputs_number">
        <Input
          label="Возраст от"
          type="number"
          value={filters.ageFrom}
          onChange={(e) => handleFilterChange("ageFrom", e.target.value)}
          min="18"
          max="100"
        />

        <Input
          label="до"
          type="number"
          value={filters.ageTo}
          onChange={(e) => handleFilterChange("ageTo", e.target.value)}
          min="18"
          max="100"
        />
      </div>

      <Select
        label="Семейное положение"
        value={filters.maritalStatus}
        onChange={(e) => handleFilterChange("maritalStatus", e.target.value)}
        options={maritalStatusOptions}
        placeholder="Все"
      />

      <Select
        label="Образование"
        value={filters.education}
        onChange={(e) => handleFilterChange("education", e.target.value)}
        options={educationOptions}
        placeholder="Все"
      />

      <div className="filter-button-group">
        <Button onClick={handleClearFilters} variant="outline">
          Очистить
        </Button>
      </div>
    </div>
  );
};

export default Filters;
