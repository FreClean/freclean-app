# FreClean App

The React + Vite + TypeScript application for FreClean customers, staff, and
administrators. This repository is a client of the FreClean Core API; it does
not own the database, payment verification, authentication, authorization, or
business rules.

## Current scope

The checked-in UI currently provides the customer home, login, staff dashboard,
and admin dashboard routes. Other workflows require corresponding API and UI
implementations and are not represented as completed features here.

The login endpoint must return `{ accessToken, user: { id, roles } }`. The app
uses those server-issued roles only to control navigation. The Core API must
validate the token and enforce every permission on every request; client-side
route protection is not a security boundary.

Supported roles are `CUSTOMER`, `STAFF`, `MANAGER`, `ADMIN`, and `OWNER`.

## Configuration

Copy `.env.example` to `.env` and set `VITE_API_URL` to the Core API base URL.
Only public client configuration belongs in this file. Never put secrets,
private keys, credentials, or payment provider keys in Vite environment
variables.

## Quality gates

```bash
npm install
npm run lint
npm test
npm run build
```

`npm run build` produces the static site in `dist/`. Deployment must publish
that directory behind the approved FreClean hosting and API configuration; no
deployment target is configured in this repository.

## Architecture status

This checkout contains only `freclean-app`. The canonical backend/API,
marketing website, organization-level reusable workflows, shared API contract,
database migrations, payment verification, audit logging, and deployment
infrastructure must be implemented and reviewed in their designated
repositories before FreClean can be called production-ready.

## Getting started
```bash
npm install
cp .env.example .env
npm run dev
```
