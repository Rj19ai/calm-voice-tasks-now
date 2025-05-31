
import { useState } from 'react';
import { Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoiceInputProps {
  onVoiceInput: (text: string, tone: 'calm' | 'neutral' | 'stressed') => void;
}

export const VoiceInput = ({ onVoiceInput }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [audioLevels, setAudioLevels] = useState([0.3, 0.5, 0.7, 0.5, 0.3]);

  const simulateVoiceInput = () => {
    setIsListening(true);
    
    // Simulate audio level changes
    const interval = setInterval(() => {
      setAudioLevels(prev => prev.map(() => Math.random() * 0.8 + 0.2));
    }, 150);

    // Simulate voice recognition after 2 seconds
    setTimeout(() => {
      clearInterval(interval);
      setIsListening(false);
      setAudioLevels([0.3, 0.5, 0.7, 0.5, 0.3]);
      
      // Simulate different types of voice input
      const examples = [
        { text: "Schedule meeting with Sarah tomorrow at 2 PM", tone: 'neutral' },
        { text: "URGENT: Submit the project proposal by end of day", tone: 'stressed' },
        { text: "Remember to water the plants this weekend", tone: 'calm' },
        { text: "Call the dentist to reschedule appointment", tone: 'neutral' },
      ];
      
      const randomExample = examples[Math.floor(Math.random() * examples.length)];
      onVoiceInput(randomExample.text, randomExample.tone as 'calm' | 'neutral' | 'stressed');
    }, 2500);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Voice Waveform Visualization */}
      {isListening && (
        <div className="flex items-center justify-center space-x-1 mb-4">
          {audioLevels.map((level, index) => (
            <div
              key={index}
              className="bg-mint-400 w-1 rounded-full animate-wave"
              style={{
                height: `${level * 40 + 10}px`,
                animationDelay: `${index * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Main Voice Input Button */}
      <Button
        onClick={simulateVoiceInput}
        disabled={isListening}
        className={`
          w-20 h-20 rounded-full transition-all duration-300 shadow-lg
          ${isListening 
            ? 'bg-red-400 hover:bg-red-500 animate-pulse-gentle' 
            : 'bg-mint-400 hover:bg-mint-500'
          }
        `}
      >
        <Mic className={`h-8 w-8 text-white ${isListening ? 'animate-pulse' : ''}`} />
      </Button>

      {/* Status Text */}
      <p className={`mt-3 text-sm font-medium transition-colors duration-300 ${
        isListening ? 'text-red-500' : 'text-slate-600'
      }`}>
        {isListening ? 'Listening...' : 'Tap to speak'}
      </p>
    </div>
  );
};
