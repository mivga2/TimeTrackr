const WeekView = () => {
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
  
    const hours = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ];
  
    // const hours = [
    //   0, 1, 2, 3, 4, 5,
    // ];
    // const minutes = [
    //   0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    //   21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    //   40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
    //   59,
    // ];
    const minutes = [
      0, 15, 30, 45, 60
    ];
  
    // const maxHour = 23;
    // const maxMinute = 59;
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
  
    
    const hourMinutes = [];
    for (const minute in minutes) {
      hourMinutes.push(
        <tr>
          <td></td>
        </tr>
      );
    }
  
    const weekHours = [];
  
    for (const hour in hours) {
      weekHours.push(
        <tr>
          <td style={{width: "100%"}}><table><tbody>{hourMinutes}</tbody></table></td>
        </tr>
      );
    }
    
  
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
            <tr>{currentWeekDays}</tr>
            
            <tr>
              <td><table><tbody>{weekHours}</tbody></table></td>
              <td><table><tbody>{weekHours}</tbody></table></td>
              <td><table><tbody>{weekHours}</tbody></table></td>
              <td><table><tbody>{weekHours}</tbody></table></td>
              <td><table><tbody>{weekHours}</tbody></table></td>
              <td><table><tbody>{weekHours}</tbody></table></td>
              <td><table><tbody>{weekHours}</tbody></table></td>
            </tr>
            
          </tbody>
        </table>
      </>
    );
  };
  
  export default WeekView;
  