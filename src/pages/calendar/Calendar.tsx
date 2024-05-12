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
import Loading from "../../common/Loading";

const Calendar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [calendars, setCalendars] = useState<Array<CalendarI>>([]);
  const [sharedCalendars, setSharedCalendars] = useState<Array<CalendarI>>([]);
  const [calendarsList, setCalendarsList] = useState<JSX.Element>();
  const [sharedCalendarsList, setSharedCalendarsList] = useState<JSX.Element>();
  const [monthData, setMonthData] = useState<Array<MonthDataType>>([]);
  const [calId, setCalId] = useState<string>("");
  const [currentCal, setCurrentCal] = useState<string>("");
  const [year, setYear] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [dayCount, setDayCount] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const actualDate = new Date();
    setYear(actualDate.getFullYear());
    setMonth(actualDate.getMonth() + 1);
    setDayCount(
      daysInMonth(actualDate.getMonth() + 1, actualDate.getFullYear())
    );

    fetchAll(`/api/v1/calendars`).then((result) => {
      setCalendars(result?.data);
      if (result?.data.length !== 0) {
        // first calendar is displayed
        setCalId(result?.data[0].calendar_id);
        setCurrentCal(result?.data[0].name);

        // list of owned calendars
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
        const cals: JSX.Element = <ul>{calendarList}</ul>;
        setCalendarsList(cals);
      } else {
        setCalendarsList(<></>);
      }
    });

    fetchAll(`/api/v1/shared/calendars`).then((result) => {
      setSharedCalendars(result?.data);
      console.log(result?.data)
      if (result?.data.length !== 0) {
        if (calendars.length === 0) {
          // first calendar is displayed
          setCalId(result?.data[0].calendar_id);
          setCurrentCal(result?.data[0].name);
        }

        // list of shared calendars
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
        const cals = <ul>{calendarList}</ul>;
        setSharedCalendarsList(cals);
      } else {
        setSharedCalendarsList(<></>);
      }
    });
  }, []);

  useEffect(() => {
    // gets all the events for a calendar
    if (
      (calendars !== null && calendars.length !== 0) ||
      (sharedCalendars !== null && sharedCalendars.length !== 0)
    ) {
      fetchAll(`/api/v1/events/${calId}`)
        .then((result) => {
          result?.data.map((event: Event) => {
            event.date_from = formatDateForCalendar(event.date_from);
            event.date_to = formatDateForCalendar(event.date_to);
          });
          setEvents(result?.data);
        })
        .then(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [calendars, sharedCalendars, calId]);

  useEffect(() => {
    if (events) {
      // filters data only for the displayed month
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
      tmpEvents.map((event: Event) => {
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

  return (
    <>
      <button
        onClick={() => {
          navigate("/calendar/new");
        }}
      >
        New calendar
      </button>

      {isLoading ? (
        <Loading />
      ) : calendarsList !== <></> || sharedCalendarsList !== <></> ? (
        <div>
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
          <MonthView
            data={monthData}
            monthLength={dayCount}
            monthStartDay={1}
          />
        </div>
      ) : (
        <h1>no calendars or shared calendars</h1>
      )}
    </>
  );
};

export default Calendar;
