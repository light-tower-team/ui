import eslintPlugin from "@light-tower-team/eslint-plugin";

export default [
  ...eslintPlugin.configs.default,
  {
    rules: {
      "unicorn/filename-case": [
        "error",
        {
          case: "snakeCase",
          ignore: ["test-runner"],
        },
      ],
    },
  },
];
