import { fakerRU as faker } from "@faker-js/faker";

const generatePhones = () => {
  const phones = [];
  const count = faker.number.int({ min: 1, max: 3 });
  for (let i = 0; i < count; i++) {
    phones.push({
      type: faker.helpers.arrayElement(["Мобильный", "Домашний", "Рабочий"]),
      number: faker.phone.number(),
      isPrimary: i === 0,
    });
  }
  return phones;
};

const generateSocialNetworks = () => {
  const networks = [];
  const platforms = [
    "VK",
    "Telegram",
    "WhatsApp",
    "Instagram",
    "Facebook",
    "Twitter",
  ];
  const count = faker.number.int({ min: 1, max: 4 });

  for (let i = 0; i < count; i++) {
    const platform = faker.helpers.arrayElement(platforms);
    networks.push({
      platform,
      username: faker.internet.username(),
      url: faker.internet.url(),
    });
  }
  return networks;
};

const generateWorkExperience = () => {
  const experiences = [];
  const count = faker.number.int({ min: 1, max: 5 });

  for (let i = 0; i < count; i++) {
    const startDate = faker.date.past({ years: 20 });
    const endDate =
      i === 0 ? null : faker.date.between({ from: startDate, to: new Date() });

    experiences.push({
      company: faker.company.name(),
      position: faker.helpers.arrayElement([
        "Инженер-программист",
        "Менеджер проекта",
        "Бухгалтер",
        "Врач-терапевт",
        "Учитель математики",
        "Архитектор",
        "Дизайнер интерьеров",
        "Юрист",
        "Маркетолог",
        "Аналитик данных",
        "Системный администратор",
      ]),
      startDate: startDate.toISOString(),
      endDate: endDate ? endDate.toISOString() : null,
      isCurrent: i === 0,
      responsibilities: faker.lorem.sentences(2),
    });
  }
  return experiences;
};

const generateEducation = () => {
  const educations = [];
  const count = faker.number.int({ min: 1, max: 3 });

  for (let i = 0; i < count; i++) {
    educations.push({
      institution: faker.helpers.arrayElement([
        "МГУ им. Ломоносова",
        "СПбГУ",
        "МФТИ",
        "МГТУ им. Баумана",
        "НИУ ВШЭ",
        "МГИМО",
        "РЭУ им. Плеханова",
        "МГМУ им. Сеченова",
      ]),
      degree: faker.helpers.arrayElement([
        "Среднее общее",
        "Среднее профессиональное",
        "Неполное высшее",
        "Бакалавр",
        "Специалист",
        "Магистр",
        "Аспирантура",
        "Докторантура",
      ]),
      faculty: faker.helpers.arrayElement([
        "Факультет компьютерных наук",
        "Экономический факультет",
        "Юридический факультет",
        "Медицинский факультет",
        "Филологический факультет",
        "Исторический факультет",
      ]),
      specialization: faker.helpers.arrayElement([
        "Программная инженерия",
        "Экономика",
        "Юриспруденция",
        "Лечебное дело",
        "Филология",
        "История",
        "Математика",
      ]),
      graduationYear: faker.number.int({ min: 1990, max: 2023 }),
    });
  }
  return educations;
};

const generateFamilyMembers = () => {
  const members = [];
  const count = faker.number.int({ min: 0, max: 5 });

  for (let i = 0; i < count; i++) {
    members.push({
      relation: faker.helpers.arrayElement([
        "Супруг(а)",
        "Ребенок",
        "Родитель",
        "Брат",
        "Сестра",
        "Дедушка",
        "Бабушка",
        "Внук",
        "Внучка",
        "Дядя",
        "Тетя",
      ]),
      lastName: faker.person.lastName(),
      firstName: faker.person.firstName(),
      middleName: faker.person.middleName(),
      birthDate: faker.date
        .birthdate({ min: 1, max: 80, mode: "age" })
        .toISOString(),
      gender: faker.helpers.arrayElement(["Мужской", "Женский"]),
    });
  }
  return members;
};

const generateDocuments = () => {
  const documents = [];

  documents.push({
    type: "Паспорт РФ",
    series: faker.string.numeric(4),
    number: faker.string.numeric(6),
    issueDate: faker.date.past({ years: 10 }).toISOString(),
    issuedBy: faker.lorem.words(3),
  });

  if (faker.datatype.boolean(0.3)) {
    documents.push({
      type: "Загранпаспорт",
      series: faker.string.numeric(2),
      number: faker.string.numeric(7),
      issueDate: faker.date.past({ years: 5 }).toISOString(),
      issuedBy: faker.lorem.words(3),
    });
  }

  return documents;
};

const generateCitizens = () => {
  const citizens = [];
  const cities = [
    "Москва",
    "Санкт-Петербург",
    "Новосибирск",
    "Екатеринбург",
    "Казань",
    "Нижний Новгород",
    "Челябинск",
    "Самара",
    "Омск",
    "Ростов-на-Дону",
    "Уфа",
    "Красноярск",
    "Воронеж",
    "Пермь",
    "Волгоград",
  ];
  for (let i = 0; i < 2000; i++) {
    const city = faker.helpers.arrayElement(cities);
    citizens.push({
      id: i + 1,
      lastName: faker.person.lastName(),
      firstName: faker.person.firstName(),
      middleName: faker.person.middleName(),
      birthDate: faker.date
        .birthdate({ min: 18, max: 90, mode: "age" })
        .toISOString(),
      birthPlace: faker.location.city() + ", " + faker.location.country(),
      gender: faker.helpers.arrayElement(["Мужской", "Женский"]),

      phones: generatePhones(),
      emails: [
        faker.internet.email(),
        ...(faker.datatype.boolean(0.3) ? [faker.internet.email()] : []),
      ],
      socialNetworks: generateSocialNetworks(),

      registrationAddress: faker.location.streetAddress() + ", " + city,
      actualAddress: faker.datatype.boolean(0.8)
        ? faker.location.streetAddress() + ", " + city
        : null,

      documents: generateDocuments(),
      snils: faker.string.numeric(11),
      inn: faker.string.numeric(12),
      workExperience: generateWorkExperience(),
      education: generateEducation(),
      maritalStatus: faker.helpers.arrayElement([
        "Холост/Не замужем",
        "Женат/Замужем",
        "Разведен(а)",
        "Вдовец/Вдова",
      ]),
      familyMembers: generateFamilyMembers(),

      status: faker.helpers.arrayElement([
        "Активен",
        "Неактивен",
        "В процессе",
      ]),
      notes: faker.datatype.boolean(0.2) ? faker.lorem.sentences(2) : null,
      createdAt: faker.date.past({ years: 3 }).toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    });
  }
  return citizens;
};

const mockCitizens = generateCitizens();

export const fetchCitizens = async ({ page = 0, size = 20, filters = {} }) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  let filteredData = [...mockCitizens];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredData = filteredData.filter(
      (c) =>
        c.lastName.toLowerCase().includes(searchLower) ||
        c.firstName.toLowerCase().includes(searchLower) ||
        (c.middleName && c.middleName.toLowerCase().includes(searchLower))
    );
  }

  if (filters.gender) {
    filteredData = filteredData.filter((c) => c.gender === filters.gender);
  }

  if (filters.status) {
    filteredData = filteredData.filter((c) => c.status === filters.status);
  }

  if (filters.ageFrom || filters.ageTo) {
    filteredData = filteredData.filter((c) => {
      const age =
        new Date().getFullYear() - new Date(c.birthDate).getFullYear();
      if (filters.ageFrom && age < parseInt(filters.ageFrom)) return false;
      if (filters.ageTo && age > parseInt(filters.ageTo)) return false;
      return true;
    });
  }

  if (filters.maritalStatus) {
    filteredData = filteredData.filter(
      (c) => c.maritalStatus === filters.maritalStatus
    );
  }

  if (filters.education) {
    filteredData = filteredData.filter((c) =>
      c.education.some((edu) => edu.degree === filters.education)
    );
  }

  const totalCount = filteredData.length;
  const start = page * size;
  const end = start + size;
  const pageData = filteredData.slice(start, end);

  return { data: pageData, totalCount };
};

export const fetchCitizenStats = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const total = mockCitizens.length;

  const male = mockCitizens.filter((c) => c.gender === "Мужской").length;
  const female = mockCitizens.filter((c) => c.gender === "Женский").length;

  const ageGroups = {
    "18-29": 0,
    "30-44": 0,
    "45-59": 0,
    "60+": 0,
  };

  const statusStats = {
    Активен: mockCitizens.filter((c) => c.status === "Активен").length,
    Неактивен: mockCitizens.filter((c) => c.status === "Неактивен").length,
    "В процессе": mockCitizens.filter((c) => c.status === "В процессе").length,
  };

  const maritalStatusStats = {
    "Холост/Не замужем": mockCitizens.filter(
      (c) => c.maritalStatus === "Холост/Не замужем"
    ).length,
    "Женат/Замужем": mockCitizens.filter(
      (c) => c.maritalStatus === "Женат/Замужем"
    ).length,
    "Разведен(а)": mockCitizens.filter((c) => c.maritalStatus === "Разведен(а)")
      .length,
    "Вдовец/Вдова": mockCitizens.filter(
      (c) => c.maritalStatus === "Вдовец/Вдова"
    ).length,
  };

  const educationStats = {
    "Среднее общее": mockCitizens.filter((c) =>
      c.education.some((edu) => edu.degree === "Среднее общее")
    ).length,
    "Среднее профессиональное": mockCitizens.filter((c) =>
      c.education.some((edu) => edu.degree === "Среднее профессиональное")
    ).length,
    "Неполное высшее": mockCitizens.filter((c) =>
      c.education.some((edu) => edu.degree === "Неполное высшее")
    ).length,
    Бакалавр: mockCitizens.filter((c) =>
      c.education.some((edu) => edu.degree === "Бакалавр")
    ).length,
    Специалист: mockCitizens.filter((c) =>
      c.education.some((edu) => edu.degree === "Специалист")
    ).length,
    Магистр: mockCitizens.filter((c) =>
      c.education.some((edu) => edu.degree === "Магистр")
    ).length,
  };

  const cityStats = {};
  mockCitizens.forEach((c) => {
    const addressParts = c.registrationAddress.split(",");
    const city = addressParts[addressParts.length - 1].trim();
    cityStats[city] = (cityStats[city] || 0) + 1;
  });

  const topCities = Object.entries(cityStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .reduce((acc, [city, count]) => {
      acc[city] = count;
      return acc;
    }, {});

  mockCitizens.forEach((c) => {
    const age = new Date().getFullYear() - new Date(c.birthDate).getFullYear();
    if (age < 30) ageGroups["18-29"]++;
    else if (age < 45) ageGroups["30-44"]++;
    else if (age < 60) ageGroups["45-59"]++;
    else ageGroups["60+"]++;
  });

  return {
    total,
    gender: { male, female },
    ageGroups,
    status: statusStats,
    maritalStatus: maritalStatusStats,
    education: educationStats,
    cities: topCities,
  };
};

export const fetchCitizenById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockCitizens.find((c) => c.id === parseInt(id));
};
