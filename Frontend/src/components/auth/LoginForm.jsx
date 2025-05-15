import React, { useState } from 'react';
import FormGroup from '../ui/FormGroup';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Quote from '../ui/Quote';

const LoginForm = ({ onSubmit, type = 'reader' }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
    <div className="w-full max-w-md">
      <Quote 
        text={type === 'writer' 
          ? "The first draft is just you telling yourself the story." 
          : "Reading is an act of civilization."
        }
        author={type === 'writer' ? "Terry Pratchett" : "Gabrielle Zevin"}
      />
      
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <FormGroup
          label="Email Address"
          error={errors.email}
        >
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            hasError={!!errors.email}
          />
        </FormGroup>
        
        <FormGroup
          label="Password"
          error={errors.password}
        >
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
        
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div>
        
        <Button type="submit" variant="primary" size="lg" fullWidth>
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;