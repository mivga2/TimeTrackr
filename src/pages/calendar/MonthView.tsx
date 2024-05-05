const MonthView = () => {
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
  
    console.log("Actual date is", currentMoment);
  
    const weekDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
  
    const monthLength = 30;
    const monthStartDay = 1; //mon, tue, wen,...
    const calendarSlots = monthLength + mod(monthStartDay - 1, 7);

    const monthDays = [];
    let monthWeek = [];
    for (let i = 0; i < mod(monthStartDay - 1,7); i++) {
        monthWeek.push(
            <td>-</td>
        )
    }
    for (let i = 0; i < monthLength; i++) {
        monthWeek.push(
            <td>{i+1}</td>
        )
        
        if(monthWeek.length === 7 || i === monthLength - 1) {
            monthDays.push(
                <tr>{monthWeek}</tr>
            )
            monthWeek = []
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
    // const [currentDay, setCurrentDay] = useState(new Date());
    
  
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
          <tbody>
            {monthDays}
          </tbody>
        </table>
      </>
    );
  };
  
  export default MonthView;
  