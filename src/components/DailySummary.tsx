
import { X, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Task {
  id: string;
  text: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
  hasVoiceReminder: boolean;
  completed: boolean;
}

interface DailySummaryProps {
  tasks: Task[];
  onClose: () => void;
}

export const DailySummary = ({ tasks, onClose }: DailySummaryProps) => {
  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);
  const highPriorityTasks = pendingTasks.filter(task => task.priority === 'high');

  const getSummaryMessage = () => {
    const completedCount = completedTasks.length;
    const totalCount = tasks.length;
    
    if (completedCount === totalCount && totalCount > 0) {
      return "🎉 Fantastic! You've completed all your tasks today!";
    } else if (completedCount > totalCount / 2) {
      return "👏 Great progress! You're doing well today.";
    } else if (highPriorityTasks.length > 0) {
      return "⚡ You have some high-priority items that need attention.";
    } else {
      return "📝 Here's what's on your plate today.";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg bg-white p-6 animate-fade-in-up max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Daily Summary</h2>
            <p className="text-sm text-slate-500">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Summary Message */}
        <div className="mb-6 p-4 bg-gradient-to-r from-mint-50 to-lightblue-50 rounded-lg">
          <p className="text-slate-700 text-center">{getSummaryMessage()}</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-mint-600">{completedTasks.length}</div>
            <div className="text-xs text-slate-500">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-beige-600">{pendingTasks.length}</div>
            <div className="text-xs text-slate-500">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500">{highPriorityTasks.length}</div>
            <div className="text-xs text-slate-500">High Priority</div>
          </div>
        </div>

        {/* Task Breakdown */}
        <div className="space-y-4">
          {pendingTasks.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-2 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2 text-beige-500" />
                Still To Do
              </h3>
              <div className="space-y-2">
                {pendingTasks.slice(0, 3).map(task => (
                  <div key={task.id} className="flex items-center text-sm text-slate-600">
                    <div className={`w-2 h-2 rounded-full mr-3 ${
                      task.priority === 'high' ? 'bg-red-400' :
                      task.priority === 'medium' ? 'bg-beige-400' : 'bg-mint-400'
                    }`} />
                    {task.text}
                  </div>
                ))}
                {pendingTasks.length > 3 && (
                  <p className="text-xs text-slate-500 ml-5">
                    +{pendingTasks.length - 3} more tasks
                  </p>
                )}
              </div>
            </div>
          )}

          {completedTasks.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-2 flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-2 text-mint-500" />
                Completed Today
              </h3>
              <div className="space-y-2">
                {completedTasks.slice(0, 3).map(task => (
                  <div key={task.id} className="flex items-center text-sm text-slate-500 line-through">
                    <CheckCircle2 className="h-3 w-3 mr-3 text-mint-400" />
                    {task.text}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200">
          <Button 
            onClick={onClose} 
            className="w-full bg-mint-500 hover:bg-mint-600"
          >
            Continue Working
          </Button>
        </div>
      </Card>
    </div>
  );
};
