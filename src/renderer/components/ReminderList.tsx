import type { Reminder } from '../types/reminder';
import ReminderItem from './ReminderItem';

interface ReminderListProps {
  title: string;
  reminders: Reminder[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ReminderList({
  title,
  reminders,
  onToggle,
  onDelete,
}: ReminderListProps) {
  return (
    <section className="reminder-section" aria-labelledby={`${title}-heading`}>
      <div className="section-heading">
        <h2 id={`${title}-heading`}>{title}</h2>
        <span>{reminders.length}</span>
      </div>
      <div className="reminder-list">
        {reminders.map((reminder) => (
          <ReminderItem
            key={reminder.id}
            reminder={reminder}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}
