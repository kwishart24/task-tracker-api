import { useState } from "react";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          },
        );

        const data = await response.json();

        if (response.ok) {
          alert("Registration Successful! Please login");

          //Reset Form
          setFormData({ name: "", email: "", password: "" });
          setErrors({});
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <section>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <label htmlFor="name" className="form-label">
            Name:{" "}
          </label>
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span>{errors.name}</span>}
        </div>

        <div className="my-4">
          <label htmlFor="email" className="form-label">
            Email:{" "}
          </label>
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span>{errors.email}</span>}
        </div>

        <div className="my-4">
          <label htmlFor="password" className="form-label">
            Password:{" "}
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <span>{errors.password}</span>}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ cursor: "pointer" }}
        >
          Register
        </button>
      </form>
    </section>
  );
}

export default RegistrationForm;
