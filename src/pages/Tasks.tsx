import Table from "../components/Table";
import { fetchAll } from "../common/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    fetchAll("/api/v1/tasks").then((result) => {
      setTasks(result?.data);
    });
  }, [tasks]);

  console.log(tasks);
  const columns = [
    "name",
    "completion_rate_id",
    "date_due",
    "event_id",
    "calendar_id",
    "id",
  ];

  const headers = {
    name: "Name",
    completion_rate_id: "Completion rate",
    date_due: "Due Date",
    event_id: "Associated event",
    calendar_id: "Associated Calendar",
    id: "Edit or delete task",
  };

  const newTask = () => {
    navigate("/tasks/new");
  };

  return (
    <>
      <button onClick={newTask}>Create new task</button>
      <Table
        title="Tasks list"
        columnMapping={columns}
        headers={headers}
        data={tasks}
        itemType="tasks"
      />
    </>
  );
};

export default Tasks;
