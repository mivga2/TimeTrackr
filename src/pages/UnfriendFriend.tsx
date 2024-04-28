// import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteOne } from "../common/api";

const UnfriendUser = () => {
  const navigate = useNavigate();
  const cancelRoute = "/friends";
  const { id } = useParams();

  const unfriendUser = (e: React.FormEvent) => {
    e.preventDefault();

    deleteOne(`/api/v1/friend-request/sender/${id}/receiver/${sessionStorage.getItem("id")}`);
    navigate(cancelRoute);
  };

  const cancel = () => {
    navigate(cancelRoute);
  };

  return (
    <div>
      <form onSubmit={cancel}>
        <p>
          <b>Do you really wish to unfriend the user?</b>
        </p>
        <input type="submit" value="Cancel" />
        <input type="button" value="Unfriend" onClick={unfriendUser} />
      </form>
    </div>
  );
};

export default UnfriendUser;
