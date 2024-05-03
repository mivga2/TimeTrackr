const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const formatDateTime = (rawDateTime: string) => {
  const datetime = new Date(rawDateTime);
  const date = datetime.toLocaleDateString().replace(" ", "").replace(" ", "");
  const time = datetime.toLocaleTimeString().split(":")[0] + ":" + datetime.toLocaleTimeString().split(":")[1]
  const weekday = weekdays[datetime.getDay()];
  return date + " " + time + ", " + weekday;
};
