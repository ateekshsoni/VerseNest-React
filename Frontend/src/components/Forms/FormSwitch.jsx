import React, { useState } from "react";

const FormSwitch = () => {
  const [role, setRole] = useState(null);

  const handleSelect = (selectedRole) => {
    setRole(selectedRole);
    animatePageTexture(`${selectedRole}-page`);
  };

  const animatePageTexture = (pageClass) => {
    const style = document.createElement("style");
    style.textContent = `
        .${pageClass}::before {
          animation: textureMove 2s ease-out forwards;
        }
  
        @keyframes textureMove {
          0% { background-position: 0% 0%; }
          50% { background-position: 2% 1%; }
          100% { background-position: 0% 0%; }
        }
      `;
    document.head.appendChild(style);
    setTimeout(() => {
      document.head.removeChild(style);
    }, 2000);
  };
  return (
    <>
      <div className="role-selector">
        {!role && (
          <>
            <button
              onClick={() => handleSelect("writer")}
              className="select-role-btn"
            >
              Writer
            </button>
            <button
              onClick={() => handleSelect("reader")}
              className="select-role-btn"
            >
              Reader
            </button>
          </>
        )}
        {role === "writer" && <WriterForm />}
        {role === "reader" && <ReaderForm />}
      </div>
    </>
  );
};

export default FormSwitch;
