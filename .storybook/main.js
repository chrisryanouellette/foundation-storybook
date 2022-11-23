const path = require("path");

const emailLoaders = {
  test: /\.email\.html$/,
  use: [
    {
      loader: "handlebars-loader",
      options: {
        rootRelative: path.resolve(__dirname, "../src") + "/",
      },
    },
    {
      loader: path.resolve(__dirname, "../loaders/inky-loader.js"),
    },
  ],
  include: path.resolve(__dirname, "../src"),
};

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  framework: "@storybook/html",
  /** Serve files from the assets folder */
  staticDirs: [path.resolve(__dirname, "../src/assets")],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    /** We add the handlebars and inky parser for any file ending .email.html */
    config.module.rules.push(emailLoaders);

    /** Replace the HTML loader test case to not process *.email.html files */
    const htmlIndex = config.module.rules.findIndex((item) =>
      item.use.includes("html-loader")
    );
    if (htmlIndex !== -1) {
      config.module.rules[htmlIndex].test = /[^\.email]\.html$/;
    }

    // Return the altered config
    return config;
  },
};
