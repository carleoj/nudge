interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({ isDarkMode, onToggleDarkMode }: HeaderProps) {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">A gentle tap on the shoulder</p>
        <h1>Nudge</h1>
        <p className="subtitle">For the things you left unfinished.</p>
      </div>
      <div className="header-actions">
        <button
          className="theme-button"
          type="button"
          onClick={onToggleDarkMode}
          aria-pressed={isDarkMode}
          aria-label={
            isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
          }
        >
          {isDarkMode ? '☀' : '☾'}
        </button>
        <span className="header-mark" aria-hidden="true">
          ✦
        </span>
      </div>
    </header>
  );
}
