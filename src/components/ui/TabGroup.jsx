import React from "react";

const TabGroup = ({ tabs, activeTab, onChange, className = "" }) => {
  return (
    <>
      <div className={`border-b border-gray-200 ${className}`}>
        <nav className="-mb-px flex space-x-8 " aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                onChange(tab.id);
              }}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm    ${
                activeTab === tab.id
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default TabGroup;
