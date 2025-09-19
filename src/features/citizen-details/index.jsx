import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCitizenDetails,
  clearCurrentCitizen,
} from "../../store/slices/citizensSlice";
import Card from "../../components/UI/Card/Card";
import Button from "../../components/UI/Button/Button";
import Alert from "../../components/UI/Alert/Alert";
import "./details.css";

const CitizenDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentCitizen, loadingDetails, error } = useSelector(
    (state) => state.citizens
  );

  useEffect(() => {
    if (id) dispatch(loadCitizenDetails(id));
    return () => dispatch(clearCurrentCitizen());
  }, [dispatch, id]);

  if (loadingDetails) return <p>Загрузка данных...</p>;
  if (error) return <Alert type="error">{error}</Alert>;
  if (!currentCitizen) return <Alert type="warning">Гражданин не найден</Alert>;

  return (
    <div className="container">
      <Button variant="outline" onClick={() => navigate("/citizens")}>
        ← Назад к списку
      </Button>

      <Card>
        {currentCitizen.gender === "Мужской" ? (
          <img
            className="image_person"
            alt="person_photo"
            src="/public/profiles/man_profile.jpg"
          />
        ) : (
          <img
            className="image_person"
            alt="person_photo"
            src="/public/profiles/woman_profile.jpg"
          />
        )}
        <h2>
          {currentCitizen.lastName} {currentCitizen.firstName}{" "}
          {currentCitizen.middleName}
        </h2>

        <p>
          <strong>Дата рождения:</strong>{" "}
          {new Date(currentCitizen.birthDate).toLocaleDateString("ru-RU")}
        </p>
        <p>
          <strong>Пол:</strong> {currentCitizen.gender}
        </p>
        <p>
          <strong>СНИЛС:</strong> {currentCitizen.snils}
        </p>
        <p>
          <strong>Статус:</strong> {currentCitizen.status}
        </p>
        <p>
          <strong>Телефон:</strong> {currentCitizen.phone}
        </p>
        <p>
          <strong>Email:</strong> {currentCitizen.email}
        </p>
        <p>
          <strong>Адрес:</strong> {currentCitizen.address}
        </p>
      </Card>
    </div>
  );
};

export default CitizenDetails;
