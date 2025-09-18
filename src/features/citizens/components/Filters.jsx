import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Paper,
  Grid,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";

const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: "",
    gender: "",
    status: "",
  });

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
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Grid container spacing={2} alignItems="end">
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Поиск по ФИО"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            placeholder="Введите фамилию или имя"
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel shrink={filters.gender !== ""} id="gender-label">
              Пол
            </InputLabel>
            <Select
              labelId="gender-label"
              label="Пол"
              value={filters.gender}
              onChange={(e) => handleFilterChange("gender", e.target.value)}
              displayEmpty
              renderValue={(selected) => {
                if (selected === "") {
                  return <span style={{ color: "#999" }}>Все</span>;
                }
                return selected;
              }}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="">Все</MenuItem>
              <MenuItem value="Мужской">Мужской</MenuItem>
              <MenuItem value="Женский">Женский</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel shrink={filters.status !== ""} id="status-label">
              Статус
            </InputLabel>
            <Select
              labelId="status-label"
              label="Статус"
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              displayEmpty
              renderValue={(selected) => {
                if (selected === "") {
                  return <span style={{ color: "#999" }}>Все</span>;
                }
                return selected;
              }}
              sx={{ minWidth: 140 }}
            >
              <MenuItem value="">Все</MenuItem>
              <MenuItem value="Активен">Активен</MenuItem>
              <MenuItem value="Неактивен">Неактивен</MenuItem>
              <MenuItem value="В процессе">В процессе</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleClearFilters}
            sx={{ height: "56px" }}
          >
            Очистить
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Filters;
