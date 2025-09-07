import React, { useState } from "react";
import UserResultSubmit from "./user-result-submit";

const StateSubmitUser = () => {
  const [formData, setFormData] = useState({
    name: "", email: ""
  });
  const [isDisplayChildren, setIsDisplayChildren] = useState(false);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsDisplayChildren(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Name:</p>
          <input type="text" name="name" value={formData.name} placeholder="Nhập name..." onChange={handleChange} />
        </div>

        <div>
          <p>Email:</p>
          <input type="email" name="email" value={formData.email} placeholder="Nhập email..." onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>

      {isDisplayChildren && <UserResultSubmit formData={formData} />}
    </div>
  );
};

export default StateSubmitUser;
