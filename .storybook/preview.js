import "../src/assets/css/tailwind.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  globalTypes: {
    apiKey: {
      value: "MY_KEY",
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
