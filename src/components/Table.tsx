type TableProps = {
  title: string;
  columns: Array<string>;
  data: Array<Array<string>>;
};

const Table = ({ title, columns, data }: TableProps) => {
  const columnTitles = columns.map((column) => <th>{column}</th>);

  const columnEntries = data.map((entry) => {
    const row = entry.map((item) => <td>{item}</td>);
    return <tr> {row} </tr>;
  });

  return (
    <div>
      <h2>{title}</h2>

      <hr />

      <table>
        {/* generate table heads from columns prop */}
        <tr>{columnTitles}</tr>
        {/* generate data for rows, each row one item */}
        {columnEntries}
      </table>
    </div>
  );
};

export default Table;
