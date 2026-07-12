import { useState } from "react";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState("");

  //Helper function for submitting form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //Validate Form data
  const validateForm = () => {
    let formErrors = {};

    if (!formData.name.trim()) {
      formErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      formErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      formErrors.password = "Password is required";
    }

    return formErrors;
  };

  //Handle Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Submitted Successfully: ", formData);
      alert("Registration Successful");

      //Reset Form
      setFormData({ name: "", email: "", password: "" });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <section>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          requried
        />
        {errors.name && <span>{errors.name}</span>}

        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          requried
        />
        {errors.email && <span>{errors.email}</span>}

        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          requried
        />
        {errors.password && <span>{errors.password}</span>}

        <button type="submit" style={{ cursor: "pointer" }}>
          Submit
        </button>
      </form>
    </section>
  );
}

export default RegistrationForm;
