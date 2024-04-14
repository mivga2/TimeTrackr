import Table from "../components/Table";
import NewTask from "./NewTask";
import { fetchAll } from "../common/api";
import { useEffect, useState } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    fetchAll("/api/v1/tasks").then((result) => {
      setTasks(result?.data);
    });
  }, []);

  console.log(tasks);
  const columns = [
    "name",
    "completion_rate_id",
    "date_due",
    "event_id",
    "calendar_id",
  ];

  const headers = {
    name: "Name",
    completion_rate_id: "Completion rate",
    date_due: "Due Date",
    event_id: "Associated event",
    calendar_id: "Associated Calendar",
  };

  return (
    <>
      <NewTask displayNewTaskForm={true} />
      <Table
        title="Tasks list"
        columnMapping={columns}
        headers={headers}
        data={tasks}
      />
    </>
  );
};

export default Tasks;
