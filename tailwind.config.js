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
        "space-cadet": "#29294B",
        iris: "#514DCC",
        "tropical-indigo": "#9895FF",
        "dim-gray": "#696981",
        background: "#f8f7ff",
        foreground: "#514DCC",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "#f8f7ff",
          foreground: "#29294B",
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
          DEFAULT: "#dc2626",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "#514DCC",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "#eeeeff",
          foreground: "#29294B",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "#514DCC",
          "accent-foreground": "#ffffff",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
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
