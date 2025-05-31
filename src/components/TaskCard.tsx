
import { Calendar, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface Task {
  id: string;
  text: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
  hasVoiceReminder: boolean;
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onToggleVoiceReminder: (id: string) => void;
}

export const TaskCard = ({ task, onToggleComplete, onToggleVoiceReminder }: TaskCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-400 bg-red-50/50';
      case 'medium': return 'border-l-beige-400 bg-beige-50/50';
      case 'low': return 'border-l-mint-400 bg-mint-50/50';
      default: return 'border-l-slate-300 bg-white';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className={`
      border-l-4 ${getPriorityColor(task.priority)} 
      p-4 transition-all duration-300 hover:shadow-md
      ${task.completed ? 'opacity-60' : ''}
      animate-fade-in-up
    `}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggleComplete(task.id)}
            className="mt-1"
          />
          
          <div className="flex-1">
            <p className={`text-slate-800 ${task.completed ? 'line-through' : ''}`}>
              {task.text}
            </p>
            
            {task.dueDate && (
              <div className="flex items-center mt-2 text-xs text-slate-500">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(task.dueDate)}
              </div>
            )}
            
            <div className="flex items-center mt-2">
              <span className={`
                inline-block px-2 py-1 rounded-full text-xs font-medium
                ${task.priority === 'high' ? 'bg-red-100 text-red-700' : ''}
                ${task.priority === 'medium' ? 'bg-beige-100 text-beige-700' : ''}
                ${task.priority === 'low' ? 'bg-mint-100 text-mint-700' : ''}
              `}>
                {task.priority} priority
              </span>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleVoiceReminder(task.id)}
          className={`
            ml-2 transition-colors duration-200
            ${task.hasVoiceReminder 
              ? 'text-mint-600 hover:text-mint-700 hover:bg-mint-50' 
              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }
          `}
        >
          {task.hasVoiceReminder ? (
            <Volume2 className="h-4 w-4" />
          ) : (
            <VolumeX className="h-4 w-4" />
          )}
        </Button>
      </div>
    </Card>
  );
};
