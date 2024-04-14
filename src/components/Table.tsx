type TableProps = {
  title: string;
  columnMapping: any;
  headers: any;
  data: any;
};

const Table = ({ title, columnMapping, headers, data }: TableProps) => {
  {
    /* generate table heads from columnMapping and headers props */
  }
  const columnTitles = columnMapping.map((item, i) => (
    <th key={i}>{headers[item]}</th>
  ));

  let columnEntries = "";
  {
    /* generate table rows from columnMapping and data props */
  }
  if (data) {
    columnEntries = data.map((entry, i1) => {
      const row = columnMapping.map((item, i2) => (
        <td key={i2}>{entry[item]}</td>
      ));
      return <tr key={i1}>{row}</tr>;
    });
  }

  return (
    <div>
      <h2>{title}</h2>

      <hr />

      <table>
        <thead>
          <tr>{columnTitles}</tr>
        </thead>
        <tbody>{columnEntries}</tbody>
      </table>
    </div>
  );
};

export default Table;
