// api/cron.js

export default async function handler(req, res) {
  // Your script logic here
  console.log("Midnight cron job running...");

  // Example: Trigger some logic here
  // You could fetch data, send notifications, update database, etc.

  res.status(200).json({ message: "Cron job executed" });
}
