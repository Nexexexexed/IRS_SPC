import { useEffect, useState } from "react";
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
  const [activeTab, setActiveTab] = useState("main");

  useEffect(() => {
    if (id) dispatch(loadCitizenDetails(id));
    return () => dispatch(clearCurrentCitizen());
  }, [dispatch, id]);

  if (loadingDetails) return <div className="loading">Загрузка данных...</div>;
  if (error) return <Alert type="error">{error}</Alert>;
  if (!currentCitizen) return <Alert type="warning">Гражданин не найден</Alert>;

  const renderMainInfo = () => (
    <div className="info-grid">
      <div className="info-column">
        <h3>Основная информация</h3>
        <div className="info-item">
          <strong>ФИО:</strong> {currentCitizen.lastName}{" "}
          {currentCitizen.firstName} {currentCitizen.middleName}
        </div>
        <div className="info-item">
          <strong>Дата рождения:</strong>{" "}
          {new Date(currentCitizen.birthDate).toLocaleDateString("ru-RU")}
        </div>
        <div className="info-item">
          <strong>Пол:</strong> {currentCitizen.gender}
        </div>
        <div className="info-item">
          <strong>Место рождения:</strong> {currentCitizen.birthPlace}
        </div>
        <div className="info-item">
          <strong>Семейное положение:</strong> {currentCitizen.maritalStatus}
        </div>
      </div>

      <div className="info-column">
        <h3>Документы</h3>
        <div className="info-item">
          <strong>СНИЛС:</strong> {currentCitizen.snils}
        </div>
        <div className="info-item">
          <strong>ИНН:</strong> {currentCitizen.inn}
        </div>
        {currentCitizen.documents?.map((doc, index) => (
          <div key={index} className="info-item">
            <strong>{doc.type}:</strong> {doc.series} {doc.number}
            <br />
            <small>
              Выдан: {new Date(doc.issueDate).toLocaleDateString("ru-RU")}
            </small>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContactInfo = () => (
    <div className="info-grid">
      <div className="info-column">
        <h3>Контактная информация</h3>
        <div className="info-item">
          <strong>Телефоны:</strong>
          {currentCitizen.phones?.map((phone, index) => (
            <div key={index} className="sub-item">
              {phone.type}: {phone.number} {phone.isPrimary && "(Основной)"}
            </div>
          ))}
        </div>
        <div className="info-item">
          <strong>Emails:</strong>
          {currentCitizen.emails?.map((email, index) => (
            <div key={index} className="sub-item">
              {email}
            </div>
          ))}
        </div>
        <div className="info-item">
          <strong>Соцсети:</strong>
          {currentCitizen.socialNetworks?.map((social, index) => (
            <div key={index} className="sub-item">
              {social.platform}: {social.username}
            </div>
          ))}
        </div>
      </div>

      <div className="info-column">
        <h3>Адреса</h3>
        <div className="info-item">
          <strong>Адрес регистрации:</strong>
          <div className="sub-item">{currentCitizen.registrationAddress}</div>
        </div>
        {currentCitizen.actualAddress && (
          <div className="info-item">
            <strong>Фактический адрес:</strong>
            <div className="sub-item">{currentCitizen.actualAddress}</div>
          </div>
        )}
      </div>
    </div>
  );

  const renderProfessionalInfo = () => (
    <div className="info-grid">
      <div className="info-column">
        <h3>Образование</h3>
        {currentCitizen.education?.map((edu, index) => (
          <div key={index} className="info-item">
            <strong>{edu.degree}</strong>
            <div className="sub-item">{edu.institution}</div>
            <div className="sub-item">
              {edu.faculty}, {edu.specialization}
            </div>
            <div className="sub-item">Год окончания: {edu.graduationYear}</div>
          </div>
        ))}
      </div>

      <div className="info-column">
        <h3>Опыт работы</h3>
        {currentCitizen.workExperience?.map((job, index) => (
          <div key={index} className="info-item">
            <strong>{job.position}</strong>
            <div className="sub-item">{job.company}</div>
            <div className="sub-item">
              {new Date(job.startDate).toLocaleDateString("ru-RU")} -
              {job.endDate
                ? new Date(job.endDate).toLocaleDateString("ru-RU")
                : " по настоящее время"}
              {job.isCurrent && " (Текущее место)"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFamilyInfo = () => (
    <div className="info-grid">
      <div className="info-column">
        <h3>Члены семьи</h3>
        {currentCitizen.familyMembers?.length > 0 ? (
          currentCitizen.familyMembers.map((member, index) => (
            <div key={index} className="info-item">
              <strong>{member.relation}:</strong> {member.lastName}{" "}
              {member.firstName} {member.middleName}
              <div className="sub-item">
                Пол: {member.gender}, Возраст:{" "}
                {new Date().getFullYear() -
                  new Date(member.birthDate).getFullYear()}{" "}
                лет
              </div>
            </div>
          ))
        ) : (
          <div className="info-item">Нет данных о членах семьи</div>
        )}
      </div>

      <div className="info-column">
        <h3>Дополнительная информация</h3>
        <div className="info-item">
          <strong>Статус:</strong> {currentCitizen.status}
        </div>
        <div className="info-item">
          <strong>Дата создания:</strong>{" "}
          {new Date(currentCitizen.createdAt).toLocaleDateString("ru-RU")}
        </div>
        <div className="info-item">
          <strong>Последнее обновление:</strong>{" "}
          {new Date(currentCitizen.updatedAt).toLocaleDateString("ru-RU")}
        </div>
        {currentCitizen.notes && (
          <div className="info-item">
            <strong>Примечания:</strong>
            <div className="sub-item">{currentCitizen.notes}</div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="details-container">
      <Button variant="outline" onClick={() => navigate("/citizens")}>
        ← Назад к списку
      </Button>

      <Card className="citizen-card">
        <div className="citizen-header">
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
          <div className="citizen-title">
            <h1>
              {currentCitizen.lastName} {currentCitizen.firstName}{" "}
              {currentCitizen.middleName}
            </h1>
            <p className="citizen-subtitle">ID: {currentCitizen.id}</p>
          </div>
        </div>

        <div className="tabs">
          <button
            className={activeTab === "main" ? "tab active" : "tab"}
            onClick={() => setActiveTab("main")}
          >
            Основная информация
          </button>
          <button
            className={activeTab === "contact" ? "tab active" : "tab"}
            onClick={() => setActiveTab("contact")}
          >
            Контакты
          </button>
          <button
            className={activeTab === "professional" ? "tab active" : "tab"}
            onClick={() => setActiveTab("professional")}
          >
            Профессиональная деятельность
          </button>
          <button
            className={activeTab === "family" ? "tab active" : "tab"}
            onClick={() => setActiveTab("family")}
          >
            Семья и доп. информация
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "main" && renderMainInfo()}
          {activeTab === "contact" && renderContactInfo()}
          {activeTab === "professional" && renderProfessionalInfo()}
          {activeTab === "family" && renderFamilyInfo()}
        </div>
      </Card>
    </div>
  );
};

export default CitizenDetails;
