import connectDb from "../../Config/db";
import Form from "../../Model/formModel";

export default async function handler(req, res) {
  await connectDb();

  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  try {
    const deleted = await Form.deleteOne({ _id: id });

    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    return res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
}
