# Nudge

Nudge is a small Windows desktop reminder app for getting back to the things you said you wanted to work on.

It is intentionally simple: add a reminder, choose a date, keep a little context nearby, and check it off when you return to it.

## Features

- Today, Upcoming, and Needs attention reminder groups.
- Date shortcuts for Today, Tomorrow, and Next week.
- Optional instructions or next-step notes.
- Optional reference links that open in the browser.
- Completion state with a calm, muted visual treatment.
- Confirmed deletion from each reminder card.
- Light and dark color modes.
- Local persistence through Electron IPC and a JSON file.
- Compact desktop window designed for a small companion-app feel.
- Launches automatically when Windows starts.
- Windows installer packaging through electron-builder.

## Technology

- Electron
- React 19
- TypeScript and TSX
- Vite through electron-vite
- CSS
- Electron IPC
- Local JSON persistence
- electron-builder and NSIS for Windows installers

## Requirements

- Windows for the packaged desktop application.
- Node.js 24 or newer.
- npm 10 or newer.

## Getting started

Clone the repository and install dependencies:

```bash
git clone <your-repository-url> nudge
cd nudge
npm install
```

Start the development application:

```bash
npm start
```

## Useful commands

```bash
npm start       # Start Electron with the Vite development server
npm run build   # Build main, preload, and renderer bundles
npm test        # Run the test suite
npm run package # Build a Windows installer
```

The standard `npm run package` command builds the application and creates a Windows NSIS installer in:

```text
release/build/Nudge-Setup-<version>.exe
```

Users can install Nudge by double-clicking that installer. The installer creates a normal Windows application installation and shortcut. Once installed, Nudge registers itself to launch when the user logs in to Windows.

## Project structure

```text
src/
├── main/
│   ├── main.ts       # Electron window, persistence IPC, startup behavior
│   ├── preload.ts    # Secure renderer/main bridge
│   └── util.ts
├── renderer/
│   ├── components/   # Header, lists, reminder cards, modal, empty state
│   ├── types/        # TypeScript domain types
│   ├── App.tsx       # Reminder state and screen composition
│   ├── App.css       # Visual design and light/dark themes
│   └── index.tsx
└── __tests__/        # Renderer and Electron-side tests
```

## Persistence

Reminders are saved through this flow:

```text
React renderer → preload bridge → Electron IPC → reminders.json
```

The JSON file is stored in Electron's per-user application data directory. On Windows, this is normally under:

```text
%APPDATA%/Nudge/reminders.json
```

The exact path is controlled by Electron's `app.getPath('userData')`.

## Changing the application icon

Replace the icon files in `assets/`:

```text
assets/icon.png   # Runtime window icon
assets/icon.ico   # Windows installer and shortcut icon
assets/icon.svg   # Editable vector source
```

After changing the icons, rebuild the installer. Existing installed shortcuts may continue showing a cached Windows icon until the old installation or shortcut is removed.

## Build configuration

Electron window and startup behavior are configured in:

```text
src/main/main.ts
```

Installer settings—including the Nudge product name, application ID, NSIS target, compression, and locale filtering—are in the `build` section of:

```text
package.json
```

The current Windows installer uses maximum compression and includes only the English Electron locale. Electron still bundles the Chromium runtime, so the installed application is larger than the Nudge source code itself.

## Design principles

Nudge is not intended to become a full task manager. The project deliberately avoids priorities, projects, tags, accounts, cloud synchronization, analytics, social features, and complex recurring schedules.

The goal is a small, personal reminder companion that can be understood in seconds.

## License

MIT
