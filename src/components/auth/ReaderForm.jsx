import React from "react";
import RoleSelector from "./RoleSelector";
import EyeIcon from "../ui/icons/EyeIcon";
import TabGroup from "../ui/TabGroup";
import SIgnupForm from "./SIgnupForm";
import LoginForm from "./LoginForm";

const ReaderForm = ({ showForm, setShowForm, activeTab, setActiveTab, onOpen }) => {
  const handleRoleSelect = () => {
    onOpen("signup");
  };
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onOpen(tab); // This will reset the writer form
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
            onChange={handleTabChange}
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
