import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loadCitizens,
  setFilters,
  setPagination,
} from "../../store/slices/citizensSlice";
import CitizensTable from "./components/CitizensTable";
import Filters from "./components/Filters";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";

const Citizens = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading, error, pagination, filters } = useSelector(
    (state) => state.citizens
  );

  useEffect(() => {
    dispatch(
      loadCitizens({
        page: pagination.currentPage,
        size: pagination.pageSize,
        filters,
      })
    );
  }, [dispatch, pagination.currentPage, pagination.pageSize, filters]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  const handlePageChange = (newPage, newPageSize = pagination.pageSize) => {
    dispatch(
      setPagination({
        currentPage: newPage,
        pageSize: newPageSize,
      })
    );
  };

  const handleRowClick = (citizenId) => {
    navigate(`/citizens/${citizenId}`);
  };

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Ошибка загрузки данных: {error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Картотека граждан
      </Typography>

      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Всего записей: {pagination.totalCount.toLocaleString("ru-RU")}
      </Typography>

      <Filters onFilterChange={handleFilterChange} />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <CitizensTable
          data={list}
          pagination={pagination}
          onRowClick={handleRowClick}
          onPageChange={handlePageChange}
        />
      )}
    </Box>
  );
};

export default Citizens;
