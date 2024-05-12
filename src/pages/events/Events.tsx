import Table from "../../components/Table";
import { fetchAll } from "../../common/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../../common/timeData";
import { Event } from "../../interfaces/Event";
import Loading from "../../common/Loading";

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAll("/api/v1/events")
      .then((result) => {
        result?.data.map((event: Event) => {
          event.date_from = formatDateTime(event.date_from);
          event.date_to = formatDateTime(event.date_to);
        });

        setEvents(result?.data);
      })
      .then(() => setIsLoading(false));
  }, []);

  // columns in api
  const columns = ["name", "date_from", "date_to", "calendar_name", "id"];

  // action to be executed, redirects to .../edit/:id
  const idMapping = ["edit", "delete"];

  // headers for each api item
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
      {isLoading ? (
        <Loading />
      ) : (
        <Table
          title="Events list"
          columnMapping={columns}
          idMapping={idMapping}
          headers={headers}
          data={events}
          itemType="events"
        />
      )}
    </>
  );
};

export default Events;
