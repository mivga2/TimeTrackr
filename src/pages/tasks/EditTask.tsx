import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchOne, updateOne } from "../../common/api";

const EditTask = () => {
  const navigate = useNavigate();
  const cancelRoute = "/tasks";
  const { id } = useParams();

  const [task, setTask] = useState({
    name: null,
    description: null,
    date_due: "",
    location: null,
    calendar_id: null,
    event: null,
    color: null,
    visible: null,
  });

  useEffect(() => {
    fetchOne(`/api/v1/task/${id}`).then((result) => {
      setTask(result?.data[0]);
    });
  }, [id]);

  useEffect(() => {
    setName(task.name || "");
    setDescription(task.description ? task.description : "");
    setDateDue(task.date_due ? task.date_due.slice(0, 16) : "");
    setLocation(task.location || "");
    setCalendar(task.calendar_id || "");
    setEvent(task.event || "");
    setColor(task.color || "");
    setVisible(task.visible || false);
  }, [task]);

  const [name, setName] = useState("New Task");
  const [description, setDescription] = useState("");
  const [dateDue, setDateDue] = useState(new Date().toISOString().slice(0, 16));
  const [location, setLocation] = useState("");
  const [calendar, setCalendar] = useState("");
  const [event, setEvent] = useState("");
  const [color, setColor] = useState("");
  const [visible, setVisible] = useState(false);

  const taskData = {
    calendar_id: calendar,
    color: color,
    date_due: dateDue,
    description: description,
    event_id: event,
    id: id,
    completion_rate_id: "471cae22-4db1-4986-ac88-a077df96aab0",
    name: name,
    visible: visible,
  };

  const updateTask = (e: React.FormEvent) => {
    e.preventDefault();
    taskData.event_id = "5012bda6-340b-4d9e-8ffa-880f1d78fca2";

    updateOne(`/api/v1/task/${id}`, taskData);
    navigate(cancelRoute);
  };

  const cancel = () => {
    navigate(cancelRoute);
  };

  return (
    <div>
      <form onSubmit={updateTask}>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>
        <div>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Date from:
            <input
              type="datetime-local"
              value={dateDue}
              onChange={(e) => setDateDue(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Location:
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Calendar:
            <select
              value={calendar}
              onChange={(e) => setCalendar(e.target.value)}
            >
              <option value="26d44e0c-1963-4833-9fcc-258fcc59e028">none</option>
              <option value="1">optiontopick1</option>
              <option value="2">op2</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Visible in calendar:
            <input
              type="checkbox"
              checked={visible}
              onChange={(e) => setVisible(e.target.checked)}
            />
          </label>
        </div>
        <div>
          <label>
            Associated event:
            <select value={event} onChange={(e) => setEvent(e.target.value)}>
              <option value="5012bda6-340b-4d9e-8ffa-880f1d78fca2">none</option>
              <option value="5012bda6-340b-4d9e-8ffa-880f1d78fca2">
                optiontopick1
              </option>
              <option value="5012bda6-340b-4d9e-8ffa-880f1d78fca2">op2</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Color:
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </label>
        </div>

        <input type="submit" value="Update" />
        <input type="button" value="Cancel" onClick={cancel} />
      </form>
    </div>
  );
};

export default EditTask;
