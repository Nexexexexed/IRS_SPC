import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

const CitizensTable = ({ data, pagination, onRowClick, onPageChange }) => {
  const columns = [
    { id: "id", label: "ID", minWidth: 50 },
    { id: "lastName", label: "Фамилия", minWidth: 150 },
    { id: "firstName", label: "Имя", minWidth: 150 },
    { id: "middleName", label: "Отчество", minWidth: 150 },
    { id: "birthDate", label: "Дата рождения", minWidth: 120 },
    { id: "gender", label: "Пол", minWidth: 100 },
    { id: "snils", label: "СНИЛС", minWidth: 120 },
    { id: "status", label: "Статус", minWidth: 120 },
  ];

  const handleChangePage = (event, newPage) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onPageChange(0, parseInt(event.target.value, 10));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("ru-RU");
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  onClick={() => onRowClick(row.id)}
                  style={{ cursor: "pointer" }}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id}>
                        {column.id === "birthDate" ? formatDate(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50, 100]}
        component="div"
        count={pagination.totalCount}
        rowsPerPage={pagination.pageSize}
        page={pagination.currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Строк на странице:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} из ${count}`
        }
      />
    </Paper>
  );
};

export default CitizensTable;
