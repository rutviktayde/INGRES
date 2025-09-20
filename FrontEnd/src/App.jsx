import ChatWindow from "./components/ChatWindow";
import LanguageSwitcher from "./components/LanguageSwitcher";
import AccessibilityPanel from "./components/AccessibilityPanel";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  return (
    <div className="relative">
      {/* Top bar controls */}
      <div className="absolute top-4 right-4 flex gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>

      {/* Chat UI */}
      <ChatWindow />

      {/* Accessibility panel */}
      <AccessibilityPanel />
    </div>
  );
}
