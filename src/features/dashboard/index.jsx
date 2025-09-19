import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStats } from "../../store/slices/statSlice";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import Card from "../../components/UI/Card/Card";
import "./Dashboard.css";

const COLORS = [
  "#0088FE",
  "#FF8042",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#00C49F",
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.stats);

  useEffect(() => {
    dispatch(loadStats());
  }, [dispatch]);

  if (loading) return <p className="loading">Загрузка статистики...</p>;
  if (error) return <p className="error">Ошибка: {error}</p>;
  if (!data) return null;

  const genderData = [
    { name: "Мужчины", value: data.gender.male },
    { name: "Женщины", value: data.gender.female },
  ];

  const ageData = Object.entries(data.ageGroups).map(([name, value]) => ({
    name,
    value,
  }));

  const statusData = Object.entries(data.status).map(([name, value]) => ({
    name,
    value,
  }));

  const maritalStatusData = Object.entries(data.maritalStatus).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const educationData = Object.entries(data.education).map(([name, value]) => ({
    name,
    value,
  }));

  const cityData = Object.entries(data.cities).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="container">
      <div className="flex-gap mb-2 all_stats">
        <Card>
          <h2>Общая статистика</h2>
          <p>
            Всего граждан:
            <span className="total">{data.total.toLocaleString("ru-RU")}</span>
          </p>
        </Card>
      </div>

      <div className="flex flex-gap" style={{ flexWrap: "wrap", gap: "20px" }}>
        <Card style={{ minWidth: "300px", flex: "1" }}>
          <h3>Распределение по полу</h3>
          <PieChart width={300} height={250}>
            <Pie
              data={genderData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
            >
              {genderData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Card>

        <Card style={{ minWidth: "300px", flex: "1" }}>
          <h3>Возрастные группы</h3>
          <PieChart width={300} height={250}>
            <Pie data={ageData} dataKey="value" nameKey="name" outerRadius={80}>
              {ageData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Card>

        <Card style={{ minWidth: "300px", flex: "1" }}>
          <h3>Статусы</h3>
          <PieChart width={300} height={250}>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
            >
              {statusData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Card>

        <Card style={{ minWidth: "300px", flex: "1" }}>
          <h3>Семейное положение</h3>
          <PieChart width={300} height={250}>
            <Pie
              data={maritalStatusData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
            >
              {maritalStatusData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Card>

        <Card style={{ minWidth: "300px", flex: "1" }}>
          <h3>Образование</h3>
          <BarChart width={300} height={250} data={educationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#0088FE" />
          </BarChart>
        </Card>

        <Card style={{ minWidth: "300px", flex: "1" }}>
          <h3>Топ городов</h3>
          <BarChart width={300} height={250} data={cityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#00C49F" />
          </BarChart>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
