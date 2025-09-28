import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom"; // REMOVE THIS IMPORT if you don't need it otherwise
import { Mic, MicOff, X } from "lucide-react";

// Fallback for cross-browser compatibility
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SILENCE_TIMEOUT = 5000; // 5 seconds in milliseconds

// Update component signature to accept onCancel
const Chat1on1 = ({ onVoiceTranscription, onCancel }) => {
  // const navigate = useNavigate(); // IF still imported, comment out or remove
  // State for controlling the UI and the recognition process
  const [isListening, setIsListening] = useState(false);
  const [isRecognizing, setIsRecognizing] = useState(false);

  // Refs to hold the recognition object and the silence timer
  const recognitionRef = useRef(null);
  const silenceTimerRef = useRef(null);

  // --- Voice Logic Functions ---

  const startSilenceTimer = () => {
    // 1. Clear any existing timer
    clearTimeout(silenceTimerRef.current);
    // 2. Set a new timer
    silenceTimerRef.current = setTimeout(() => {
      console.log("5 seconds of silence detected. Stopping recording.");
      recognitionRef.current?.stop();
    }, SILENCE_TIMEOUT);
  };

  const resetSilenceTimer = () => {
    // This is called when sound is actively detected
    startSilenceTimer();
  };

  // --- Initialization and Cleanup ---

  useEffect(() => {
    if (!SpeechRecognition) {
      console.error("Web Speech API not supported in this browser.");
      return;
    }

    // Initialize the recognition object only once
    const recognition = new SpeechRecognition();
    recognition.continuous = false; // Stop after one utterance
    recognition.interimResults = false; // Only get the final result
    // IMPORTANT: Use the appropriate language code for better results
    recognition.lang = "hi-IN"; // Set to a relevant language (e.g., Hindi/Indian English)

    recognition.onstart = () => {
      setIsRecognizing(true);
      console.log("Recognition started.");
      // Start the timer when recording officially begins
      startSilenceTimer();
    };

    recognition.onend = () => {
      setIsRecognizing(false);
      setIsListening(false);
      console.log("Recognition ended.");
      // Clear the timer when recording officially ends
      clearTimeout(silenceTimerRef.current);
    };

    // IMPORTANT: This event triggers on recognized speech activity
    recognition.onresult = (event) => {
      // Reset the timer on any recognized speech (though onend will fire shortly)
      resetSilenceTimer();

      const speechResult = event.results[0][0].transcript;
      console.log("Transcribed Text:", speechResult);

      // *** STEP 1: Send the transcribed text to the parent component ***
      if (onVoiceTranscription) {
        onVoiceTranscription(speechResult);
      } else {
        console.log("Transcribed text ready to send:", speechResult);
      }

      // Stop the recognition once a result is received (recognition.onend handles cleanup)
      // recognition.stop(); // onend handles this in many modern implementations after result
    };

    recognition.onsoundstart = () => {
      // IMPORTANT: Restart the timer when sound is detected
      resetSilenceTimer();
      console.log("Sound detected, timer reset.");
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      setIsRecognizing(false);
      setIsListening(false);
      clearTimeout(silenceTimerRef.current);
      // Call onCancel on error to close the overlay gracefully
      if (onCancel) onCancel();
    };

    recognitionRef.current = recognition;

    // Cleanup function
    return () => {
      clearTimeout(silenceTimerRef.current);
      if (recognitionRef.current) {
        recognitionRef.current.onend = null;
        recognitionRef.current.stop();
      }
    };
  }, [onVoiceTranscription, onCancel]); // Depend on onVoiceTranscription and onCancel

  // --- Button Handlers ---

  const handleMicToggle = () => {
    if (isListening) {
      // User clicks to stop listening
      recognitionRef.current?.stop();
    } else {
      // User clicks to start listening
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (error) {
        console.error("Error starting recognition:", error);
        setIsListening(false);
      }
    }
  };

  // NEW HANDLER LOGIC: Call the onCancel prop instead of internal navigation
  const handleCancel = () => {
    // User clicks 'X' button
    recognitionRef.current?.stop();
    clearTimeout(silenceTimerRef.current);
    setIsListening(false);
    setIsRecognizing(false);

    if (onCancel) {
      onCancel(); // Call the function passed by the parent to close the overlay
    }
  };

  // ... (rest of the component's render logic remains the same)
  // --- Render ---

  return (
    <div className="relative flex items-center justify-center h-screen w-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/background.png')" }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-70 z-10" />

      {/* Glowing Circle */}
      <motion.div
        initial={{ scale: 1 }}
        animate={isRecognizing ? { scale: [1, 1.1, 1] } : { scale: 1 }} // Only pulsate when speech is recognized
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute w-60 h-60 rounded-full z-20"
        style={{
          background:
            "radial-gradient(circle at center, rgba(124,58,237,0.9), rgba(34,211,238,0.8), rgba(34,197,94,0.7))",
          boxShadow: isRecognizing ? "0 0 40px rgba(34,211,238,0.8)" : "none",
        }}
      />

      {/* Buttons */}
      <div className="absolute bottom-10 flex gap-40 z-30">
        {/* Cancel Button (X) */}
        <button
          onClick={handleCancel}
          className="p-4 rounded-full bg-black bg-opacity-80 text-white shadow-lg border border-white border-opacity-30 hover:bg-red-600 transition-colors duration-200"
        >
          <X size={32} />
        </button>

        {/* Microphone Button */}
        <button
          onClick={handleMicToggle}
          className={`p-4 rounded-full bg-black bg-opacity-80 text-white shadow-lg border border-white transition-colors duration-200 ${
            isListening
              ? "border-sky-400"
              : "border-opacity-30 hover:bg-gray-700"
          }`}
        >
          {isListening ? (
            <motion.div
              animate={{ scale: [1, 0.9, 1] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            >
              <Mic size={32} />
            </motion.div>
          ) : (
            <Mic size={32} />
          )}
        </button>
      </div>

      {/* Optional Status Text */}
      <div className="absolute top-1/2 mt-48 z-30 text-white text-xl font-medium">
        {isRecognizing
          ? "Listening... Speak now."
          : isListening
          ? "Initializing microphone..."
          : "Tap the mic to begin voice chat."}
      </div>
    </div>
  );
};

export default Chat1on1;
