// import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postNew } from "../common/api";

const AddFriend = () => {
  const navigate = useNavigate();
  const cancelRoute = "/friends";
  const { id } = useParams();

  const requestData = {
    sender_id: sessionStorage.getItem("id"),
    receiver_id: id,
    date: new Date(),
  };

  const addFriend = (e: React.FormEvent) => {
    e.preventDefault();

    postNew(`/api/v1/friend-request/`, requestData);
    navigate(cancelRoute);
  };

  const cancel = () => {
    navigate(cancelRoute);
  };

  return (
    <div>
      <form onSubmit={cancel}>
        <p>
          <b>Do you really wish to delete the task?</b>
        </p>
        <input type="submit" value="Cancel" />
        <input type="button" value="Send request" onClick={addFriend} />
      </form>
    </div>
  );
};

export default AddFriend;
