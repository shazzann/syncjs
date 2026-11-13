---
name: Online ordering for a restaurant
client: Sambol (DartCodes assessment)
sector: food & beverage
year: 2026
link: https://sambol.shazion.com
stack: Next.js, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL (Supabase), Vercel, Cloudflare R2, PayHere
featured: yes
---

An online ordering store for Sambol, a Colombo street-food kitchen serving kottu, rice and curry, short eats and coolers. Customers order from their phones in a few taps, and staff run the menu, stock, orders and payments from an admin panel.

## Problem
Small restaurants in Sri Lanka often take orders over WhatsApp and phone calls. Each order means checking what is still available, repeating prices and delivery fees, and chasing payment, with no live menu, no stock count and no single record of orders. Sambol needed online ordering that still works the way local customers like to order, including through WhatsApp.

## What we built
- A bold, mobile-first menu with search, price sorting, a sticky category bar and dish pages that can be shared with link previews
- Checkout with online payment through PayHere (sandbox) or an order request through WhatsApp, with cash on delivery or bank transfer, built for Colombo delivery areas and Sri Lankan phone numbers
- Live stock by dish, with portions held for 15 minutes during online payment so nothing is oversold, even when many people order the last portion at once
- An admin panel for orders, payments, bank-transfer details, menu, categories, stock, photos and a revenue dashboard
- Order tracking with private links and confirmation emails for customers
- Fast dish photos through Cloudflare R2 and a CDN, with smaller copies for phones