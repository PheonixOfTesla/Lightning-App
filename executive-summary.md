# Executive Summary: Lightning Pass

**Prepared:** June 26, 2026
**Company:** DIGITALAPPLE LLC
**Platform:** thelightningpass.com

---

## What is Lightning Pass?

**"Skip the line. Own the night."**

Lightning Pass is a mobile ticketing platform for nightlife and events. Users buy digital tickets on their phone, get a QR code, and scan to enter venues. Simple.

But the real business isn't selling tickets — it's converting venues into long-term infrastructure partners.

### How It Works

Events aren't the business. **They're the sales pitch.**

Lightning hosts events at venues for FREE — we bring the DJs, customers, and sponsors. When the venue sees a packed house with zero effort on their part, they adopt Lightning as their permanent ticketing system. That's when recurring 20% revenue kicks in forever.

### The Flywheel

```
1. Partner with someone who has reach (Craig Wallace = 70K followers)
                              ↓
2. Host promotional events at different venues
                              ↓
3. 100-200 people show up → venue sees a packed house
                              ↓
4. Those attendees become owned, opted-in contacts (name, phone, email)
                              ↓
5. Next morning, email them: "Here's a free pass to [Next Venue]"
                              ↓
6. Next venue gets packed at ZERO acquisition cost → becomes infrastructure partner
                              ↓
7. Repeat. Each event seeds the next venue. Each venue closes the next deal.
```

### Why This Works

Every ticket buyer becomes a **first-party contact** we can redeploy venue to venue. We proved 3,000 reach fills a Marriott in one week. We now have access to 85,000+ through partner networks. That's 28x the fuel.

---

## Company Overview

Lightning Pass operates in the Sarasota, Florida market with two revenue streams:
1. **Event Ticketing** — 80% venue / 20% Lightning Pass (building network effects)
2. **Jet Ski Rentals** — 100% retained revenue (owner-operated fleet)

---

## Revenue Streams

### 1. Event Ticketing Platform
- **Revenue Split:** 80% Venue / 20% Lightning Pass
- **Payment Processing:** Stripe (live mode)
- **Ticket Types:** General Admission, VIP, Cabana Packages, RSVP (free)

### 2. Black Flag Watersports (Jet Ski Rentals)
- **Revenue:** 100% retained (owner-operated)
- **Fleet:** 12 jet skis
- **Pricing:**
  - Regular: $130/hour
  - Member: $100/hour (23% discount)
- **Products:**
  - Hourly rentals (1-6 jet skis)
  - Sunset Jet Ski Tour: $275/hour (includes 1 jet ski)
- **Google Rating:** 5.0 stars (28 reviews)
- **Location:** Sarasota, FL

---

## Financial Performance

### Sunset Bash Event (July 4th, 2026)
| Metric | Amount |
|--------|--------|
| Gross Volume | $1,094.00 |
| Stripe Fees | -$51.83 |
| Refunds | -$101.00 |
| **Net Revenue** | **$941.17** |

### Ticket Sales - SOLD OUT
- **Status: SOLD OUT (100/100)**
- General Admission: 100 sold / 100 capacity
- Cabana VIP ($99, 6 guests): 2 sold (Emma McDaniel, Nicole Monschein)
- Team: 6 tickets (not counted toward capacity)
- Comp: 13 tickets
- Pricing: $10 advance / $15 current / $20 at door

### Black Flag Watersports - Jet Ski Income Projections
| Scenario | Monthly Revenue | Annual Revenue |
|----------|-----------------|----------------|
| 2 rentals/day @ $130 avg | $7,800 | $93,600 |
| 4 rentals/day @ $130 avg | $15,600 | $187,200 |
| 6 rentals/day @ $130 avg | $23,400 | $280,800 |
| Sunset Tours (2/week @ $275) | $2,200 | $26,400 |

**Net After Stripe Fees (~3%):**
- Conservative (2/day + tours): ~$9,700/mo → **$116,400/yr**
- Moderate (4/day + tours): ~$17,300/mo → **$207,600/yr**
- Aggressive (6/day + tours): ~$24,900/mo → **$298,800/yr**

*Note: 100% retained revenue (owner-operated, no venue split)*

---

## Venue Partnerships

### The Sarasota Modern (Marriott Hotel)
- **Address:** 1290 Blvd of the Arts, Sarasota, FL
- **Contact:** Ismael Gonzalez (F&B Director)
- **Phone:** +1 (813) 614-6488
- **Email:** Ismael@thesarasotamodern.com
- **Partnership Status:** Active - hosting Stars, Stripes & Sunsets event
- **Event Details:** Saturday, July 4th, 2026 (2:00 PM - 8:00 PM)
- **DJs:** Dre Hollis, DJ Jandro, Luke Lethal, Alina & Racquetclub

### Strategic Partners
- **Suncoast Social** - Partner API integration, cross-promotion
- **Sam Adams** - Beverage sponsor ($5 Summer Seasonal Draft)
- **Suncruiser** - Bucket specials + promotion
- **Carbliss** - Bucket specials + swag/gifts

### Craig Wallace Partnership (In Progress)
- **Reach:** 68K Facebook + 15K phone/email contacts
- **Platform:** Sarasota Florida Friendly People
- **Revenue Split:** 80% Craig / 20% Lightning Pass
- **Opportunity:** Building toward 100 social groups
- **Status:** Proposal sent, call completed

---

## User Base & Membership

### Account Types
| Role | Passcode | Access Level |
|------|----------|--------------|
| Admin | Admin123! | Full platform access |
| Venue | Venue123! | Venue management |
| DJ | DJ123! | DJ dashboard |
| Member | Member123! | Member pricing |

### Team Members (Core Staff)
1. Darius Parsia
2. Ben Jacobs
3. Ivy Thompson
4. Josh Lerner
5. John Cutuli
6. Alina Carbajalsalazar

### Target Demographics
- **Women's Social Groups (Sarasota):** ~10,000 total reach
- **Target Demo (20s-30s):** ~5,000 women
- **Key Groups:**
  - Sarasota Cool Girls (2,500 members)
  - The Social Circle Girls (2,300 members)
  - Suncoast Social (340 members)
  - SWAG (3,000 members)

---

## Technology Stack

### Platform Infrastructure
- **Frontend:** Vercel (lightning-app-peach.vercel.app)
- **Backend:** Railway (lightning-backend-production.up.railway.app)
- **Database:** MongoDB Atlas
- **Payments:** Stripe (live mode)
- **Email:** Resend (verified domain: admin.thelightningpass.com)
- **SMS:** Twilio (A2P Brand approved, campaign pending)
- **Phone:** +1 (928) 756-0061

### Payment Capabilities
- Apple Pay (domains verified)
- Google Pay
- Link (Stripe)
- Credit/Debit Cards
- Admin refund system
- Automatic Stripe sync

---

## Revenue Model Breakdown

### Event Ticketing (Platform Fee Model)
```
Customer pays $15 for ticket
├── Stripe fees: -$0.74 (2.9% + $0.30)
├── Venue receives: $11.41 (80% of net)
└── Lightning Pass: $2.85 (20% of net)
```

### Jet Ski Rentals (Owner-Operated)
```
Customer pays $130/hour (or $100 member)
├── Stripe fees: ~$4.07 (3.15%)
└── Owner receives: $125.93 (100% of net)
```

**Key Advantage:** Jet ski revenue is 100% retained (no venue split) while events build platform reach and venue relationships.

---

## Growth Strategy

### Phase 1: Market Validation (Current)
- Sunset Bash at Marriott proving concept
- Craig Wallace partnership for distribution
- Target: 5K+ women in Lightning ecosystem

### Phase 2: Venue Network
- Convert promotional events to venue infrastructure
- 5+ venues = equity stake opportunity
- 10+ venues = larger equity + profit sharing

### Phase 3: Scale
- Sarasota → Tampa → Florida-wide
- Membership model: $5/mo + $5 exclusive events
- Valuation projections:
  - 200 members: $96K-$192K
  - 500 members: $240K-$480K
  - 1,000 members: $480K-$960K

---

## Assets Summary

| Asset | Details |
|-------|---------|
| Jet Ski Fleet | 12 units |
| Google Rating | 5.0 stars (28 reviews) |
| Stripe Account | Live, verified bank |
| Domain | thelightningpass.com |
| Phone Number | +1 (928) 756-0061 |
| A2P Brand | Approved (DIGITALAPPLE LLC) |
| Marriott Partnership | Active (Sarasota Modern) |
| Distribution Partner | Craig Wallace (68K+ reach) |

---

## Key Contacts

| Name | Role | Contact |
|------|------|---------|
| Ismael Gonzalez | Marriott F&B Director | (813) 614-6488 |
| Craig Wallace | Distribution Partner | (978) 943-0920 |
| Ashlee Rulison | Marriott Contact | Email |

---

## The Bottom Line

Lightning Pass is live, processing real payments, and has proven the model works.

| Metric | Status |
|--------|--------|
| **Sunset Bash Revenue** | $941.17+ net (SOLD OUT - 100/100) |
| **Jet Ski Fleet** | 12 units ($116K-$299K annual potential) |
| **Google Rating** | 5.0 stars (28 reviews) |
| **Marriott Partnership** | Active (The Sarasota Modern) |
| **Distribution Reach** | 85,000+ via partner networks |
| **Platform** | Live, Apple Pay/Google Pay enabled |

**The proof:** We filled a Marriott hotel pool party in under one week using 3,000 reach. We now have access to 85,000+. The only variable left is distribution — and we just locked that in with Craig Wallace (70K followers).

Events are the demo. Infrastructure is the business. The flywheel is spinning.
