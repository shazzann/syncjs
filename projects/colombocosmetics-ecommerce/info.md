---
name: Ecommerce for a Beauty and Fragrance Retailer
client: Colombo Cosmetics
sector: retail
year: 2026
link: https://colombocosmetics.lk
stack: TanStack Start, React, TypeScript, Tailwind CSS, Supabase, Vercel, Cloudflare, Payments.lk, Meta Pixel & Conversions API, Google Analytics
featured: yes
---

An online store for Colombo Cosmetics, a Sri Lankan beauty and fragrance retailer and wholesaler based in Kattankudy and trading since 1999. Customers across all 25 districts shop perfumes, attars, skincare, makeup and haircare on their phones, while the team runs orders, stock, products and promotions from a role-based admin console.

## Problem
Colombo Cosmetics had 25 years of retail and wholesale experience but no way to sell directly to shoppers across the island. Orders and questions came through WhatsApp and phone calls, so every sale meant checking stock, shades, prices, delivery fees and payment by hand. There was no browsable catalogue, no live stock, no single place to track orders, and no way to show up in Google Shopping or run measurable ads.

## What we built
- A mobile-first storefront with categories, brands, search, filters, shade and size variants, reviews, ratings and a wishlist
- Value bundles of coordinated products, with their own stock tracking and free island-wide delivery when ordered alone
- Checkout with Cash on Delivery and Visa/Mastercard payments through Payments.lk, built around Sri Lankan districts, postal codes and phone numbers
- Delivery and payment rules built in: free shipping over LKR 10,000, a COD handling fee, and an advance bank deposit for large COD orders
- Atomic, variant-level stock control so items are never oversold, with unpaid card orders released automatically after the payment window
- Promo codes with usage limits, fixed or percentage discounts, public or private codes and bundle exclusions
- An admin console for orders, inventory, products, categories, bundles, banners, coupons and customers, with an insights dashboard covering revenue, payment mix, advance deposits, top products and low-stock alerts
- Separate admin and order manager roles, so staff can process orders without access to the rest of the store, plus an audit log of admin actions
- Customer accounts with order history, saved shipping details, password reset and account deletion, plus guest order tracking by order number and phone
- Order confirmation and status emails for customers and order alerts for the team
- Fast product photos served through a Cloudflare-backed CDN with long-lived caching
- SEO and marketing: dynamic sitemap, structured data and FAQ schema, a live Google Merchant Center product feed, GA4, and Meta Pixel with server-side Conversions API for accurate ad tracking
- A public, documented API (OpenAPI 3.1, llms.txt and Markdown responses) so search engines and AI assistants can read live products, prices, stock and store policies
- Security built in: Supabase Row Level Security, signed payment webhooks, rate limiting, idempotent order placement and strict security headers
