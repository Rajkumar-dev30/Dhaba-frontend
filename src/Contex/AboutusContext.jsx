import React, { createContext, useState } from "react";

export const Data = createContext();

const AboutusContext = ({ children }) => {
  const [form, setForm] = useState({
    aboutus: "",
  });

  // Update Request
  const [updateform, setUpdateform] = useState({
    aboutus: "",
  });

  const toggleupdate = (item) => {
    setUpdateform({
      aboutus: item.aboutus,
    });
  };
  return (
    <>
      <Data.Provider
        value={{
          form,
          setForm,
          updateform,
          setUpdateform,
          toggleupdate,
        }}
      >
        {children}
      </Data.Provider>
    </>
  );
};

export default AboutusContext;
