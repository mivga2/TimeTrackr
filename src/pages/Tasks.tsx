import Table from "../components/Table";
import NewTask from "./NewTask";

const Tasks = () => {
  const columns = [
    "Completion Rate",
    "Name",
    "Description",
    "Location",
    "Due Date",
    "Associated Event",
    "Calendar Link",
  ];

  const data = [
    [
      "no",
      "School",
      "goint to school",
      "at sch",
      "september",
      "june",
      "SCHOOL",
    ],
    ["never", "Work", "making mny", "office", "june", "always"],
  ];
  return (
    <>
      <NewTask displayNewTaskForm={false} />
      <Table title="Tasks list" columns={columns} data={data} />;
    </>
  );
};

export default Tasks;
