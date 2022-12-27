import React, {
  FormEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useChannel } from "@storybook/api";
import { Events } from "../../../constants";
import { fetchInlinedHtml } from "../../../externals/fetch-inlined-html";
import { useAcidContext } from "../../../context/acid";
import { useStore } from "../../../hooks/store";
import { getAcidResult, TestResult } from "../../../externals/acid";

const Run = () => {
  const acid = useAcidContext();
  const clients = useStore(acid.store, (store) => store.clients);
  const tests = useStore(acid.store, (store) => store.tests);
  const subject = useRef<string>("");
  const selectedClients = useRef<Set<string>>(new Set());

  const [results, setResults] = useState<{ [id: string]: TestResult }>({});

  const handleResult = async (raw: string) => {
    const inlined = await fetchInlinedHtml(raw);
    acid.createAudit({
      subject: subject.current,
      clients: Array.from(selectedClients.current),
      html: inlined,
      image_blocking: true,
    });
  };

  const emit = useChannel({
    [Events.result]: handleResult,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const clients = new Set<string>();
    for (const pair of form.entries()) {
      if (pair[0] !== "subject") {
        clients.add(pair[0]);
      }
    }
    selectedClients.current = clients;
    subject.current = form.get("subject").valueOf().toString();
    emit(Events.run);
  };

  const handleGetResult = async (e: MouseEvent<HTMLButtonElement>) => {
    const result = await getAcidResult(e.currentTarget.getAttribute("data-id"));
    setResults(result);
  };

  useEffect(() => {
    acid.getClients();
    acid.getTests();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {Object.entries(clients).map(([id, client]) => (
          <div key={id}>
            <input id={id} name={id} type="checkbox" />
            <label htmlFor={id}>
              {[
                client.client,
                client.os,
                client.category,
                client.browser,
                client.rotate && `Rotated`,
              ]
                .filter(Boolean)
                .join(", ")}
            </label>
          </div>
        ))}
        <label htmlFor="subject">Subject</label>
        <input id="subject" name="subject" type="text" />
        <button type="submit">Run current story through acid</button>
      </form>
      <p>Tests</p>
      {Array.from(tests).map((test) => (
        <button key={test} data-id={test} onClick={handleGetResult}>
          {test}
        </button>
      ))}
      {Object.values(results).map((value) => (
        <div key={value.id} style={{ display: "flex", marginBottom: "12px" }}>
          <img
            style={{ width: "50px", height: "50px" }}
            src={value.thumbnail}
          />
          <p>
            {value.display_name}{" "}
            <a href={value.screenshots.default} target="_blank">
              Screenshot{" "}
            </a>
            status {value.status}
          </p>
        </div>
      ))}
    </div>
  );
};

export { Run };
