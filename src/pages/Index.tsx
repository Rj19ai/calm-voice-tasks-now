
import { useState } from 'react';
import { VoiceInput } from '@/components/VoiceInput';
import { TaskCard } from '@/components/TaskCard';
import { Settings } from '@/components/Settings';
import { ToneFeedback } from '@/components/ToneFeedback';
import { DailySummary } from '@/components/DailySummary';
import { SmartSuggestions } from '@/components/SmartSuggestions';
import { Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Task {
  id: string;
  text: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
  hasVoiceReminder: boolean;
  completed: boolean;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      text: 'Call mom at 6 PM',
      priority: 'medium',
      dueDate: new Date(),
      hasVoiceReminder: true,
      completed: false,
    },
    {
      id: '2',
      text: 'Finish quarterly report',
      priority: 'high',
      hasVoiceReminder: false,
      completed: false,
    },
    {
      id: '3',
      text: 'Buy groceries for weekend',
      priority: 'low',
      hasVoiceReminder: true,
      completed: false,
    },
  ]);

  const [showSettings, setShowSettings] = useState(false);
  const [showToneFeedback, setShowToneFeedback] = useState(false);
  const [showDailySummary, setShowDailySummary] = useState(false);
  const [currentTone, setCurrentTone] = useState<'calm' | 'neutral' | 'stressed'>('neutral');

  const handleVoiceInput = (text: string, detectedTone: 'calm' | 'neutral' | 'stressed') => {
    console.log('Voice input received:', text, 'Tone:', detectedTone);
    setCurrentTone(detectedTone);
    setShowToneFeedback(true);
    
    // Auto-hide tone feedback after 3 seconds
    setTimeout(() => {
      setShowToneFeedback(false);
    }, 3000);

    // Create new task based on voice input
    const priority = detectedTone === 'stressed' ? 'high' : detectedTone === 'calm' ? 'low' : 'medium';
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      priority,
      hasVoiceReminder: true,
      completed: false,
    };

    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTaskComplete = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleVoiceReminder = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, hasVoiceReminder: !task.hasVoiceReminder } : task
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-mint-50 to-lightblue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-2xl font-light text-slate-800 mb-1">FORGOT_NO_MORE</h1>
            <p className="text-sm text-slate-500">Voice-first productivity</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(true)}
            className="text-slate-600 hover:text-slate-800 hover:bg-white/50"
          >
            <SettingsIcon className="h-5 w-5" />
          </Button>
        </header>

        {/* Main Voice Input */}
        <div className="flex flex-col items-center mb-16">
          <VoiceInput onVoiceInput={handleVoiceInput} />
          <p className="text-sm text-slate-500 mt-4 text-center max-w-md">
            Tap to speak or say "Hey ForgetNoMore" followed by your task
          </p>
        </div>

        {/* Task Cards */}
        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-medium text-slate-700 mb-6">Your Tasks</h2>
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">No tasks yet. Use your voice to add one!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={toggleTaskComplete}
                onToggleVoiceReminder={toggleVoiceReminder}
              />
            ))
          )}
        </div>

        {/* Daily Summary Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => setShowDailySummary(true)}
            variant="outline"
            className="text-slate-600 border-slate-200 hover:bg-white/50"
          >
            View Daily Summary
          </Button>
        </div>

        {/* Smart Suggestions */}
        <SmartSuggestions tasks={tasks} />

        {/* Overlays */}
        {showToneFeedback && (
          <ToneFeedback 
            tone={currentTone} 
            onClose={() => setShowToneFeedback(false)} 
          />
        )}

        {showSettings && (
          <Settings onClose={() => setShowSettings(false)} />
        )}

        {showDailySummary && (
          <DailySummary 
            tasks={tasks} 
            onClose={() => setShowDailySummary(false)} 
          />
        )}
      </div>
    </div>
  );
};

export default Index;
