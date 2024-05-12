import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAll, fetchOne, updateOne } from "../../common/api";
import { calendarSelect } from "../../components/form/SelectInput";

const EditEvent = () => {
  const navigate = useNavigate();
  const cancelRoute = "/events";
  const { id } = useParams();
  const [calendarLookup, setCalendarLookup] = useState([]);

  const [name, setName] = useState("New Event");
  const [description, setDescription] = useState("");
  const [dateFrom, setDateFrom] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [dateTo, setDateTo] = useState(new Date().toISOString().slice(0, 16));
  const [location, setLocation] = useState("");
  const [calendar, setCalendar] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const [event, setEvent] = useState({
    name: null,
    description: null,
    date_from: "",
    date_to: "",
    location: null,
    calendar_id: null,
    color: null,
  });

  const eventData = {
    calendar_id: calendar,
    color: color,
    date_from: dateFrom,
    date_to: dateTo,
    description: description,
    id: id,
    location: location,
    name: name,
  };

  useEffect(() => {
    setName(event.name || "");
    setDescription(event.description ? event.description : "");
    setDateFrom(event.date_from ? event.date_from.slice(0, 16) : "");
    setDateTo(event.date_to ? event.date_to.slice(0, 16) : "");
    setLocation(event.location || "");
    setCalendar(event.calendar_id || "");
    setColor(event.color || "#FFFFFF");
  }, [event]);

  useEffect(() => {
    fetchOne(`/api/v1/event/${id}`).then((result) => {
      setEvent(result?.data[0]);
    });

    fetchAll("/api/v1/calendars").then((result) => {
      setCalendarLookup(result?.data);
    });
  }, [id]);

  const updateEvent = (e: React.FormEvent) => {
    e.preventDefault();

    updateOne(`/api/v1/event/${id}`, eventData);
    navigate(cancelRoute);
  };

  const cancel = () => {
    navigate(cancelRoute);
  };

  return (
    <div>
      <form onSubmit={updateEvent}>
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

        <input type="submit" value="Update" />
        <input
          type="button"
          value="Cancel"
          onClick={cancel}
        />
      </form>
    </div>
  );
};

export default EditEvent;
