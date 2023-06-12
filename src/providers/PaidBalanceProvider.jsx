import React, { createContext, useState } from "react";

export const PaidBalanceContext = createContext([]);

const PaidBalanceProvider = ({ children }) => {
  const [fetchAll, setFetchAll] = useState({});

  return (
    <PaidBalanceContext.Provider value={[fetchAll, setFetchAll]}>
      {children}
    </PaidBalanceContext.Provider>
  );
};

export default PaidBalanceProvider;
