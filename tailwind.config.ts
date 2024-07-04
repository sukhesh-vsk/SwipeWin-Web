import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'md': '960px',
      },
    },
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        'noto': ['NotoSansTC', 'sans-serif'],
      },
      colors: {
        primary: "#F4376D",
        secondary: "#8D99B2",
        sec_2: "#283040",
        sec_dim: "rgb(141, 153, 178, 0.6)",
        sec_dim_2: "rgb(141, 153, 178, 0.3)",
        bg: "#1C2031",
        accent: "#9A9A9A",
        text: "#F1F1F1",
        text_dim: "rgba(241, 241, 241, 0.3)",
        green_text: "rgba(78, 204, 76, 0.9)",
        red_text: "#CD3B3B",
        gradient: {
          1: "#741278",
          2: "#b337b8",
          3: "#670669",
          4: "#b337b8",
        },
        bg_dim: "rgba(28, 32, 49, 0.8)",
        'odd': 'rgba(28, 32, 49, 0.6)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "sgrad": "linear-gradient(228.27deg, #CF3577 2.64%, #64349E 100%)"
      },
    },
  },
  plugins: [],
};
export default config;
