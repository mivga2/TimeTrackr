import Table from "../../components/Table";
import { fetchAll } from "../../common/api";
import { useEffect, useState } from "react";

const Friends = () => {
  const [friends, setFriends] = useState(null);
  const [users, setUsers] = useState(null);
  const [requests, setRequests] = useState(null);
  const [sentRequests, setSentRequests] = useState(null);
  
  useEffect(() => {
    fetchAll("/api/v1/friends").then((result) => {
      setFriends(result?.data);
    });
    fetchAll("/api/v1/users").then((result) => {
      setUsers(result?.data);
    });
    fetchAll("/api/v1/requests").then((result) => {
      setRequests(result?.data);
    });
    fetchAll("/api/v1/sent-requests").then((result) => {
      setSentRequests(result?.data);
    });
  }, [sentRequests]);

  const columns: Array<string> = ["username", "id"];

  const sentColumns: Array<string> = ["username"];

  const idMappingFriends: Array<string> = ["unfriend"];

  const idMappingUsers: Array<string> = ["add"];

  const idMappingRequests: Array<string> = ["accept"];

  const idMappingSentRequests: Array<string> = [];

  const headers = {
    username: "Username",
    id: "Action",
  };

  return (
    <>
      <Table
        title="Friends list"
        columnMapping={columns}
        headers={headers}
        idMapping={idMappingFriends}
        data={friends}
        itemType="friends"
      />

      <Table
        title="Pending requests list"
        columnMapping={columns}
        headers={headers}
        idMapping={idMappingRequests}
        data={requests}
        itemType="friends"
      />

      <Table
        title="Sent requests list"
        columnMapping={sentColumns}
        headers={headers}
        idMapping={idMappingSentRequests}
        data={sentRequests}
        itemType="friends"
      />

      <Table
      title="Users list"
      columnMapping={columns}
      idMapping={idMappingUsers}
      headers={headers}
      data={users}
      itemType="friends"
    />
    </>
  );
};

export default Friends;