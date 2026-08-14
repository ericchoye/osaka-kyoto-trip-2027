---
name: plan-international-trip
description: Guide a complete international travel workflow from intake to a shareable website. Use when the user says「幫我規劃旅遊行程」,「幫我規劃自由行」,「我要去某地玩」, names an overseas destination, or asks to revise, visualize, publish, or continue an existing trip plan. First collect destination, duration, flights, lodging or traveler count, must-eat restaurants, shops, sights, transport preference, and pace; then research and present an itinerary preview. Build a destination-styled website only after itinerary approval, add pre-departure tasks with Google Calendar links, test it locally, and publish to GitHub only after the user approves the local site and public sharing.
---

# Plan International Trip

Run the trip as four gated phases. Do not skip an approval gate. Ask only for information the user has not already supplied, preserve confirmed choices, and never restart a settled intake from the beginning.

## Phase 1: conduct the intake

Ask the following groups in order. Keep each message easy to answer. If the user answers several groups at once, record those answers and move to the next missing group.

### 1. Confirm destination, duration, and flights

Ask:

- Which country, city, or region will you visit?
- What are the exact travel dates, or how many days will the trip last?
- Have flights been purchased?
- If purchased, request the airline, outbound and return flight numbers, dates, departure and arrival airports, and the times shown on the e-ticket.

If only a flight number is supplied, retain it but label exact times as `依電子機票` until the dated booking is verified. Never invent a future schedule.

### 2. Confirm lodging and traveler count

Ask whether lodging is already booked or shortlisted.

- Confirm the number of adults and children once, even when lodging is already booked, because rooms, tickets, taxis, and fares may depend on it.
- If yes, request the exact property name and branch, stay dates, and any important room features.
- If no, ask the number of adults and children, room count, nightly or total budget, preferred room features, and whether changing hotels is acceptable. Recommend lodging only after receiving the traveler count.

Evaluate location, airport access, daily transit friction, luggage storage, staffed hours, noise, kitchen or laundry needs, cancellation terms, and total price before recommending a change.

### 3. Collect restaurants, shops, and sights

Ask for all fixed wishes, including:

- restaurants or food categories;
- shops, products, markets, or souvenirs;
- attractions, events, neighborhoods, and photo spots;
- day-specific wishes such as「第一晚吃這間」「晚上拍這個地標」;
- allergies, dietary needs, shopping priorities, queue tolerance, and must-do versus optional status.

Invite day-level examples: first-day restaurant, shopping stop, and attraction. If the user has no preferences, obtain permission to arrange them independently rather than leaving the fields blank.

### 4. Confirm transport and physical pace

Ask whether the trip should use:

- public transport;
- self-driving;
- taxis or ride-hailing;
- a flexible mixture of any practical method.

Also confirm walking tolerance, stairs or mobility limits, luggage size, early-start tolerance, and desired pace when these could change the route. For self-driving, verify license, parking, tolls, winter equipment, and one-way or cross-border restrictions before recommending it.

### Close the intake

Summarize confirmed facts and remaining assumptions in a compact checklist. Begin substantive planning only after the destination is known and the required intake is sufficiently complete, or after the user explicitly says to decide the missing preferences.

## Phase 2: research and present an itinerary preview

Read [research-qa.md](references/research-qa.md) before research and [output-blueprint.md](references/output-blueprint.md) before drafting.

Browse current primary sources for schedules, fares, closures, holidays, tickets, rules, inventory, and future-date uncertainty. Use native or local ranking sources for dining quality and official restaurant pages for hours, reservations, menus, and payment.

Build a preview that includes:

- recommended trip shape and a keep-or-change lodging verdict;
- geographically clustered daily plans with realistic buffers and intensity;
- point-to-point transport, walking duration, fare, payment, and disruption fallback;
- a primary and practical nearby backup for every important meal;
- shopping and attraction alternatives when queues, closures, or weather may interfere;
- pass-versus-single-fare arithmetic and the simplest payment strategy;
- a provisional booking and recheck timeline, without finalizing checklist dates or calendar events yet;
- clear labels for confirmed facts, current estimates, assumptions, and unannounced future schedules.

Mark the deliverable `行程預覽版`. Treat all booking and recheck dates as a draft at this phase. Do not design the website or create final calendar events yet. Ask the user to review the days, restaurants, shops, lodging, route effort, and budget. Iterate until the user explicitly says the itinerary is correct or authorizes website production.

## Phase 3: build and locally validate the website

Begin only after itinerary approval. Use an available website-building skill and create a mobile-first design whose colors, imagery, typography, motifs, and icons reflect the destination without reducing readability.

Include:

- flight and lodging summary without booking references or private identifiers;
- date tabs and daily timelines;
- icon-led filters for sights, food, transport, shopping, and lodging;
- one-tap map, official, booking, and menu links;
- transit, walking, fare, payment, reservation, warning, and fallback details at the point of use;
- meal backups and alternate plans, not only a separate generic list;
- search, responsive controls, visible focus states, and large touch targets;
- a persistent pre-departure checklist with exact booking and recheck dates;
- a visible data-check date and reminders to reconfirm future schedules.

### Add Google Calendar links

Give every time-sensitive pre-departure task and useful trip day a one-click Google Calendar template link. Use `https://calendar.google.com/calendar/render?action=TEMPLATE` with encoded title, dates, details, location, and timezone.

- Use the traveler’s home timezone for pre-departure reminders.
- Use the destination timezone for on-trip reservations, ticket collection, and day plans.
- Put the action, target travel date, reservation URL or phone, fallback, and caution in event details.
- Explain that each visitor adds a separate copy to their own Google account; the public site receives no calendar permission.
- Use direct connected-calendar writes only when the user explicitly requests them and the exact events have been confirmed.

Keep calendar links separate from checklist labels so clicking a calendar button does not accidentally toggle a task.

### Validate before publishing

Run the production build and relevant tests. Check the local site at mobile and desktop widths, long local-language names, destination links, map targets, calendar parameters, responsive navigation, accessibility, and the final checklist.

Show the local website to the user and ask for changes. Do not upload it merely because the itinerary was approved; publishing requires a second approval after the local website review.

## Phase 4: publish a view-only public website

Publish only after the user confirms the local website and explicitly approves the visibility level.

Before a public release:

- state that dates, flight numbers, lodging name, and itinerary become publicly discoverable on the internet;
- remove booking references, ticket barcodes, passport data, personal phone numbers, calendar tokens, and other secrets;
- use a public GitHub Pages repository only with informed consent;
- do not add companions as repository collaborators when they only need viewing access. They may view the Pages site but cannot modify the original repository without GitHub write permission.

Commit intentionally, publish the complete build without mixed old and new assets, verify the GitHub Pages deployment, and open the public URL. Keep the same URL for future updates when practical. Report the live link and any cache-refresh instruction.

## Operating rules

- Treat the latest explicit user instruction as authoritative and update the canonical plan instead of layering contradictory versions.
- Do not force a famous attraction, restaurant, transport pass, or hotel change when it conflicts with the traveler’s preferences.
- Prefer short taxi or rail connections over an exhausting walk when the user states a low walking tolerance.
- Never describe a restaurant, product, opening day, price, reservation slot, or future timetable as guaranteed without current evidence.
- Keep publication and calendar writes within the scope the user approved.
- End each phase with the next decision the traveler must make, not with a generic offer to help.
