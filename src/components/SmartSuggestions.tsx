
import { useState, useEffect } from 'react';
import { Lightbulb, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Task {
  id: string;
  text: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
  hasVoiceReminder: boolean;
  completed: boolean;
}

interface SmartSuggestionsProps {
  tasks: Task[];
}

interface Suggestion {
  id: string;
  message: string;
  type: 'schedule' | 'priority' | 'break' | 'reminder';
}

export const SmartSuggestions = ({ tasks }: SmartSuggestionsProps) => {
  const [currentSuggestion, setCurrentSuggestion] = useState<Suggestion | null>(null);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const generateSuggestions = (): Suggestion[] => {
    const suggestions: Suggestion[] = [];
    const pendingTasks = tasks.filter(task => !task.completed);
    const highPriorityTasks = pendingTasks.filter(task => task.priority === 'high');
    const completedToday = tasks.filter(task => task.completed).length;

    // Stress-based suggestions
    if (highPriorityTasks.length >= 3) {
      suggestions.push({
        id: 'stress-relief',
        message: 'You seem to have many urgent tasks. Would you like me to suggest rescheduling some to tomorrow?',
        type: 'priority'
      });
    }

    // Break suggestions
    if (completedToday >= 3) {
      suggestions.push({
        id: 'break-time',
        message: 'Great progress today! How about taking a 10-minute break?',
        type: 'break'
      });
    }

    // Scheduling suggestions
    if (pendingTasks.length > 0 && !pendingTasks.some(task => task.dueDate)) {
      suggestions.push({
        id: 'schedule-tasks',
        message: 'Some tasks don\'t have due dates. Would you like me to help you schedule them?',
        type: 'schedule'
      });
    }

    // Reminder suggestions
    const tasksWithoutReminders = pendingTasks.filter(task => !task.hasVoiceReminder);
    if (tasksWithoutReminders.length > 0) {
      suggestions.push({
        id: 'enable-reminders',
        message: 'Enable voice reminders for your tasks so you don\'t forget them?',
        type: 'reminder'
      });
    }

    return suggestions.filter(s => !dismissed.has(s.id));
  };

  useEffect(() => {
    const suggestions = generateSuggestions();
    if (suggestions.length > 0 && !currentSuggestion) {
      // Show a random suggestion
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      setCurrentSuggestion(randomSuggestion);
      
      // Auto-hide after 8 seconds
      const timer = setTimeout(() => {
        setCurrentSuggestion(null);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [tasks, dismissed, currentSuggestion]);

  const handleDismiss = (suggestionId: string) => {
    setDismissed(prev => new Set([...prev, suggestionId]));
    setCurrentSuggestion(null);
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'break': return '☕';
      case 'priority': return '⚡';
      case 'schedule': return '📅';
      case 'reminder': return '🔔';
      default: return '💡';
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'break': return 'bg-mint-50 border-mint-200';
      case 'priority': return 'bg-red-50 border-red-200';
      case 'schedule': return 'bg-lightblue-50 border-lightblue-200';
      case 'reminder': return 'bg-beige-50 border-beige-200';
      default: return 'bg-slate-50 border-slate-200';
    }
  };

  if (!currentSuggestion) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 animate-fade-in-up">
      <Card className={`
        ${getSuggestionColor(currentSuggestion.type)} 
        border-2 p-4 shadow-lg max-w-sm
      `}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <span className="text-xl">{getSuggestionIcon(currentSuggestion.type)}</span>
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <Lightbulb className="h-4 w-4 text-slate-600 mr-1" />
                <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                  Smart Suggestion
                </span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {currentSuggestion.message}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDismiss(currentSuggestion.id)}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
