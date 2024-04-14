import Table from "../components/Table";
import NewEvent from "./NewEvent";
import { fetchAll } from "../common/api";
import { useEffect, useState } from "react";

const Events = () => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    fetchAll("/api/v1/events").then((result) => {
      setEvents(result?.data);
    });
  }, []);

  const columns = ["name", "date_from", "date_to", "calendar_id"];

  const headers = {
    name: "Name",
    date_from: "Date From",
    date_to: "Date To",
    calendar_id: "Calendar",
  };

  return (
    <>
      <NewEvent displayNewEventForm={true} />
      <Table
        title="Events list"
        columnMapping={columns}
        headers={headers}
        data={events}
      />
    </>
  );
};

export default Events;
