import Table from "../components/Table";
import NewEvent from "./NewEvent";

const Events = () => {
  const columns = [
    "Name",
    "Description",
    "Location",
    "Date From",
    "Date To",
    "Calendar Link",
  ];

  const data = [
    ["School", "goint to school", "at sch", "september", "june", "SCHOOL"],
    ["Work", "making mny", "office", "june", "always"],
  ];
  return (
  <>
  <NewEvent displayNewEventForm={ false }/>
  <Table title="Events list" columns={columns} data={data} />
  </>
  );
};

export default Events;
