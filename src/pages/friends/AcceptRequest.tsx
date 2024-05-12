// import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateOne } from "../../common/api";

const AcceptRequest = () => {
  const navigate = useNavigate();
  const cancelRoute = "/friends";
  const { id } = useParams();

  const acceptRequest = (e: React.FormEvent) => {
    e.preventDefault();

    updateOne(`/api/v1/friend-request/sender/${id}`, {});
    navigate(cancelRoute);
  };

  const cancel = () => {
    navigate(cancelRoute);
  };
  
  return (
    <div>
      <form onSubmit={cancel}>
        <p>
          <b>Do you really wish to accept the friend request?</b>
        </p>
        <input type="submit" value="Cancel" />
        <input
          type="button"
          value="Accept friend request"
          onClick={acceptRequest}
        />
      </form>
    </div>
  );
};

export default AcceptRequest;
