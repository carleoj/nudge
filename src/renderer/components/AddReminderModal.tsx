import { useEffect, useState, type FormEvent } from 'react';
import type { Reminder } from '../types/reminder';

interface AddReminderModalProps {
  onClose: () => void;
  onAdd: (reminder: Reminder) => void;
}

function getToday(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function addDays(date: Date, days: number): string {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, '0')}-${String(nextDate.getDate()).padStart(2, '0')}`;
}

export default function AddReminderModal({
  onClose,
  onAdd,
}: AddReminderModalProps) {
  const [title, setTitle] = useState('');
  const [reminderDate, setReminderDate] = useState(getToday);
  const [instructions, setInstructions] = useState('');
  const [referenceUrl, setReferenceUrl] = useState('');
  const [error, setError] = useState('');

  const chooseDate = (daysFromToday: number): void => {
    setReminderDate(addDays(new Date(), daysFromToday));
    setError('');
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setError('Give your reminder a short title.');
      return;
    }
    if (!reminderDate) {
      setError('Choose a date for your reminder.');
      return;
    }
    const cleanReferenceUrl = referenceUrl.trim();
    if (cleanReferenceUrl) {
      try {
        const parsedUrl = new URL(cleanReferenceUrl);
        if (!['http:', 'https:'].includes(parsedUrl.protocol))
          throw new Error('Unsupported protocol');
      } catch {
        setError('Use a complete http:// or https:// reference link.');
        return;
      }
    }
    onAdd({
      id: crypto.randomUUID(),
      title: cleanTitle,
      reminderDate,
      completed: false,
      sound: '',
      instructions: instructions.trim() || undefined,
      referenceUrl: cleanReferenceUrl || undefined,
    });
  };

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-heading">
          <div>
            <p className="eyebrow">A little momentum</p>
            <h2 id="modal-title">What are you working on?</h2>
          </div>
          <button
            className="close-button"
            type="button"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Title</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Finish portfolio redesign"
            />
          </label>
          <label>
            <span>Remind me</span>
            <input
              type="date"
              value={reminderDate}
              onChange={(event) => setReminderDate(event.target.value)}
            />
          </label>
          <div className="date-quick-actions" aria-label="Quick date choices">
            <button
              className="quick-date-button"
              type="button"
              onClick={() => chooseDate(0)}
            >
              Today
            </button>
            <button
              className="quick-date-button"
              type="button"
              onClick={() => chooseDate(1)}
            >
              Tomorrow
            </button>
            <button
              className="quick-date-button"
              type="button"
              onClick={() => chooseDate(7)}
            >
              Next week
            </button>
          </div>
          <label>
            <span>
              Extra context <em>optional</em>
            </span>
            <textarea
              value={instructions}
              onChange={(event) => setInstructions(event.target.value)}
              placeholder="A tiny next step or note to help you begin"
              rows={3}
            />
          </label>
          <label>
            <span>
              Reference link <em>optional</em>
            </span>
            <input
              type="url"
              value={referenceUrl}
              onChange={(event) => setReferenceUrl(event.target.value)}
              placeholder="https://example.com"
            />
          </label>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <div className="modal-actions">
            <button
              className="button button-secondary"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="button button-primary" type="submit">
              Add reminder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
