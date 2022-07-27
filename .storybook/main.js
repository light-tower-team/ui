const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.module.s(a|c)ss$/,
      use: [
        { loader: "style-loader" },
        {
          loader: "css-loader",
          options: {
            modules: true,
            sourceMap: true,
          },
        },
        {
          loader: "sass-loader",
          options: {
            sourceMap: true,
            additionalData: `@import "./src/scss/storybook.scss";`,
          },
        },
      ],
      include: path.resolve(__dirname, "../"),
    });

    config.module.rules.push({
      test: /\.s(a|c)ss$/,
      exclude: /\.module.s(a|c)ss$/,
      use: [
        { loader: "style-loader" },
        {
          loader: "css-loader",
          options: {
            sourceMap: true,
          },
        },
        {
          loader: "sass-loader",
          options: {
            sourceMap: true,
            additionalData: `@import "./src/scss/storybook.scss";`,
          },
        },
      ],
      include: path.resolve(__dirname, "../"),
    });

    return config;
  },
};
