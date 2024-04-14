export interface Event {
  calendar_id: string;
  color: string;
  custom_repetition_dates: Array<string> | null;
  date_from: string;
  date_to: string;
  description: string | null;
  event_category_id: string | null;
  id: string;
  location: string | null;
  name: string;
  repetition_type_id: string | null;
}
