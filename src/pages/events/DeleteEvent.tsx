// import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteOne } from "../../common/api";

const DeleteEvent = () => {
  const navigate = useNavigate();
  const cancelRoute = "/events";
  const { id } = useParams();

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
