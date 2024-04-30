// import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteOne } from "../../common/api";

const DeleteEvent = () => {
  const navigate = useNavigate();
  const cancelRoute = "/events";
  const { id } = useParams();

//   const [event, setEvent] = useState([]);

  //   useEffect(() => {
  //     fetchOne(`/api/v1/event/${id}`).then((result) => {
  //       setEvent(result?.data[0]);
  //     });
  //   }, [id]);

  //   useEffect(() => {
  //     setName(event.name);
  //     setDescription(event.description ? event.description : '');
  //     setDateFrom(event.date_from ? event.date_from.slice(0, 16) : '');
  //     setDateTo(event.date_to ? event.date_to.slice(0, 16) : '');
  //     setLocation(event.location);
  //     setCalendar(event.calendar_id);
  //     setColor(event.color);
  //   }, [event]);

//   const [name, setName] = useState("New Event");
//   const [description, setDescription] = useState("");
//   const [dateFrom, setDateFrom] = useState(
//     new Date().toISOString().slice(0, 16)
//   );
//   const [dateTo, setDateTo] = useState(new Date().toISOString().slice(0, 16));
//   const [location, setLocation] = useState("");
//   const [calendar, setCalendar] = useState("");
//   const [color, setColor] = useState("#FFFFFF");

//   const eventData = {
//     calendar_id: calendar,
//     color: color,
//     date_from: dateFrom,
//     date_to: dateTo,
//     description: description,
//     id: id,
//     location: location,
//     name: name,
//   };

//   console.log("event", event);
//   console.log("event data", eventData);

  const deleteEvent = (e: React.FormEvent) => {
    e.preventDefault();

    deleteOne(`/api/v1/event/${id}`);
    navigate(cancelRoute);
  };

  const cancel = () => {
    navigate(cancelRoute);
  };

  return (
    <div>
      <form onSubmit={cancel}>
        <p>
          <b>Do you really wish to delete the event?</b>
        </p>
        <input type="submit" value="Cancel" />
        <input type="button" value="Delete" onClick={deleteEvent} />
      </form>
    </div>
  );
};

export default DeleteEvent;
