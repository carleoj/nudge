import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import ReminderList from './components/ReminderList';
import EmptyState from './components/EmptyState';
import AddReminderModal from './components/AddReminderModal';
import type { Reminder } from './types/reminder';
import './App.css';

const starterReminders: Reminder[] = [
  {
    id: 'starter-portfolio',
    title: 'Finish portfolio redesign',
    reminderDate: '2026-10-08',
    completed: false,
    sound: '',
  },
  {
    id: 'starter-nudge',
    title: 'Work on Nudge',
    reminderDate: '2026-10-08',
    completed: false,
    sound: '',
  },
  {
    id: 'starter-application',
    title: 'Submit job application',
    reminderDate: '2026-10-10',
    completed: false,
    sound: '',
  },
];

function getToday(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function Main() {
  const [reminders, setReminders] = useState<Reminder[]>(starterReminders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const today = getToday();

  useEffect(() => {
    void window.electron?.reminders.load().then((savedReminders) => {
      if (savedReminders.length > 0) setReminders(savedReminders);
      return savedReminders;
    });
  }, []);

  useEffect(() => {
    void window.electron?.reminders.save(reminders);
  }, [reminders]);

  const { overdueReminders, todayReminders, upcomingReminders } = useMemo(
    () => ({
      overdueReminders: reminders.filter(
        (reminder) => !reminder.completed && reminder.reminderDate < today,
      ),
      todayReminders: reminders.filter(
        (reminder) => reminder.reminderDate === today,
      ),
      upcomingReminders: reminders.filter(
        (reminder) => reminder.reminderDate > today,
      ),
    }),
    [reminders, today],
  );

  const toggleReminder = (id: string) => {
    setReminders((currentReminders) =>
      currentReminders.map((reminder) =>
        reminder.id === id
          ? {
              ...reminder,
              completed: !reminder.completed,
            }
          : reminder,
      ),
    );
  };

  const addReminder = (reminder: Reminder) => {
    setReminders((currentReminders) => [...currentReminders, reminder]);

    setIsModalOpen(false);
  };

  const deleteReminder = (id: string): void => {
    setReminders((currentReminders) =>
      currentReminders.filter((reminder) => reminder.id !== id),
    );
  };

  return (
    <main className={`app${isDarkMode ? ' dark-mode' : ''}`}>
      <Header
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((current) => !current)}
      />

      <section className="content">
        {overdueReminders.length > 0 && (
          <ReminderList
            title="Needs attention"
            reminders={overdueReminders}
            onToggle={toggleReminder}
            onDelete={deleteReminder}
          />
        )}
        {todayReminders.length > 0 && (
          <ReminderList
            title="Today"
            reminders={todayReminders}
            onToggle={toggleReminder}
            onDelete={deleteReminder}
          />
        )}

        {upcomingReminders.length > 0 && (
          <ReminderList
            title="Upcoming"
            reminders={upcomingReminders}
            onToggle={toggleReminder}
            onDelete={deleteReminder}
          />
        )}

        {reminders.length === 0 && <EmptyState />}
      </section>

      <button
        className="add-button"
        type="button"
        onClick={() => setIsModalOpen(true)}
        aria-label="Add reminder"
      >
        +
      </button>

      {isModalOpen && (
        <AddReminderModal
          onClose={() => setIsModalOpen(false)}
          onAdd={addReminder}
        />
      )}
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
