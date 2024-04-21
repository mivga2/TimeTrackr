import { Data } from "../interfaces/Data";

type TableProps = {
  title: string;
  columnMapping: any;
  headers: any;
  data: any;
  itemType: string;
};

const Table = ({
  title,
  columnMapping,
  headers,
  data,
  itemType,
}: TableProps) => {
  {
    /* generate table heads from columnMapping and headers props */
  }
  const columnTitles = columnMapping.map((item: string, i: number) => (
    <th key={i}>{headers[item]}</th>
  ));

  let columnEntries = "";
  {
    /* generate table rows from columnMapping and data props */
  }
  if (data) {
    console.log(data[0]);
    columnEntries = data.map((entry: Data, i1: number) => {
      const row = columnMapping.map((item: keyof Data, i2: number) =>
        item == "id" ? (
          <td key={i2}>
            <a href={"/" + itemType + "/edit/" + entry[item]}>edit</a> | <a href={"/" + itemType + "/delete/" + entry[item]}>delete</a>
          </td>
        ) : (
          <td key={i2}>{entry[item]}</td>
        )
      );
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
