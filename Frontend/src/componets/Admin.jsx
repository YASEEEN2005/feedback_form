import axios from "axios";
import React, { useEffect, useState } from "react";

function Admin() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get("https://feedback-form-sandy.vercel.app/api/form");
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  async function deleteData(id) {
    const ok = window.confirm("Are you sure you want to delete this feedback?");
    if (!ok) return;
    try {
      const res = await axios.delete(`https://feedback-form-sandy.vercel.app/api/form/${id}`);
      console.log(res.data);
      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Feedback List
      </h1>

      {data.length === 0 && (
        <p className="text-center text-gray-500 text-lg">No feedback found.</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow-lg rounded-xl p-6 border hover:shadow-xl transition duration-300"
          >
            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-800"><span className="font-semibold">Name :</span> {user.name}</p>
              <p className="text-gray-600 text-sm"><span className="font-semibold">Email :</span> {user.email}</p>
              <p className="text-gray-700"><span className="font-semibold">Message :</span> {user.message}</p>
              <p className="text-yellow-500 text-xl font-bold">
                <span className="text-gray-500 text-sm">
                  {" "}
                  Rating - ⭐{user.rating}
                </span>
              </p>
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Added: {formatDate(user.createdAt)}
            </div>

            <button
              className="bg-red-500 w-full text-white px-4 py-2 rounded-lg mt-4 font-semibold
                         hover:bg-red-600 transition duration-200 active:scale-95"
              onClick={() => deleteData(user._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
