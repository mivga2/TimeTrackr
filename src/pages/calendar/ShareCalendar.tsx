import { useEffect, useState } from "react";
import { fetchAll, postNew } from "../../common/api";
import { useNavigate, useParams } from "react-router-dom";
import { Friends } from "../../interfaces/Friends";

const ShareCalendar = () => {
  const [shareTo, setShareTo] = useState(new Set());
  const [friendsCheckboxs, setFriendsCheckboxs] = useState<JSX.Element>(<></>);
  const cancelRoute = "/calendar";
  const { id } = useParams();
  const navigate = useNavigate();
  
  // checked friends will be granted permission
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const tmpShare = shareTo
    if (e.target.checked) {
      tmpShare.add(value);
    } else {
      tmpShare.delete(value);
    }
    setShareTo(tmpShare)
  };

  useEffect(() => {
    // makes checkbox list of friends
    fetchAll("/api/v1/friends").then((result) => {
      const friendsList: Array<JSX.Element> = [];
      result?.data.map((friend: Friends, i: number) => {
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

  const share = (e: React.FormEvent) => {
    e.preventDefault();

    shareTo.forEach((item) => {
      postNew(`/api/v1/calendar/share/${id}`, { id: item });
    });
    navigate(cancelRoute);
  };


  const cancel = () => {
    navigate(cancelRoute);
  };

  return (
    <div>
      <form onSubmit={share}>
        <p>Who do you want to share the calendar with?</p>
        {friendsCheckboxs}
        <button type="submit" onClick={cancel}>
          Cancel
        </button>
        <button>Share</button>
      </form>
    </div>
  );
};

export default ShareCalendar;
