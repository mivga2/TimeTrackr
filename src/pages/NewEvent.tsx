type NewEventProps = {
  displayNewEventForm: boolean;
};

const NewEvent = ({ displayNewEventForm }: NewEventProps) => {
  const eventName = "New event";

  if (displayNewEventForm)
    return (
      <div>
        <div>
          <input type="text" value={eventName} autoFocus />
        </div>
        <div>
          <label>Description:</label>
          <textarea />
        </div>
        <div>
          <label>Date from:</label>
          <input type="datetime-local" />
        </div>
        <div>
          <label>Date to:</label>
          <input type="datetime-local" />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" />
        </div>
        <div>
          <label>Calendar:</label>
          <select>
            <option selected>none</option>
            <option>optiontopick1</option>
            <option>op2</option>
          </select>
        </div>
        <div>
          <label>Color:</label>
          <input type="color" />
        </div>

        <input type="submit" value="Create" />
      </div>
    );

  return null;
};

export default NewEvent;
