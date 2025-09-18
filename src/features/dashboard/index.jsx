import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Paper, Grid } from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Дашборд системы
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Управление гражданами
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/citizens")}
              size="large"
            >
              Перейти к картотеке
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Статистика
            </Typography>
            <Typography>Всего граждан: 150,000</Typography>
            <Typography>Мужчины: 75,000</Typography>
            <Typography>Женщины: 75,000</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
