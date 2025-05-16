import React, { useState } from "react";
import RoleSelector from "./RoleSelector";
import QuillIcon from "../ui/icons/QuillIcon";

const WriterForm = () => {
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
          icon={<QuillIcon />}
          tittle={"Writer"}
          description={"I write to express"}
          buttonText={"Join As Writer"}
          onSelect={handleRoleSelect}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default WriterForm;
