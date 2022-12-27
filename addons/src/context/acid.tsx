import React, { createContext, ReactNode, useContext } from "react";
import { UseAcid } from "../hooks/acid";

const AcidContext = createContext<UseAcid | null>(null);

type AcidProviderProps = {
  acid: UseAcid;
  children: ReactNode;
};

const AcidProvider = ({ acid, children }: AcidProviderProps): JSX.Element => {
  return <AcidContext.Provider value={acid}>{children}</AcidContext.Provider>;
};

const useAcidContext = (): UseAcid => {
  const acid = useContext(AcidContext);

  if (!acid) {
    throw new Error(
      '"useAcidContext" can only be used within a <AcidProvider>'
    );
  }

  return acid;
};

export { AcidProvider, useAcidContext };
