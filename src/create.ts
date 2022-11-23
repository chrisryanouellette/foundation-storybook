/** Inject some HTML into a element for Storybook */
const create = (html: string, element = "main"): Element => {
  const main = document.createElement(element);
  main.insertAdjacentHTML("beforeend", html);

  return main;
};

export { create };
