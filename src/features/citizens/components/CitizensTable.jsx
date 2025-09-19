import Table from "../../../components/UI/Table/Table";
import Pagination from "../../../components/ui/Pagination/Pagination";

const CitizensTable = ({ data, pagination, onRowClick, onPageChange }) => {
  const columns = [
    { id: "id", label: "ID" },
    { id: "lastName", label: "Фамилия" },
    { id: "firstName", label: "Имя" },
    { id: "middleName", label: "Отчество" },
    { id: "birthDate", label: "Дата рождения" },
    { id: "gender", label: "Пол" },
    { id: "snils", label: "СНИЛС" },
    { id: "status", label: "Статус" },
  ];

  const totalPages = Math.ceil(pagination.totalCount / pagination.pageSize);

  return (
    <>
      <Table columns={columns} data={data} onRowClick={onRowClick} />
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default CitizensTable;
