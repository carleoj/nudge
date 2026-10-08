import { useState } from 'react';
import type { Reminder } from '../types/reminder';

interface ReminderItemProps { reminder: Reminder; onToggle: (id: string) => void; onDelete: (id: string) => void; }

function formatReminderDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export default function ReminderItem({ reminder, onToggle, onDelete }: ReminderItemProps) {
  const [isDeletePending, setIsDeletePending] = useState(false);

  return (
    <article className={`reminder-item${reminder.completed ? ' is-completed' : ''}`}>
      <button className="check-button" type="button" onClick={() => onToggle(reminder.id)}
        aria-label={`${reminder.completed ? 'Mark' : 'Complete'} ${reminder.title}`} aria-pressed={reminder.completed}>
        {reminder.completed ? '✓' : ''}
      </button>
      <div className="reminder-copy">
        <p className="reminder-title">{reminder.title}</p>
        <p className="reminder-date">{formatReminderDate(reminder.reminderDate)}</p>
        {reminder.instructions && <p className="reminder-instructions">{reminder.instructions}</p>}
        {reminder.referenceUrl && <a className="reminder-link" href={reminder.referenceUrl} target="_blank" rel="noreferrer">Open reference ↗</a>}
      </div>
      <div className="reminder-actions">
        {isDeletePending ? (
          <>
            <span className="delete-question">Delete?</span>
            <button className="delete-button confirm-delete" type="button" onClick={() => onDelete(reminder.id)} aria-label={`Confirm delete ${reminder.title}`}>✓</button>
            <button className="delete-button" type="button" onClick={() => setIsDeletePending(false)} aria-label="Cancel delete">×</button>
          </>
        ) : (
          <button className="delete-button" type="button" onClick={() => setIsDeletePending(true)} aria-label={`Delete ${reminder.title}`}>×</button>
        )}
      </div>
    </article>
  );
}
