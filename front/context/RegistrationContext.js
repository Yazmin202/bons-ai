import React, { createContext, useState } from 'react';

export const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [formData, setFormData] = useState({});

  const updateForm = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <RegistrationContext.Provider value={{ formData, updateForm }}>
      {children}
    </RegistrationContext.Provider>
  );
};
