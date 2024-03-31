type NewTaskProps = {
  displayNewTaskForm: boolean;
};
const NewTask = ({ displayNewTaskForm }: NewTaskProps) => {
  const taskName = "New task";
  if (displayNewTaskForm)
    return (
      <div>
        <div>
          <input type="text" value={taskName} autoFocus />
        </div>
        <div>
          <label>Description:</label>
          <textarea />
        </div>
        <div>
          <label>Due date:</label>
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
          <label>Associated event:</label>
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

export default NewTask;
