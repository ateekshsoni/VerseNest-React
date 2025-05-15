import { useState } from "react";
import RoleSelector from "../RoleSelector";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import QuillIcon from "../ui/icons/QuillIcon";
import TabGroup from "../ui/TabGroup";

const WriterForms = () => {
  const [showForms, setShowForms] = useState(false);
  const [activeTab, setActiveTab] = useState('signup');
  
  // Toggle to display the forms when the role is selected
  const handleRoleSelection = () => {
    setShowForms(true);
  };
  
  // Handle form submission
  const handleSubmit = (formData) => {
    console.log('Writer form submitted:', formData);
    // Here you would typically make an API call to authenticate or register the user
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1500);
    });
  };

  return (
    <>
      {/* Role selector (displayed when forms are not showing) */}
      {!showForms ? (
        <RoleSelector 
          icon={<QuillIcon />}
          title="Writer"
          description="I write to express"
          buttonText="Join as Writer"
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
              role="writer"
              extraFields={[
                {
                  id: 'pen-name',
                  label: 'Pen Name (optional)',
                  type: 'text',
                  required: false
                },
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
                  id: 'writer-bio',
                  label: 'Short Bio',
                  type: 'textarea',
                  rows: 3,
                  required: false
                }
              ]}
            />
          )}

          {/* Login Form */}
          {activeTab === 'login' && (
            <LoginForm 
              onSubmit={handleSubmit}
              role="writer"
            />
          )}
        </div>
      )}
    </>
  );
};

export default WriterForms;