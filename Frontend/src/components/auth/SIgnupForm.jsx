import React, { useState } from "react";
import FormGroup from "../ui/FormGroup";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CheckboxGroup from "../ui/CheckboxGroup";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SIgnupForm = ({ onSubmit, type = "reader" }) => {
  const [formData, setFormData] = useState({
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
      moodPreferences: [],
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
      moodPreferences: "",
    }),
  });

  const genreOptions = [
    { value: "lyrical", label: "lyrical" },
    { value: "narative", label: "narative" },
    { value: "sonnet", label: "sonnet" },
    { value: "haiku", label: "haiku" },
    { value: "free-verse", label: "free verse" },
    { value: "other", label: "other" },
  ];
  const moodePref = [
    { value: "reflective", label: "Reflective" },
    { value: "uplifting", label: "Uplifting" },
    { value: "melancholic", label: "Melancholic" },
    { value: "romantic", label: "Romantic" },
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

      if (formData.genres.length === "") {
        newErrors.genres = "Please select at least one genre";
      }
    }

    if (type === "reader" && formData.preferredGenres.length === "") {
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
    alert("Form submitted successfully!");

    if (validate()) {
      onSubmit(formData);
    }else {
      alert("Please fix the errors in the form.");
      console.log("Form errors:", errors);
    }
  };
  return (
    <>
      <div className="w-full max-w-md my-5 py-2">
        <h3 className="mb-6 text-3xl font-bold playfair">
          {type == "reader" ? "Create Reader Account" : "Create Writer Account"}
        </h3>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <FormGroup label={"Full Name"} error={errors.name}>
            <Input
              type={"text"}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={"bg-white px-4"}
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
              className={"bg-white px-4"}
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
                className={"bg-white px-4"}
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
              className={"bg-white px-4"}
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
              className={"bg-white px-4"}
              placeholder="••••••••"
              hasError={!!errors.confirmPassword}
            />
          </FormGroup>
          <FormGroup
            label={type === "writer" ? "Writing Genres" : "Preferred Genres"}
            error={type === "writer" ? errors.genres : errors.preferredGenres}
          >
            <Select>
              <SelectTrigger className={"w-full bg-white px-4"}>
                <SelectValue placeholder="Select genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select your primary genre</SelectLabel>
                  {genreOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => {
                        const current =
                          type === "writer"
                            ? formData.genres
                            : formData.preferredGenres;
                        const alreadySelected = current.includes(option.value);
                        const updated = alreadySelected
                          ? current.filter((g) => g !== option.value)
                          : [...current, option.value];
                        handleGenreChange(updated);
                      }}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {type === "writer" && errors.genres && (
              <div className="text-red-500 text-xs mt-1">
                {errors.genres}
              </div>
            )}
            {type === "reader" && errors.preferredGenres && (
              <div className="text-red-500 text-xs mt-1">
                {errors.preferredGenres}
              </div>
            )}
          </FormGroup>
          {type === "writer" && (
            <FormGroup label="Bio" error={errors.bio}>
              <Textarea
                className={"bg-white px-4"}
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="A short biography"
                hasError={!!errors.bio}
              />
            </FormGroup>
          )}
          {type === "reader" && (
            <FormGroup label="Mood Preferences">
              <CheckboxGroup
                options={moodePref}
                selectedValues={formData.moodPreferences || []}
                onChange={(selected) => {
                  setFormData({
                    ...formData,
                    moodPreferences: selected,
                  });
                  if (errors.moodPreferences) {
                    setErrors({
                      ...errors,
                      moodPreferences: "",
                    });
                  }
                }}
                name="moodPreferences"
                orientation="horizontal"
                className="grid grid-cols-2 gap-4"
              />
              {errors.moodPreferences && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.moodPreferences}
                </div>
              )}
            </FormGroup>
          )}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={!!formData.agreeToTerms}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-700">
              I agree to the <a href="#" className="underline text-indigo-600">Terms and Conditions</a>
            </label>
          </div>
          {errors.agreeToTerms && (
            <div className="text-red-500 text-xs mt-1">{errors.agreeToTerms}</div>
          )}
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
