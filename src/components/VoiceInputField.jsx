import { useState, useEffect } from 'react';

function VoiceInputField({ label, value, onChange, type = "text", placeholder, language = 'en-US', listeningText = 'Listening...' }) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.maxAlternatives = 1;

      setRecognition(recognitionInstance);
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.lang = language;
      setIsListening(true);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onChange({ target: { value: value ? value + ' ' + transcript : transcript } });
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser');
    }
  };

  return (
    <div className="voice-input-field">
      <label>{label}</label>
      <div className="input-wrapper">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={startListening}
          className={`mic-button ${isListening ? 'listening' : ''}`}
          disabled={isListening}
          title={listeningText}
        >
          {isListening ? `🎤 ${listeningText}` : '🎤'}
        </button>
      </div>
    </div>
  );
}

export default VoiceInputField;
