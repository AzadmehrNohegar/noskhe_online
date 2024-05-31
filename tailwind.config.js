/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        icomoon: "icomoon, sans-serif",
      },
      minHeight: {
        86: "350px",
      },
      maxHeight: {
        "container-custom": "calc(100vh - 131px)",
        "container-custom-mobile": "calc(100vh - 213px)",
      },
      borderRadius: {
        "1.5lg": "0.625rem",
        "2.5xl": "1.25rem",
      },
      flexBasis: {
        modified2: "calc(50% - 0.5rem)",
        modified3: "calc(100% / 3 - 0.67rem)",
        modified4: "calc(25% - 0.75rem)",
      },
      backgroundImage: {
        discount: "url('/images/discount-tag.svg')",
      },
      maxWidth: {
        toast: "calc(100vw - 3.5rem)",
      },
      colors: {
        misc: {
          "light-bg": "#FCFAFD",
          "secondary-misc": "#137A92",
          "very-light": "#FBFBFB",
        },
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("@headlessui/tailwindcss")({ prefix: "ui" }),
  ],
  daisyui: {
    themes: ["cmyk"],
  },
};
