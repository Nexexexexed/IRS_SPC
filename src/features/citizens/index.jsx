import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loadCitizens,
  setFilters,
  setPagination,
} from "../../store/slices/citizensSlice";
import CitizensTable from "./components/CitizensTable";
import Filters from "./components/Filters";
import Alert from "../../components/UI/Alert/Alert";

const Citizens = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading, error, pagination, filters } = useSelector(
    (state) => state.citizens
  );

  useEffect(() => {
    dispatch(
      loadCitizens({
        page: pagination.currentPage,
        size: pagination.pageSize,
        filters,
      })
    );
  }, [dispatch, pagination.currentPage, pagination.pageSize, filters]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  const handlePageChange = (newPage) => {
    dispatch(
      setPagination({ currentPage: newPage, pageSize: pagination.pageSize })
    );
  };

  const handleRowClick = (id) => navigate(`/citizens/${id}`);

  return (
    <div className="container">
      {error && <Alert type="error">{error}</Alert>}

      <Filters onFilterChange={handleFilterChange} />

      {loading ? (
        <p>Загрузка данных...</p>
      ) : (
        <CitizensTable
          data={list}
          pagination={pagination}
          onRowClick={handleRowClick}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Citizens;
