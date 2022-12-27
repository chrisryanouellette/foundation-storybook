import { addons } from "@storybook/addons";
import { header, footer } from "../../src/wrappers.js";
import { Events } from "./constants";

const channel = addons.getChannel();

const createPreview = async (): Promise<void> => {
  const preview = document.querySelector("#root");
  const root = preview.cloneNode(true) as Element;
  const html = new DOMParser().parseFromString(header + footer, "text/html");
  const body = html.querySelector("body");

  Array.from(root.children).forEach((child) => body.appendChild(child));

  if (html.children[0] instanceof HTMLElement) {
    return channel.emit(Events.result, html.children[0].outerHTML);
  }

  return channel.emit(Events.error, "Oh NO");
};

channel.on(Events.run, createPreview);
