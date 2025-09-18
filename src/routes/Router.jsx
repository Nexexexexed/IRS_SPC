import { Routes, Route } from "react-router-dom";
import Dashboard from "../features/dashboard";
import Citizens from "../features/citizens";
import CitizenDetails from "../features/citizen-details";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/citizens" element={<Citizens />} />
      <Route path="/citizens/:id" element={<CitizenDetails />} />
    </Routes>
  );
};

export default AppRouter;
