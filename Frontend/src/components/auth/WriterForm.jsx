import React, { useState } from "react";
import RoleSelector from "./RoleSelector";
import QuillIcon from "../ui/icons/QuillIcon";
import TabGroup from "../ui/TabGroup";
import SIgnupForm from "./SIgnupForm";
import LoginForm from "./LoginForm";
const WriterForm = () => {
  const [showForm, setShowForm] = useState(true);
  const [activeTab, setActiveTab] = useState("signup");

  const handleRoleSelect = () => {
    setShowForm(true);
  };
  const handleSubmit = (formData) => {
    console.log(formData);
  };
  return (
    <>
      {!showForm ? (
        <RoleSelector
          icon={<QuillIcon />}
          tittle={"Writer"}
          description={"I write to express"}
          buttonText={"Join As Writer"}
          onSelect={handleRoleSelect}
        />
      ) : (
        <div className="opacity-100 h-full transform-none transition-all duration-500">
          <TabGroup
            tabs={[
              { id: "signup", label: "Sign Up" },
              { id: "login", label: "Log In" },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          {activeTab === "signup" &&  (
            <SIgnupForm onSubmit={handleSubmit} type="writer" />
          )}
          {activeTab === "login" && (
            <LoginForm onSubmit={handleSubmit} type="writer" />
          )}
        </div>
      )}
    </>
  );
};

export default WriterForm;
