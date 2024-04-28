import Table from "../components/Table";
import { fetchAll } from "../common/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState(null);
  
  useEffect(() => {
    fetchAll("/api/v1/events").then((result) => {
      setEvents(result?.data);
    });
    
  }, [events]);

  const columns = ["name", "date_from", "date_to", "calendar_name", "id"];
  
  const idMapping = ["edit", "delete"]

  const headers = {
    name: "Name",
    date_from: "Date From",
    date_to: "Date To",
    calendar_id: "Calendar",
    calendar_name: "Calendar",
    id: "Edit or delete event",
  };

  const newEvent = () => {
    navigate("/events/new");
  };

  return (
    <>
      <button onClick={newEvent}>Create new event</button>
      <Table
        title="Events list"
        columnMapping={columns}
        idMapping={idMapping}
        headers={headers}
        data={events}
        itemType="events"
      />
    </>
  );
};

export default Events;
