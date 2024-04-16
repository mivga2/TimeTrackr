export interface Task {
  calendar_id: string;
  color: string;
  completion_rate_id: string;
  custom_repetition_dates: Array<string> | null;
  date_due: string;
  description: string | null;
  event_id: string | null;
  id: string;
  name: string;
  repetition_type_id: string | null;
  task_category_id: string | null;
  visible: boolean;
}
