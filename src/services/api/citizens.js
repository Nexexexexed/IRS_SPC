import { fakerRU as faker } from "@faker-js/faker";

const generateCitizens = () => {
  const citizens = [];
  for (let i = 0; i < 150000; i++) {
    citizens.push({
      id: i + 1,
      lastName: faker.person.lastName(),
      firstName: faker.person.firstName(),
      middleName: faker.person.middleName(),
      birthDate: faker.date.birthdate({ min: 18, max: 90, mode: "age" }),
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

export const fetchCitizenById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockCitizens.find((c) => c.id === parseInt(id));
};
