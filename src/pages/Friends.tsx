import Table from "../components/Table";

const Friends = () => {
  const columns = [
    "Name",
    "Unfriend"
  ];

  const data = [
    ["School", "UN"], ["at sch", "UN"], ["june", "UN"]
  ];
  return (
    <div>
      {/* <Table title="Friends list" columns={columns} data={data} /> */}
    </div>
  );
};

export default Friends;
