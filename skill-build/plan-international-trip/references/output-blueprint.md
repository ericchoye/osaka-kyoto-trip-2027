# Trip workflow and deliverable blueprint

Use only the sections required by the current phase. Never jump from intake directly to a published website.

## 1. Intake record

Track these fields:

| Group | Required record |
|---|---|
| Trip | Destination, dates or day count, home timezone |
| Flights | Purchased status, airline, dated flight details, airports, e-ticket times |
| Travelers | Adults, children, room count, pace and mobility |
| Lodging | Exact property or recommendation requirements, stay dates, key facilities |
| Wishes | Must-eat restaurants, shops, products, sights, events and day anchors |
| Transport | Public transport, self-drive, taxis, mixed method and walking tolerance |

Summarize `confirmed`, `assistant may arrange`, and `still missing`. Do not repeatedly ask answered questions.

## 2. Itinerary preview

Lead with:

- recommended number of bases and full sightseeing days;
- lodging verdict;
- transport and payment strategy;
- hard-to-book priorities.

Then provide a daily overview:

| Date | Base and theme | Geographic cluster | Fixed item | Meal | Backup | Intensity |
|---|---|---|---|---|---|---|

For every material leg include the origin, destination, operator or driving route, transfer, walking, duration range, fare, payment, buffer, warning, and fallback. Keep arrival and departure days light.

For each important meal include selection reason, local ranking source and check date, assigned time, signature order, price, payment, reservation or queue rule, and nearby backup.

Finish with:

- ticket and pass comparison;
- specialty shopping and origin verification;
- provisional booking and recheck timeline;
- assumptions and future-schedule caveats;
- explicit request for itinerary revisions.

Label this phase `行程預覽版`. Do not finalize the checklist or calendar links, and do not include a finished website unless the user has approved the itinerary.

## 3. Website handoff

After itinerary approval, finalize the pre-departure dates and organize the mobile website in this order:

1. flight and lodging summary;
2. date tabs and daily timeline;
3. icon filters and search;
4. daily point-to-point routes and map links;
5. food cards with in-context backups;
6. transport payment and pass comparison;
7. shopping, products, and source links;
8. pre-departure checklist;
9. Google Calendar buttons;
10. freshness notice and recheck dates.

Match the destination visually, but prioritize legibility, accessibility, and quick use while walking.

## 4. Calendar event specification

For each actionable event record:

| Field | Rule |
|---|---|
| Title | Start with the action, such as `預約｜` or `複查｜` |
| Dates | Exact start and end; use all-day only when no meaningful time exists |
| Timezone | Home timezone before departure; destination timezone during the trip |
| Details | Target travel date, action, official link or phone, backup, lateness or stock warning |
| Location | Exact venue for on-trip events; omit when not useful |

Use Google Calendar template links for a public static site. Each visitor adds an independent copy; no OAuth or shared calendar access is required.

## 5. Publication handoff

After local website approval:

- restate the chosen visibility;
- remove private booking data and tokens;
- build and test the production output;
- publish the source and complete generated assets together;
- verify the deployed commit and public URL;
- state that viewers cannot modify the original GitHub repository without collaborator permission.
