import { CalendarI } from "../../interfaces/CalendarI";
import { CompletionRates } from "../../interfaces/CompletionRates";
import { Event } from "../../interfaces/Event";

export const eventSelect = (eventsList: Array<Event>) => {
  const eventOptions = eventsList.map((eventOpt, i: number) => (
    <option key={i} value={eventOpt.id}>
      {eventOpt.name}
    </option>
  ));
  return eventOptions;
};

export const calendarSelect = (calendarsList: Array<CalendarI>) => {
  const calendarOptions = calendarsList.map((calendarOpt, i: number) => (
    <option key={i} value={calendarOpt.calendar_id}>
      {calendarOpt.name}
    </option>
  ));
  return calendarOptions;
};

export const completionRateSelect = (
  completionRatesList: Array<CompletionRates>
) => {
  const completionRateOptions = completionRatesList.map(
    (completionRateOpt, i: number) => (
      <option key={i} value={completionRateOpt.id}>
        {completionRateOpt.description}
      </option>
    )
  );
  return completionRateOptions;
};
