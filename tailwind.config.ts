import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    borderWidth: {
      DEFAULT: "1px",
      "0": "0",
      "1": "1px",
      "2": "2px",
      "3": "3px",
      "4": "4px",
    },
    extend: {},
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("enabled", "&:not([disabled], [aria-disabled='true'])");
      addVariant("active", ["&:active", "&[data-pressed='true']"]);
      addVariant("disabled", ["&[disabled]", "&[aria-disabled='true']"]);
    }),
  ],
} satisfies Config;
