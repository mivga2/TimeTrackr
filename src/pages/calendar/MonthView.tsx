import { weekdays } from "../../common/timeData";
import { MonthDataType } from "../../interfaces/MonthData";

type CalendarProps = {
  data: Array<MonthDataType>;
  monthLength: number;
  monthStartDay: number;
};

const MonthView = ({ data, monthLength, monthStartDay }: CalendarProps) => {
  // modulo, that doesn't go negative
  function mod(n: number, m: number) {
    return ((n % m) + m) % m;
  }

  const monthDays = [];
  let monthWeek = [];
  for (let i = 0; i < mod(monthStartDay - 1, 7); i++) {
    monthWeek.push(<td>-</td>);
  }

  // creates month calendar with events from data
  // goes day by day and if event in the duration, then adds the color and name into the slot
  for (let i = 0; i < monthLength; i++) {
    let weekDay: Array<JSX.Element> = [];

    data.map((event) => {
      if (Number(event.day_from) <= i + 1 && i + 1 <= Number(event.day_to)) {
        weekDay.push(
          <p key={i + 200}>
            <svg height={20} width={20}>
              <defs></defs>
              <rect
                x="0em"
                y="0em"
                width="2em"
                height="0.75em"
                fill={event.color}
              />
            </svg>{" "}
            {event.name}
          </p>
        );
      }
    });
    monthWeek.push(
      <td key={i}>
        <p key={i+90}>{i + 1}</p>
        {weekDay}
      </td>
    );
    weekDay = [];

    if (monthWeek.length === 7 || i === monthLength - 1) {
      monthDays.push(<tr key={i + 30}>{monthWeek}</tr>);
      monthWeek = [];
    }
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            {weekdays.map((day: string, i: number) => (
              <td key={i}> {day} </td>
            ))}
          </tr>
        </thead>
        <tbody>{monthDays}</tbody>
      </table>
    </>
  );
};

export default MonthView;
