import React, { useEffect } from "react";
import { Setup } from "./pages/setup";
import { Main } from "./layouts";
import { Run } from "./pages/run";
import { useAcid } from "../hooks/acid";
import { useStore } from "../hooks/store";
import { AcidProvider } from "../context/acid";

const App = (): JSX.Element => {
  const acid = useAcid();
  const connected = useStore(acid.store, (store) => store.connected);

  useEffect(() => {
    acid.getHealth();
  }, []);

  return (
    <AcidProvider acid={acid}>
      <Main>{connected ? <Run /> : <Setup />}</Main>
    </AcidProvider>
  );
};

export { App };
