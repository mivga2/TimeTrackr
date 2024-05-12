import Table from "../../components/Table";
import { fetchAll } from "../../common/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Task } from "../../interfaces/Task";
import { formatDateTime } from "../../common/timeData";
import Loading from "../../common/Loading";

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // columns in api
  const columns = [
    "name",
    "completion_rate_name",
    "date_due",
    "event_name",
    "calendar_name",
    "id",
  ];

  // options to execute with id, will redirect to .../edit/:id
  const idMapping = ["edit", "delete"];

  // table headers for api items
  const headers = {
    name: "Name",
    completion_rate_name: "Completion rate",
    date_due: "Due Date",
    event_name: "Associated event",
    calendar_name: "Associated Calendar",
    id: "Edit or delete task",
  };

  useEffect(() => {
    fetchAll("/api/v1/tasks")
      .then((result) => {
        result?.data.map((task: Task) => {
          task.date_due = formatDateTime(task.date_due);
        });

        setTasks(result?.data);
      })
      .then(() => setIsLoading(false));
  }, [tasks]);

  const newTask = () => {
    navigate("/tasks/new");
  };

  return (
    <>
      <button onClick={newTask}>Create new task</button>
      {isLoading ? (
        <Loading />
      ) : (
        <Table
          title="Tasks list"
          columnMapping={columns}
          idMapping={idMapping}
          headers={headers}
          data={tasks}
          itemType="tasks"
        />
      )}
    </>
  );
};

export default Tasks;
