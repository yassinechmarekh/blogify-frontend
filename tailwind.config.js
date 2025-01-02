/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        "space-cadet": "#29294B", // titles
        iris: "#514DCC", // primary color
        "tropical-indigo": "#9895FF", // secondary color
        "dim-gray": "#696981", // parag
        background: "#f8f7ff",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#514DCC",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#9895FF",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#dbdaff",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#ffffff",
          foreground: "#514DCC",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      screens: {
        xs: "400px",
      },
      keyframes: {
        bounceX: {
          "0%, 100%": {
            transform: "translateX(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateX(25%)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        "bounce-x": "bounceX 1s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
