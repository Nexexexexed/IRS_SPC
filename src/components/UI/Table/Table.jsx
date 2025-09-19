import "./Table.css";

const Table = ({ columns, data, onRowClick }) => {
  const formatDate = (date) => new Date(date).toLocaleDateString("ru-RU");

  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.id}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr
            key={row.id}
            onClick={() => onRowClick(row.id)}
            className="table-row"
          >
            {columns.map((col) => (
              <td key={col.id}>
                {col.id === "birthDate" ? formatDate(row[col.id]) : row[col.id]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
