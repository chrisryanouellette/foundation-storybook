import { useCallback, useMemo } from "react";
import {
  AuditRequest,
  Client,
  createAcidAudit,
  getAcidHealth,
  getAcidTemplates,
  getAcidTests,
} from "../externals/acid";
import { ReadOnlyUseCreateStore, useCreateStore } from "./store";

type UseAcidState = {
  connected: boolean;
  clients: { [id: string]: Client };
  tests: Set<string>;
};

export type UseAcid = {
  store: ReadOnlyUseCreateStore<UseAcidState>;
  getHealth: () => Promise<void>;
  getClients: () => Promise<void>;
  getTests: () => Promise<void>;
  createAudit: (body: AuditRequest) => Promise<void>;
};

const useAcid = (): UseAcid => {
  const store = useCreateStore<UseAcidState>({
    connected: false,
    clients: {},
    tests: new Set(),
  });

  const getHealth = useCallback<UseAcid["getHealth"]>(async () => {
    try {
      await getAcidHealth();
      store.set({ connected: true });
    } catch (error) {
      store.set({ connected: false });
    }
  }, [store]);

  const getClients = useCallback<UseAcid["getClients"]>(async () => {
    const res = await getAcidTemplates();
    store.set({ clients: res.clients });
  }, [store]);

  const getTests = useCallback<UseAcid["getTests"]>(async () => {
    const res = await getAcidTests();
    const tests = store.get().tests;
    res.forEach(({ id }) => tests.add(id));
    store.set({ tests });
  }, [store]);

  const createAudit = useCallback<UseAcid["createAudit"]>(
    async (body) => {
      const res = await createAcidAudit(body);
      const tests = store.get().tests;
      store.set({ tests: new Set(tests.add(res.id)) });
    },
    [store]
  );

  return useMemo(
    () => ({ store, getHealth, getClients, getTests, createAudit }),
    [store, getHealth, getClients, getTests, createAudit]
  );
};

export { useAcid };
