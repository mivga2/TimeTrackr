import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { postNew } from "../common/api";

type NewEventProps = {
  displayNewEventForm: boolean;
};

const NewEvent = ({ displayNewEventForm }: NewEventProps) => {
  const [name, setName] = useState("New Event");
  const [description, setDescription] = useState("");
  const [dateFrom, setDateFrom] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [dateTo, setDateTo] = useState(new Date().toISOString().slice(0, 16));
  const [location, setLocation] = useState("");
  const [calendar, setCalendar] = useState("26d44e0c-1963-4833-9fcc-258fcc59e028");
  const [color, setColor] = useState("#FFFFFF");

  const eventData = {
    calendar_id: calendar,
    color: color,
    date_from: dateFrom,
    date_to: dateTo,
    description: description,
    id: null,
    location: location,
    name: name,
  };

  const createEvent = (event) => {
    event.preventDefault();
    eventData.id = uuidv4();

    console.log("FORM DATA", eventData);
    postNew("/api/v1/event", eventData);
  };

  if (displayNewEventForm)
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
                <option value="26d44e0c-1963-4833-9fcc-258fcc59e028">none</option>
                <option value="1">optiontopick1</option>
                <option value="2">op2</option>
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

export default NewEvent;
