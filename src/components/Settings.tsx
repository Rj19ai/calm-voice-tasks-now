
import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SettingsProps {
  onClose: () => void;
}

export const Settings = ({ onClose }: SettingsProps) => {
  const [wakeWordEnabled, setWakeWordEnabled] = useState(true);
  const [voiceStyle, setVoiceStyle] = useState('friendly');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white p-6 animate-fade-in-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-slate-800">Settings</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Wake Word Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-slate-700">Wake Word</label>
              <p className="text-xs text-slate-500">"Hey ForgetNoMore"</p>
            </div>
            <Switch
              checked={wakeWordEnabled}
              onCheckedChange={setWakeWordEnabled}
            />
          </div>

          {/* Voice Reminder Style */}
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">
              Voice Reminder Style
            </label>
            <Select value={voiceStyle} onValueChange={setVoiceStyle}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-slate-700">Dark Theme</label>
              <p className="text-xs text-slate-500">Switch to dark mode</p>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>

          {/* Notification Settings */}
          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-sm font-medium text-slate-700 mb-3">Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Sound notifications</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Desktop notifications</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-200">
          <Button onClick={onClose} className="w-full bg-mint-500 hover:bg-mint-600">
            Save Settings
          </Button>
        </div>
      </Card>
    </div>
  );
};
