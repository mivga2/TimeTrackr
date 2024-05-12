import { MonthDataType } from "../../interfaces/MonthData";

type CalendarProps = {
  data: Array<MonthDataType>;
  monthLength: number;
};

const MonthView = ({ data, monthLength }: CalendarProps) => {
  function mod(n: number, m: number) {
    return ((n % m) + m) % m;
  }

  const actualDate = new Date();
  const currentMoment = {
    day: actualDate.getDate(),
    month: actualDate.getMonth(), // goes from 0, so shift
    year: actualDate.getFullYear(),
    hour: actualDate.getHours(),
    minute: actualDate.getMinutes(),
    weekDay: actualDate.getDay(), // goes from 1=Monday, ...
  };

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const monthStartDay = 1; //mon, tue, wen,...
  // const calendarSlots = monthLength + mod(monthStartDay - 1, 7);

  const monthDays = [];
  let monthWeek = [];
  for (let i = 0; i < mod(monthStartDay - 1, 7); i++) {
    monthWeek.push(<td>-</td>);
  }
  for (let i = 0; i < monthLength; i++) {
    let weekDay: Array<JSX.Element> = [];

    data.map((event) => {
      if (Number(event.day_from) <= i + 1 && i + 1 <= Number(event.day_to)) {
        weekDay.push(
          <p>
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
      <td>
        <p>{i + 1}</p>
        {weekDay}
      </td>
    );
    weekDay = [];

    if (monthWeek.length === 7 || i === monthLength - 1) {
      monthDays.push(<tr>{monthWeek}</tr>);
      monthWeek = [];
    }
  }

  const problematicMonth = () => {
    const previousMonthDays = 30;
    const currentMonthDays = 31;
    if (currentMoment.day < 7) {
      return previousMonthDays;
    } else {
      return currentMonthDays;
    }
  };

  const weekStartDate = currentMoment.day - currentMoment.weekDay + 1;
  const currentWeekDays = [];

  for (let i = weekStartDate; i < weekStartDate + 7; i++) {
    if (i === currentMoment.day) {
      currentWeekDays.push(
        <td key={i}>
          <b>{mod(i - 1, problematicMonth()) + 1} day</b>
        </td>
      );
    } else {
      currentWeekDays.push(
        <td key={i}>{mod(i - 1, problematicMonth()) + 1} day</td>
      );
    }
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            {weekDays.map((day: string, i: number) => (
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
