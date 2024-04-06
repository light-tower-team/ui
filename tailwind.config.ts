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
    fontFamily: {
      sans: ["Inter"],
    },
    fontSize: {
      sm: ["0.875rem", "1rem"],
    },
    extend: {
      width: {
        "100": "32rem",
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("enabled", "&:not([disabled], [aria-disabled='true'])");
      addVariant("active", ["&:active", "&[data-pressed='true']"]);
      addVariant("disabled", ["&[disabled]", "&[aria-disabled='true']"]);
      addVariant("invalid", ["&[aria-invalid='true']"]);
    }),
  ],
} satisfies Config;
