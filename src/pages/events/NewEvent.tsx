import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { fetchAll, postNew } from "../../common/api";
import { useNavigate } from "react-router-dom";

const NewEvent = () => {
  const navigate = useNavigate();
  const cancelRoute = "/events";
  const [calendarLookup, setCalendarLookup] = useState([]);

  useEffect(() => {
    fetchAll("/api/v1/calendars").then((result) => {
      setCalendarLookup(result?.data);
    });
  }, []);

  const [name, setName] = useState("New Event");
  const [description, setDescription] = useState("");
  const [dateFrom, setDateFrom] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [dateTo, setDateTo] = useState(new Date().toISOString().slice(0, 16));
  const [location, setLocation] = useState("");
  const [calendar, setCalendar] = useState("");
  const [color, setColor] = useState("#FFFFFF");

  const calendarSelect = (calendarsList) => {
    const calendarOptions = calendarsList.map((calendarOpt, i: number) => (
      <option key={i} value={calendarOpt.calendar_id}>
        {calendarOpt.name}
      </option>
    ));
    return calendarOptions;
  };

  const eventData = {
    calendar_id: calendar,
    color: color,
    date_from: dateFrom,
    date_to: dateTo,
    description: description,
    id: "",
    location: location,
    name: name,
  };

  const createEvent = (e: React.FormEvent) => {
    e.preventDefault();
    eventData.id = uuidv4();

    postNew("/api/v1/event", eventData);
    navigate(cancelRoute);
  };

  const cancel = () => {
    navigate(cancelRoute);
  };

  return (
    <div>
      <form onSubmit={createEvent}>
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
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Date to:
            <input
              type="datetime-local"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
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
              <option></option>
              {calendarSelect(calendarLookup)}
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

export default NewEvent;
