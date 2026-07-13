import { useState } from "react";

function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({
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
          `${import.meta.env.VITE_API_URL}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          },
        );

        const data = await response.json();

        console.log(data.foundUser);

        if (response.ok) {
          onLogin(data.foundUser);
          alert("Login Successful");

          //Reset Form
          setFormData({ email: "", password: "" });
          setErrors({});
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong, please try again");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span>{errors.email}</span>}

        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <span>{errors.password}</span>}

        <button type="submit" style={{ cursor: "pointer" }}>
          Submit
        </button>
      </form>
    </section>
  );
}

export default LoginForm;
