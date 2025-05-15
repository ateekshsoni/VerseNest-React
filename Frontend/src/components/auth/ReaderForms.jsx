import { useState } from "react";
import RoleSelector from "../RoleSelector";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import EyeIcon from "../ui/icons/EyeIcon";
import TabGroup from "../ui/TabGroup";
const ReaderForms = () => {
  const [showForms, setShowForms] = useState(false);
  const [activeTab, setActiveTab] = useState('signup');
  
  // Toggle to display the forms when the role is selected
  const handleRoleSelection = () => {
    setShowForms(true);
  };
  
  // Handle form submission
  const handleSubmit = (formData) => {
    console.log('Reader form submitted:', formData);
    // Here you would typically make an API call to authenticate or register the user
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1500);
    });
  };

  // Mood preference options for the reader signup form
  const moodOptions = [
    { value: 'reflective', label: 'Reflective' },
    { value: 'uplifting', label: 'Uplifting' },
    { value: 'melancholic', label: 'Melancholic' },
    { value: 'romantic', label: 'Romantic' }
  ];

  return (
    <>
      {/* Role selector (displayed when forms are not showing) */}
      {!showForms ? (
        <RoleSelector 
          icon={<EyeIcon />}
          title="Reader"
          description="I read to feel"
          buttonText="Join as Reader"
          onSelect={handleRoleSelection}
        />
      ) : (
        <div className="opacity-100 transform-none transition-all duration-500">
          {/* Tabs for switching between signup and login */}
          <TabGroup 
            tabs={[
              { id: 'signup', label: 'Sign Up' },
              { id: 'login', label: 'Log In' }
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          {/* Signup Form */}
          {activeTab === 'signup' && (
            <SignupForm 
              onSubmit={handleSubmit}
              role="reader"
              extraFields={[
                {
                  id: 'genre-focus',
                  label: 'Genre Focus',
                  type: 'select',
                  options: [
                    { value: '', label: 'Select your primary genre' },
                    { value: 'lyrical', label: 'Lyrical' },
                    { value: 'narrative', label: 'Narrative' },
                    { value: 'sonnet', label: 'Sonnet' },
                    { value: 'haiku', label: 'Haiku' },
                    { value: 'free-verse', label: 'Free Verse' },
                    { value: 'other', label: 'Other' }
                  ],
                  required: false
                },
                {
                  id: 'mood-preferences',
                  label: 'Mood Preferences (optional)',
                  type: 'checkboxGroup',
                  options: moodOptions,
                  required: false
                }
              ]}
            />
          )}

          {/* Login Form */}
          {activeTab === 'login' && (
            <LoginForm 
              onSubmit={handleSubmit}
              role="reader"
            />
          )}
        </div>
      )}
    </>
  );
};

export default ReaderForms;