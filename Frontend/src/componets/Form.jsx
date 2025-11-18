import React, { useState } from "react";
import axios from "axios";

function Form() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    rating: 0
  });

  const [alert, setAlert] = useState(null);

  function inputValues(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }
  function handleRating(value) {
    setForm({
      ...form,
      rating: value
    });
  }

  async function formSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("https://feedbackformback.vercel.app/form", form);
      setForm({ name: "", email: "", message: "", rating: 0 });
      setAlert("Feedback submitted successfully!");
    } catch (error) {
      console.log(error);
      setAlert("Server error");
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-5">
      <form
        onSubmit={formSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-5"
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Feedback Form
        </h1>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={inputValues}
          placeholder="Your Name"
          className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={inputValues}
          placeholder="Your Email"
          className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <textarea
          name="message"
          value={form.message}
          onChange={inputValues}
          placeholder="Your Message"
          className="w-full border rounded-xl px-4 py-2 h-24 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              onClick={() => handleRating(star)}
              className={`w-8 h-8 cursor-pointer transition 
                ${
                  star <= form.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-300 text-gray-300"
                }`}
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 4.517 1.48-8.279L0 9.306l8.332-1.151z" />
            </svg>
          ))}
        </div>

        <p className="text-center text-sm text-gray-600">
          Rating: {form.rating} / 5
        </p>

        {alert && (
          <p className="text-center text-sm font-semibold text-green-600">
            {alert}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all"
        >
          Submit
        </button>
        <button
          type="reset"
          className="w-full bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition-all"
        >
          Reset
        </button>


      </form>
    </div>
  );
}

export default Form;
