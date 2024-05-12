import { useEffect, useState } from "react";
import { deleteOne, fetchAll, postNew } from "../../common/api";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../../components/Table";

const ShareCalendar = () => {
  const [friends, setFriends] = useState([]);
  const [shareTo, setShareTo] = useState(new Set());
  const [friendsCheckboxs, setFriendsCheckboxs] = useState([]);
  const cancelRoute = "/calendar";
  const { id } = useParams();
  const navigate = useNavigate();

  const cancel = () => {
    navigate(cancelRoute);
  };

  const share = (e) => {
    e.preventDefault()
    shareTo.forEach((item) => {
        postNew(`/api/v1/calendar/share/${id}`, {id: item});
        console.log(item)
    })
    navigate(cancelRoute)
  };

  const handleCheckbox = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      shareTo.add(value);
    } else {
      shareTo.delete(value);
    }
  };

  useEffect(() => {
    fetchAll("/api/v1/friends").then((result) => {
      setFriends(result?.data);
      const friendsList = [];
      result?.data.map((friend, i) => {
        friendsList.push(
          <tr key={i}>
            <td>
              <label>
                <input
                  type="checkbox"
                  value={friend.id}
                  onChange={handleCheckbox}
                  id="i"
                />
                {friend.username}
              </label>
            </td>
          </tr>
        );
      });
      setFriendsCheckboxs(
        <table>
          <tbody>{friendsList}</tbody>
        </table>
      );
    });
  }, []);

  return (
    <div>
      <form>
        <p>Who do you want to share the calendar with?</p>
        {friendsCheckboxs}
        <button type="submit" onClick={cancel}>
          Cancel
        </button>
        <button onClick={share}>Share</button>
      </form>
    </div>
  );
};

export default ShareCalendar;
