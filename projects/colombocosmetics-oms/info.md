---
name: Order management app for a cosmetics seller
client: Colombo Cosmetics
sector: retail
year: 2026
link:
stack: react, typescript, tailwind css, node.js, express, prisma, postgres
featured: yes
---

A mobile-first, installable web app (PWA) that Colombo Cosmetics' admins and staff use to take orders, work out shipping and profit, send receipts and delivery labels, and track every order through to delivery or return.

## What we built
- Order creation flow: customer details, product picker with quantities, shipping method (PO, COD, speed post) and notes, with draft orders saved part-way through
- Automatic shipping by weight, COD commission, and per-order cost, selling price and net profit
- Order lifecycle tracking (pending, dispatched, delivered, returned, cancelled), filtered by status, with an audit log of status changes and deletions
- Receipts and printable delivery labels generated as images/PDFs on the phone, plus one-tap WhatsApp sharing to the customer
- Product catalogue with cost and default selling prices
- Dashboard with totals for orders, sales, profit and pending work, and sales reports by date range with CSV export
- Admin and staff roles: admins see financials and reports and can override any status; staff handle day-to-day orders
