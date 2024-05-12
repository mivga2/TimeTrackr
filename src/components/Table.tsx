import { Data } from "../interfaces/Data";

type TableProps = {
  title: string;
  columnMapping: any;
  idMapping: any;
  headers: any;
  data: any;
  itemType: string;
};

const Table = ({
  title,
  columnMapping,
  idMapping,
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
    columnEntries = data.map((entry: Data, i1: number) => {
      const row = columnMapping.map((item: keyof Data, i2: number) =>
        item == "id" ? (
          <td key={i2}>
            {idMapping.map((it: string, i3: number) => (
              <a href={"/" + itemType + "/" + it + "/" + entry[item]} key={i3}>
                {it}{" "}
              </a>
            ))}
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
      {data !== null && data.length !== 0 ? (
        <table>
          <thead>
            <tr>{columnTitles}</tr>
          </thead>
          <tbody>{columnEntries}</tbody>
        </table>
      ) : (
        <h3>You have no items.</h3>
      )}
    </div>
  );
};

export default Table;
