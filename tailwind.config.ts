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
      backgroundImage: {
        check: `url('data:image/svg+xml,%3Csvg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0.75 4.76289L3.15312 7.24678L9.25 1.1499" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/%3E%3C/svg%3E%0A')`,
        stroke: `url('data:image/svg+xml,%3Csvg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M1.75 1H8.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/%3E%3C/svg%3E%0A')`,
      },
    },
  },
  plugins: [
    plugin(({ addVariant, addUtilities, matchUtilities, theme }) => {
      addVariant("enabled", "&:not([disabled], [aria-disabled='true'])");
      addVariant("active", ["&:active", "&[data-pressed='true']"]);
      addVariant("disabled", ["&[disabled]", "&[aria-disabled='true']"]);
      addVariant("invalid", ["&[aria-invalid='true']"]);

      addUtilities({
        ".mask-no-repeat": {
          "mask-repeat": "no-repeat",
        },
        ".mask-center": {
          "mask-position": "center center",
        },
      });

      matchUtilities(
        {
          "mask-image": (value) => ({
            maskImage: value,
          }),
        },
        { values: theme("backgroundImage") },
      );
    }),
  ],
} satisfies Config;
