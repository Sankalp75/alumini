import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" }, screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        brand: { DEFAULT: "#1B3A5C", hover: "#14304E", muted: "#E8EDF3" },
        brass: { DEFAULT: "#C9A86A", hover: "#B8975A", muted: "#FDF6E3" },
        teal: { DEFAULT: "#2E7D6F", hover: "#256A5E", muted: "#E6F2EF" },
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
      fontFamily: { heading: ["var(--font-fraunces)", "serif"], body: ["var(--font-inter)", "sans-serif"] },
      boxShadow: {
        sm: "0 1px 2px rgba(26,35,50,0.05)",
        DEFAULT: "0 1px 3px rgba(26,35,50,0.07), 0 1px 2px rgba(26,35,50,0.06)",
        md: "0 4px 6px rgba(26,35,50,0.07), 0 2px 4px rgba(26,35,50,0.06)",
        lg: "0 10px 15px rgba(26,35,50,0.08), 0 4px 6px rgba(26,35,50,0.06)",
        xl: "0 20px 25px rgba(26,35,50,0.10), 0 10px 10px rgba(26,35,50,0.04)",
        "2xl": "0 25px 50px rgba(26,35,50,0.15)",
        brand: "0 4px 14px rgba(27,58,92,0.32), 0 2px 6px rgba(27,58,92,0.20)",
        "brand-hover": "0 8px 20px rgba(27,58,92,0.38), 0 4px 10px rgba(27,58,92,0.24)",
      },
      keyframes: {
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "slide-up": { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "shake": { "0%,100%": { transform: "translateX(0)" }, "20%,60%": { transform: "translateX(-4px)" }, "40%,80%": { transform: "translateX(4px)" } },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
        "slide-up": "slide-up 0.45s cubic-bezier(0.16,1,0.3,1)",
        "shake": "shake 0.4s ease-in-out",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
