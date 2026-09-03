# Development environment

Stack (mirrors the terminalgateway.net-style dashboard setup):

| Layer      | Choice                                              |
|------------|----------------------------------------------------|
| Backend    | Laravel 12 (PHP 8.2)                                |
| Frontend   | React 18 + TypeScript via Inertia.js               |
| Bundler    | Vite 7                                              |
| Styling    | Tailwind CSS 3                                      |
| Auth       | Laravel Breeze (login / register / dashboard / profile) |
| Database   | MySQL / MariaDB (XAMPP), schema `qr_code`           |

## Prerequisites

- XAMPP MySQL/MariaDB must be running (start it from the XAMPP Control Panel).
  DB config lives in `.env` (`DB_DATABASE=qr_code`, user `root`, no password).

## Run it

One command starts PHP server + queue worker + log tailer + Vite:

```bash
composer run dev
```

Then open http://127.0.0.1:8000

Run separately if you prefer:

```bash
php artisan serve      # http://127.0.0.1:8000
npm run dev            # Vite dev server / HMR
```

## Common tasks

```bash
php artisan migrate            # apply migrations
php artisan migrate:fresh --seed
npm run build                  # production asset build
php artisan test               # run tests
```

## Where things live

- `routes/web.php` – server routes (Inertia render calls)
- `resources/js/Pages/` – React page components
- `resources/js/Components/`, `resources/js/Layouts/` – shared UI
- `app/Http/Controllers/` – controllers
- `database/migrations/` – schema
