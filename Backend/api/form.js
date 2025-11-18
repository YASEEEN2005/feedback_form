import connectDb from "../../Config/db";
import Form from "../../Model/formModel";

export default async function handler(req, res) {
  await connectDb();

  if (req.method === "GET") {
    const data = await Form.find().sort({ createdAt: -1 });
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    try {
      const { name, email, message, rating } = req.body;

      if (!name || !email || !message || !rating) {
        return res.status(400).json({ message: "All fields required" });
      }

      const feedback = new Form({ name, email, message, rating });
      const result = await feedback.save();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: "Server error" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}