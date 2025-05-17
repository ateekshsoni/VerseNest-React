import React, { useState } from "react";
import RoleSelector from "./RoleSelector";
import EyeIcon from "../ui/icons/EyeIcon";
import TabGroup from "../ui/TabGroup";
import SIgnupForm from "./SIgnupForm";
import LoginForm from "./LoginForm";

const ReaderForm = () => {
  const [showForm, setShowForm] = useState(false);
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
          icon={<EyeIcon />}
          tittle={"Reader"}
          description={"I read to feel"}
          buttonText={"Join As Reader"}
          onSelect={handleRoleSelect}
        />
      ) : (
        <div className="opacity-100 transform-none h-full transition-all duration-500">
          <TabGroup
            tabs={[
              { id: "signup", label: "Sign Up" },
              { id: "login", label: "Log In" },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
          {activeTab === "signup" && (
            <SIgnupForm onSubmit={handleSubmit} type="reader" />
          )}
          {activeTab === "login" && (
            <LoginForm onSubmit={handleSubmit} type="reader" />
          )}
        </div>
      )}
    </>
  );
};

export default ReaderForm;
