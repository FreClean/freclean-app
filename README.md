# FreClean — App

The main FreClean application (customer, staff, and manager/admin/owner
experiences), built with React + Vite + TypeScript. Talks to the `freclean`
core API — it holds no business logic of its own.

## Roles
- **Customer** — home, services, book a service, products, cart, orders, bookings, payments, notifications, profile, support
- **Staff** — dashboard, assigned jobs, schedule, cash collection, payment recording, notifications
- **Manager/Admin/Owner** — bookings, orders, products, inventory, customers, staff, payments, cash reconciliation, entrepreneurship, support, reports, settings, audit

Route access is decided by the role on the verified JWT — the UI hides
what a role shouldn't see, but the **API is the real enforcement point**.

## Getting started
```bash
npm install
cp .env.example .env
npm run dev
```
