import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./componets/Form";
import Admin from "./componets/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
