import React, { useState } from "react";
import FormGroup from "../ui/FormGroup";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const LoginForm = ({ onSubmit, type = "reader" }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };
  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      onSubmit(formData);
    }
  };
  return (
    <>
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <FormGroup label="Enter your email" error={errors.email}>
            <Input
              type={"email"}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={"bg-white py-6"}
              autoComplete="email"
              placeholder="your@email.com"
              hasError={!!errors.email}
            />
          </FormGroup>
          <FormGroup label="Password" error={errors.password}>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              autoComplete="current-password"
              onChange={handleChange}
              className={"bg-white py-6"}
              placeholder="••••••••"
              hasError={!!errors.password}
            />
          </FormGroup>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>
          <Button type="submit" size="lg" className={"w-full bg-[#2c2417]"}>
            LogIn
          </Button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
