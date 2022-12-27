import { url } from "../constants";

const fetchInlinedHtml = async (html: string): Promise<string> => {
  const res = await fetch(url.origin + "/", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: html,
  });
  return res.text();
};

export { fetchInlinedHtml };
