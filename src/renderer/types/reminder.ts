export interface Reminder {
  id: string;
  title: string;
  reminderDate: string;
  completed: boolean;
  sound: string;
  instructions?: string;
  referenceUrl?: string;
}
