import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { postNew } from "../../common/api";
import { useNavigate } from "react-router-dom";

const NewCalendar = () => {
  const navigate = useNavigate();
  const cancelRoute = "/calendar";
  const [errorList, setErrorList] = useState<Array<JSX.Element>>([]);

  const [name, setName] = useState("New Calendar");

  const calendarData = {
    id: "",
    name: name,
  };

  useEffect(() => {
    const errors: Array<JSX.Element> = [];
    if (!name) errors.push(<p key="name">Name is required.</p>);

    setErrorList(errors);
  }, [name]);

  const createCalendar = (e: React.FormEvent) => {
    e.preventDefault();
    if (errorList.length !== 0) return;
    calendarData.id = uuidv4();

    // because of foreign keys, first calendar added, then permission
    postNew("/api/v1/calendar", calendarData);
    postNew("/api/v1/calendar/permission", calendarData);
    navigate(cancelRoute);
  };

  const cancel = () => {
    navigate(cancelRoute);
  };

  return (
    <div>
      {errorList}
      <form onSubmit={createCalendar}>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required
          />
        </div>

        <input type="submit" value="Create" />
        <input type="button" value="Cancel" onClick={cancel} />
      </form>
    </div>
  );
};

export default NewCalendar;
