import { useState } from "react";

export default function AccessibilityPanel() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-20 right-4">
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-3 bg-indigo-600 text-white rounded-full shadow-md"
      >
        ♿
      </button>

      {/* Panel */}
      {open && (
        <div className="absolute bottom-14 right-0 w-64 p-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl space-y-2">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">
            Accessibility Controls
          </h2>
          <button className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded">
            Dark Contrast
          </button>
          <button className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded">
            Increase Text Size
          </button>
          <button className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded">
            Decrease Text Size
          </button>
          <button className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded">
            Highlight Links
          </button>
          <button className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded">
            Hide Images
          </button>
        </div>
      )}
    </div>
  );
}
