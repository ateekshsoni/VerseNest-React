import React, { useState } from "react";
import FormGroup from "../ui/FormGroup";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CheckboxGroup from "../ui/CheckboxGroup";

const SIgnupForm = ({ onSubmit, type = "reader" }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    ...(type === "writer" && {
      penName: "",
      bio: "",
      genres: [],
    }),
    ...(type === "reader" && {
      preferredGenres: [],
    }),
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    ...(type === "writer" && {
      penName: "",
      bio: "",
      genres: "",
    }),
    ...(type === "reader" && {
      preferredGenres: "",
    }),
  });

  const genreOptions = [
    { value: "fantasy", label: "Fantasy" },
    { value: "sci-fi", label: "Science Fiction" },
    { value: "mystery", label: "Mystery" },
    { value: "romance", label: "Romance" },
    { value: "thriller", label: "Thriller" },
    { value: "horror", label: "Horror" },
    { value: "historical", label: "Historical Fiction" },
    { value: "non-fiction", label: "Non-Fiction" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };
  const handleGenreChange = (selectedGenres) => {
    setFormData({
      ...formData,
      [type === "writer" ? "genres" : "preferredGenres"]: selectedGenres,
    });
    const errorField = type === "writer" ? "genres" : "preferredGenres";
    if (errors[errorField]) {
      setErrors({
        ...errors,
        [errorField]: "",
      });
    }
  };
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

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

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (type === "writer") {
      if (!formData.penName.trim()) {
        newErrors.penName = "Pen name is required";
      }

      if (!formData.bio.trim()) {
        newErrors.bio = "Biography is required";
      }

      if (formData.genres.length === 0) {
        newErrors.genres = "Please select at least one genre";
      }
    }

    if (type === "reader" && formData.preferredGenres.length === 0) {
      newErrors.preferredGenres = "Please select at least one genre";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
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
      <div className="w-full max-w-md ">
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <FormGroup label={"Full Name"} error={errors.name}>
            <Input
              type={"text"}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              hasError={!!errors.name}
            />
          </FormGroup>
          <FormGroup label="Email Address" error={errors.email}>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              hasError={!!errors.email}
            />
          </FormGroup>
          {type === "writer" && (
            <FormGroup label="Pen Name" error={errors.penName}>
              <Input
                type="text"
                id="penName"
                name="penName"
                value={formData.penName}
                onChange={handleChange}
                placeholder="Your pen name"
                hasError={!!errors.penName}
              />
            </FormGroup>
          )}

          <FormGroup label="Password" error={errors.password}>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              hasError={!!errors.password}
            />
          </FormGroup>

          <FormGroup label="Confirm Password" error={errors.confirmPassword}>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              hasError={!!errors.confirmPassword}
            />
          </FormGroup>
          {type === "writer" && (
            <FormGroup label="Bio" error={errors.bio}>
              <Input
                type="text"
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="A short biography"
                hasError={!!errors.bio}
              />
            </FormGroup>
          )}
          <FormGroup
            label={type === "writer" ? "Writing Genres" : "Preferred Genres"}
            error={type === "writer" ? errors.genres : errors.preferredGenres}
          >
            <CheckboxGroup
              options={genreOptions}
              selectedValues={
                type === "writer" ? formData.genres : formData.preferredGenres
              }
              onChange={handleGenreChange}
              name={type === "writer" ? "genres" : "preferredGenres"}
            />
          </FormGroup>
          <Button
            type="submit"
            size="lg"
            className={"w-full bg-[rgb(44,36,23)]"}
          >
            Create Account
          </Button>
        </form>
      </div>
    </>
  );
};

export default SIgnupForm;
