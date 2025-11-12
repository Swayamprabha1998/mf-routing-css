import type { MemoryHistory } from "history";

// Helper function for cross-microfrontend navigation
export const navigateToMicrofrontend = (
  targetPath: string,
  type: "internal" | "cross",
  onHistoryChange?: (path: string) => void,
  currentHistory?: MemoryHistory
) => {
  console.log("Navigating from dashboard:", targetPath, "type:", type);
  if (type === "cross" && onHistoryChange) {
    // Cross-microfrontend navigation - use container's callback
    onHistoryChange(targetPath);
  } else if (type === "internal" && currentHistory) {
    // Internal navigation within same microfrontend
    currentHistory.push(targetPath);
  }
};
