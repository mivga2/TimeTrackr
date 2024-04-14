import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { postNew } from "../common/api";

type NewTaskProps = {
  displayNewTaskForm: boolean;
};
const NewTask = ({ displayNewTaskForm }: NewTaskProps) => {
  const [name, setName] = useState("New Task");
  const [description, setDescription] = useState("");
  const [dateDue, setDateDue] = useState(new Date().toISOString().slice(0, 16));
  const [location, setLocation] = useState("");
  const [calendar, setCalendar] = useState(
    "26d44e0c-1963-4833-9fcc-258fcc59e028"
  );
  const [event, setEvent] = useState(null);
  const [color, setColor] = useState("#FFFFFF");
  const [visible, setVisible] = useState(false);

  const taskData = {
    calendar_id: calendar,
    color: color,
    date_due: dateDue,
    description: description,
    event_id: event,
    id: null,
    name: name,
    visible: visible,
  };

  const createTask = (e) => {
    e.preventDefault();
    taskData.id = uuidv4();
    taskData.completion_rate_id = "471cae22-4db1-4986-ac88-a077df96aab0";

    postNew("/api/v1/task", taskData);
  };

  if (displayNewTaskForm)
    return (
      <div>
        <form onSubmit={createTask}>
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
                <option value="26d44e0c-1963-4833-9fcc-258fcc59e028">
                  none
                </option>
                <option value="1">optiontopick1</option>
                <option value="2">op2</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Visible in calendar:
              <input type="checkbox" checked={visible}
                onChange={(e) => setVisible(e.target.checked)} />
            </label>
          </div>
          <div>
            <label>
              Associated event:
              <select value={event} onChange={(e) => setEvent(e.target.value)}>
                <option value="5012bda6-340b-4d9e-8ffa-880f1d78fca2">
                  none
                </option>
                <option value="5012bda6-340b-4d9e-8ffa-880f1d78fca2">
                  optiontopick1
                </option>
                <option value="5012bda6-340b-4d9e-8ffa-880f1d78fca2">
                  op2
                </option>
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

          <input type="submit" value="Create" />
        </form>
      </div>
    );

  return null;
};

export default NewTask;
