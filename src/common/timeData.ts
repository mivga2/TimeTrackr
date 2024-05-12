export const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const months = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatDateTime = (rawDateTime: string) => {
  const datetime = new Date(rawDateTime);
  const date = datetime.toLocaleDateString().replace(" ", "").replace(" ", "");
  const time =
    datetime.toLocaleTimeString().split(":")[0] +
    ":" +
    datetime.toLocaleTimeString().split(":")[1];
  const weekday = weekdays[datetime.getDay()];
  return date + " " + time + ", " + weekday;
};

export const formatDateForCalendar = (rawDateTime: string) => {
  const datetime = new Date(rawDateTime);
  const day = datetime.getDate();
  const month = datetime.getMonth() + 1;
  const year = datetime.getFullYear();
  return day + "," + month + "," + year;
};

export const daysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};
