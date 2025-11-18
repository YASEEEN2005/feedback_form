// pages/api/form.js
import connectDb from "../../Config/db";
import Form from "../../Model/formModel";

export default async function handler(req, res) {
  // Enable CORS for any frontend
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Preflight
  }

  await connectDb();

  if (req.method === "GET") {
    try {
      const data = await Form.find().sort({ createdAt: -1 });
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ message: "Server error" });
    }
  }

  if (req.method === "POST") {
    try {
      const { name, email, message, rating } = req.body;

      if (!name || !email || !message || rating == null) {
        return res.status(400).json({ message: "All fields required" });
      }

      const feedback = new Form({ name, email, message, rating });
      const result = await feedback.save();
      return res.status(200).json({ message: "Feedback submitted successfully!", data: result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server error" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
