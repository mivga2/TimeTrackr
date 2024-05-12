import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { fetchAll, postNew } from "../../common/api";
import { useNavigate } from "react-router-dom";
import { calendarSelect, eventSelect } from "../../components/form/SelectInput";
import Loading from "../../common/Loading";

const NewTask = () => {
  const navigate = useNavigate();
  const cancelRoute = "/tasks";
  const [calendarLookup, setCalendarLookup] = useState([]);
  const [eventLookup, setEventLookup] = useState([]);
  const [errorList, setErrorList] = useState<Array<JSX.Element>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("New Task");
  const [description, setDescription] = useState("");
  const [dateDue, setDateDue] = useState(new Date().toISOString().slice(0, 16));
  const [location, setLocation] = useState("");
  const [calendar, setCalendar] = useState("");
  const [event, setEvent] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const [visible, setVisible] = useState(false);

  const taskData = {
    calendar_id: calendar,
    color: color,
    date_due: dateDue,
    description: description,
    event_id: event,
    id: "",
    completion_rate_id: "",
    name: name,
    visible: visible,
  };

  useEffect(() => {
    fetchAll("/api/v1/calendars").then((result) => {
      setCalendarLookup(result?.data);
    });
  }, []);

  useEffect(() => {
    if (calendar) {
      fetchAll(`/api/v1/events/${calendar}`)
        .then((result) => {
          setEventLookup(result?.data);
        })
        .then(() => setIsLoading(false));
    } else {
      setEventLookup([]);
    }
    setIsLoading(false);
  }, [calendar]);

  const createTask = (e: React.FormEvent) => {
    e.preventDefault();
    taskData.id = uuidv4();
    taskData.completion_rate_id = "471cae22-4db1-4986-ac88-a077df96aab0";

    postNew("/api/v1/task", taskData);
    navigate(cancelRoute);
  };

  const cancel = () => {
    navigate(cancelRoute);
  };

  if (isLoading)
    return (
      <>
        <Loading />
      </>
    );
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
            Due date:
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
              <option selected></option>
              {calendarSelect(calendarLookup)}
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
              <option selected></option>
              {eventSelect(eventLookup)}
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
        <input type="button" value="Cancel" onClick={cancel} />
      </form>
    </div>
  );
};

export default NewTask;
