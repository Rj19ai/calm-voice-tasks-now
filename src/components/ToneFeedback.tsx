
import { useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface ToneFeedbackProps {
  tone: 'calm' | 'neutral' | 'stressed';
  onClose: () => void;
}

export const ToneFeedback = ({ tone, onClose }: ToneFeedbackProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getToneStyles = () => {
    switch (tone) {
      case 'calm':
        return {
          bg: 'bg-mint-100 border-mint-300',
          text: 'text-mint-800',
          icon: '😌',
          message: 'You sound relaxed. Task set as low priority.',
        };
      case 'stressed':
        return {
          bg: 'bg-red-100 border-red-300',
          text: 'text-red-800',
          icon: '😰',
          message: 'You sound stressed. Task marked as high priority.',
        };
      default:
        return {
          bg: 'bg-beige-100 border-beige-300',
          text: 'text-beige-800',
          icon: '😐',
          message: 'Task added with medium priority.',
        };
    }
  };

  const styles = getToneStyles();

  return (
    <div className="fixed top-6 right-6 z-50 animate-fade-in-up">
      <Card className={`${styles.bg} border-2 ${styles.bg.split(' ')[1]} p-4 shadow-lg min-w-[300px]`}>
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{styles.icon}</span>
          <div>
            <p className={`font-medium ${styles.text}`}>Tone Detected</p>
            <p className={`text-sm ${styles.text} opacity-80`}>{styles.message}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
