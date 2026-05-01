# Solaris Dance Google Calendar Setup

This site is built to connect to Google Calendar Appointment Schedules.

## 1. Create the appointment schedules

Create separate Google Calendar appointment schedules for each lesson type:

- `1 hr Private Lesson`, duration `1 hour`, payment amount `$10` if you want the booking flow to collect the deposit.
- `2 hr Private Lesson`, duration `2 hours`, payment amount `$10` if you want the booking flow to collect the deposit.
- `3 hr Private Lesson`, duration `3 hours`, payment amount `$10` if you want the booking flow to collect the deposit.
- `Choreography Cleaning Session`, duration `1 hour`, payment amount `$10` if you want the booking flow to collect the deposit.
- `Choreography`, duration based on how you want to schedule it. You can leave payment off and ask people to DM first, or set a small deposit if you want to hold the time.

If you want full prepayment instead, set the Google Calendar payment amount to the full price. For the hourly services on your pricing sheet, that would be `$20` for 1 hour, `$40` for 2 hours, or `$60` for 3 hours.

## 2. Connect Stripe for deposits or payments

In Google Calendar settings, connect Stripe under `General > Appointment schedules`.

Then edit each appointment schedule, open `Payments & cancellation policy`, turn on required payment, and set the amount.

## 3. Add the booking links to the website

In Google Calendar, copy the booking page link for each appointment schedule.

Then open `app.js` and paste the links here:

```js
const GOOGLE_APPOINTMENT_SCHEDULES = {
  private1hr: "https://calendar.google.com/calendar/appointments/schedules/YOUR_1_HOUR_PRIVATE_LESSON_LINK",
  private2hr: "https://calendar.google.com/calendar/appointments/schedules/YOUR_2_HOUR_PRIVATE_LESSON_LINK",
  private3hr: "https://calendar.google.com/calendar/appointments/schedules/YOUR_3_HOUR_PRIVATE_LESSON_LINK",
  choreography: "https://calendar.google.com/calendar/appointments/schedules/YOUR_CHOREOGRAPHY_LINK",
  cleaning1hr: "https://calendar.google.com/calendar/appointments/schedules/YOUR_CHOREOGRAPHY_CLEANING_SESSION_LINK",
};
```

Links that start with `https://calendar.app.google/` also work.

After that, the schedule area and the `Book & Pay Deposit` button will use the live Google booking and payment flow. Visitors will only be able to pick appointment times Google shows as available on your scheduled calendar.
