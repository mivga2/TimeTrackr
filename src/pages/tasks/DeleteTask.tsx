// import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteOne } from "../../common/api";

const DeleteTask = () => {
  const navigate = useNavigate();
  const cancelRoute = "/tasks";
  // id from route
  const { id } = useParams();

  const deleteTask = (e: React.FormEvent) => {
    e.preventDefault();

    deleteOne(`/api/v1/task/${id}`);
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
        <input type="button" value="Delete" onClick={deleteTask} />
      </form>
    </div>
  );
};

export default DeleteTask;
