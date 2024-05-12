import MonthView from "./MonthView";
import { useEffect, useState } from "react";
import { fetchAll } from "../../common/api";
import { Event } from "../../interfaces/Event";
import {
  daysInMonth,
  formatDateForCalendar,
  months,
} from "../../common/timeData";
import { useNavigate } from "react-router-dom";
import { CalendarI } from "../../interfaces/CalendarI";
import { MonthDataType } from "../../interfaces/MonthData";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [calendars, setCalendars] = useState<Array<CalendarI>>([]);
  const [sharedCalendars, setSharedCalendars] = useState<Array<CalendarI>>([]);
  const [calendarsList, setCalendarsList] = useState<JSX.Element>();
  const [sharedCalendarsList, setSharedCalendarsList] = useState<JSX.Element>();
  // const [isLoading, setIsLoading] = useState(true);
  const [monthData, setMonthData] = useState<Array<MonthDataType>>([]);
  const [calId, setCalId] = useState<string>("");
  const [currentCal, setCurrentCal] = useState<string>("");
  const [year, setYear] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [dayCount, setDayCount] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const actualDate = new Date();
    const currentMoment = {
      day: actualDate.getDate(),
      month: actualDate.getMonth() + 1, // goes from 0, so shift
      year: actualDate.getFullYear(),
      hour: actualDate.getHours(),
      minute: actualDate.getMinutes(),
      weekDay: actualDate.getDay(), // goes from 1=Monday, ...
    };
    setYear(currentMoment.year);
    setMonth(currentMoment.month);
    setDayCount(daysInMonth(currentMoment.month, currentMoment.year));

    fetchAll(`/api/v1/calendars`).then((result) => {
      setCalendars(result?.data);
      if (result?.data.length !== 0) {
        setCalId(result?.data[0].calendar_id);
        setCurrentCal(result?.data[0].name);
        const calendarList: Array<JSX.Element> = [];
        if (result?.data)
          result?.data.map((calendar: CalendarI, i: number) => {
            calendarList.push(
              <li key={i}>
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentCal(calendar.name);
                    setCalId(calendar.calendar_id);
                  }}
                >
                  {calendar.name}
                </a>
              </li>
            );
          });
        const calendars: JSX.Element = <ul>{calendarList}</ul>;
        setCalendarsList(calendars);
      } else {
        setCalendarsList(<></>);
      }
    });

    fetchAll(`/api/v1/shared/calendars`).then((result) => {
      setSharedCalendars(result?.data);
      if (result?.data.length !== 0) {
        const calendarList: Array<JSX.Element> = [];
        if (result?.data)
          result?.data.map((calendar: CalendarI) => {
            calendarList.push(
              <li>
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentCal(calendar.name);
                    setCalId(calendar.calendar_id);
                  }}
                >
                  {calendar.name}
                </a>
              </li>
            );
          });
        const calendars = <ul>{calendarList}</ul>;
        setSharedCalendarsList(calendars);
      } else {
        setSharedCalendarsList(<></>);
      }
    });
  }, []);

  useEffect(() => {
    if (
      (calendars !== null && calendars.length !== 0) ||
      (sharedCalendars !== null && sharedCalendars.length !== 0)
    )
      fetchAll(`/api/v1/events/${calId}`).then((result) => {
        result?.data.map((event: Event) => {
          event.date_from = formatDateForCalendar(event.date_from);
          event.date_to = formatDateForCalendar(event.date_to);
        });
        setEvents(result?.data);
      });
  }, [calendars, sharedCalendars, calId]);

  useEffect(() => {
    if (events) {
      console.log(events);
      const filteredData: Array<MonthDataType> = [];
      const tmpEvents = events.filter((event: Event) => {
        const start_date = event.date_from.split(",");
        const end_date = event.date_to.split(",");

        if (Number(start_date[2]) > year || Number(end_date[2]) < year)
          return false;
        if (Number(start_date[2]) <= year && Number(start_date[1]) > month)
          return false;
        if (Number(end_date[2]) >= year && Number(end_date[1]) < month)
          return false;
        if (
          Number(start_date[2]) == year &&
          Number(end_date[2]) == year &&
          Number(start_date[1]) == month &&
          Number(end_date[1]) == month
        )
          return true;
        if (
          Number(start_date[2]) < year ||
          (Number(start_date[2]) == year && Number(start_date[1]) < month)
        )
          event.date_from = "1," + month + "," + year;
        if (
          Number(end_date[2]) > year ||
          (Number(end_date[2]) == year && Number(end_date[1]) > month)
        )
          event.date_to = dayCount + "," + month + "," + year;
        return true;
      });
      console.log(tmpEvents);
      tmpEvents.map((event: Event) => {
        //filterMonthData
        filteredData.push({
          name: event.name,
          id: event.id,
          color: event.color,
          day_from: event.date_from.split(",")[0],
          day_to: event.date_to.split(",")[0],
        });
      });
      setMonthData(filteredData);
    }
  }, [events, year, month, dayCount]);

  const changeDate = (direction: number) => {
    let chMonth = month || new Date().getMonth() + 1;
    let chYear = year || new Date().getFullYear();
    if (direction === -1) {
      if (month === 1) {
        chYear--;
        chMonth = 12;
      } else {
        chMonth--;
      }
    } else if (direction === 1) {
      if (month === 12) {
        chYear++;
        chMonth = 1;
      } else {
        chMonth++;
      }
    }
    setMonth(chMonth);
    setYear(chYear);
    setDayCount(daysInMonth(chMonth, chYear));
  };

  if (calendarsList !== <></> || sharedCalendarsList !== <></>) {
    return (
      <>
        <button
          onClick={() => {
            navigate("/calendar/new");
          }}
        >
          New calendar
        </button>
        <div>
          <p>Calendars:</p>
          {calendarsList}
        </div>
        <div>
          <p>Shared calendars:</p>
          {sharedCalendarsList}
        </div>
        <h2>
          {currentCal} {months[month]} {year}
        </h2>
        <button
          onClick={() => {
            navigate(`/calendar/share/${calId}`);
          }}
        >
          Share calendar
        </button>
        <button onClick={() => changeDate(-1)}>Previous</button>
        <button onClick={() => changeDate(1)}>Next</button>
        <MonthView data={monthData} monthLength={dayCount} />
      </>
    );
  } else {
    return (
      <>
        <h1>no calendars or shared calendars</h1>
      </>
    );
  }
};

export default Calendar;
