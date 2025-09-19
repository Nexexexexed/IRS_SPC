import { fakerRU as faker } from "@faker-js/faker";

const generateCitizens = () => {
  const citizens = [];
  for (let i = 0; i < 150000; i++) {
    citizens.push({
      id: i + 1,
      lastName: faker.person.lastName(),
      firstName: faker.person.firstName(),
      middleName: faker.person.middleName(),
      birthDate: faker.date
        .birthdate({ min: 18, max: 90, mode: "age" })
        .toISOString(),
      gender: faker.helpers.arrayElement(["Мужской", "Женский"]),
      snils: faker.string.numeric(11),
      inn: faker.string.numeric(12),
      address: faker.location.streetAddress(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      status: faker.helpers.arrayElement([
        "Активен",
        "Неактивен",
        "В процессе",
      ]),
    });
  }
  return citizens;
};

const mockCitizens = generateCitizens();

export const fetchCitizens = async ({ page = 0, size = 20, filters = {} }) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  let filteredData = [...mockCitizens];

  if (filters.gender) {
    filteredData = filteredData.filter((c) => c.gender === filters.gender);
  }
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredData = filteredData.filter(
      (c) =>
        c.lastName.toLowerCase().includes(searchLower) ||
        c.firstName.toLowerCase().includes(searchLower)
    );
  }

  const totalCount = filteredData.length;
  const start = page * size;
  const end = start + size;
  const pageData = filteredData.slice(start, end);

  return { data: pageData, totalCount };
};

export const fetchCitizenStats = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const total = mockCitizens.length;
  const male = mockCitizens.filter((c) => c.gender === "Мужской").length;
  const female = mockCitizens.filter((c) => c.gender === "Женский").length;

  const ageGroups = {
    "18-29": 0,
    "30-44": 0,
    "45-59": 0,
    "60+": 0,
  };

  mockCitizens.forEach((c) => {
    const age = new Date().getFullYear() - new Date(c.birthDate).getFullYear();
    if (age < 30) ageGroups["18-29"]++;
    else if (age < 45) ageGroups["30-44"]++;
    else if (age < 60) ageGroups["45-59"]++;
    else ageGroups["60+"]++;
  });

  const statusStats = {
    Активен: mockCitizens.filter((c) => c.status === "Активен").length,
    Неактивен: mockCitizens.filter((c) => c.status === "Неактивен").length,
    "В процессе": mockCitizens.filter((c) => c.status === "В процессе").length,
  };

  return {
    total,
    gender: { male, female },
    ageGroups,
    status: statusStats,
  };
};

export const fetchCitizenById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockCitizens.find((c) => c.id === parseInt(id));
};
