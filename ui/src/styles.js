// Style loader wrapper for Module Federation
// This imports the SCSS and makes it available as a JavaScript module
import "./assets/styles/main.scss";

// Export theme constants for programmatic access
export const theme = {
  primary: "#10b346",
  dangerColor: "#ff4d4f",
  textPrimary: "rgba(0, 0, 0, 0.88)",
  borderColor: "rgba(0, 0, 0, 0.06)",
  white: "#ffffff",
};

// Default export
export default {
  theme,
  loaded: true,
};
