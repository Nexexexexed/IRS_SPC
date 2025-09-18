import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCitizenDetails,
  clearCurrentCitizen,
} from "../../store/slices/citizensSlice";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

const CitizenDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentCitizen, loadingDetails, error } = useSelector(
    (state) => state.citizens
  );

  useEffect(() => {
    if (id) {
      dispatch(loadCitizenDetails(id));
    }

    return () => {
      dispatch(clearCurrentCitizen());
    };
  }, [dispatch, id]);

  if (loadingDetails) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Загрузка данных...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Ошибка загрузки данных: {error}</Alert>
        <Button
          variant="outlined"
          onClick={() => navigate("/citizens")}
          sx={{ mt: 2 }}
        >
          ← Назад к списку
        </Button>
      </Box>
    );
  }

  if (!currentCitizen) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">Гражданин не найден</Alert>
        <Button
          variant="outlined"
          onClick={() => navigate("/citizens")}
          sx={{ mt: 2 }}
        >
          ← Назад к списку
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Button
        variant="outlined"
        onClick={() => navigate("/citizens")}
        sx={{ mb: 2 }}
      >
        ← Назад к списку
      </Button>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {currentCitizen.lastName} {currentCitizen.firstName}{" "}
          {currentCitizen.middleName}
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Основная информация
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 2,
          }}
        >
          <div>
            <Typography>
              <strong>Дата рождения:</strong>{" "}
              {new Date(currentCitizen.birthDate).toLocaleDateString("ru-RU")}
            </Typography>
            <Typography>
              <strong>Пол:</strong> {currentCitizen.gender}
            </Typography>
            <Typography>
              <strong>СНИЛС:</strong> {currentCitizen.snils}
            </Typography>
          </div>
          <div>
            <Typography>
              <strong>Статус:</strong> {currentCitizen.status}
            </Typography>
            <Typography>
              <strong>Телефон:</strong> {currentCitizen.phone}
            </Typography>
            <Typography>
              <strong>Email:</strong> {currentCitizen.email}
            </Typography>
          </div>
        </Box>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Адрес
        </Typography>
        <Typography>{currentCitizen.address}</Typography>
      </Paper>
    </Box>
  );
};

export default CitizenDetails;
