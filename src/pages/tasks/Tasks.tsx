import Table from "../../components/Table";
import { fetchAll } from "../../common/api";
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

  const columns = [
    "name",
    "completion_rate_name",
    "date_due",
    "event_name",
    "calendar_name",
    "id",
  ];

  const idMapping = ["edit", "delete"]

  const headers = {
    name: "Name",
    completion_rate_name: "Completion rate",
    date_due: "Due Date",
    event_name: "Associated event",
    calendar_name: "Associated Calendar",
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
        idMapping={idMapping}
        headers={headers}
        data={tasks}
        itemType="tasks"
      />
    </>
  );
};

export default Tasks;
