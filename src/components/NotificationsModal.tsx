import React from 'react';
import {
  Bell,
  CheckCircle,
  Clock,
  Sparkles,
  Trophy,
  X,
  CheckCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    triggerVoiceEncouragement,
    addNotification,
  } = useApp();

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <Trophy className="w-4 h-4 text-purple-600" />;
      case 'milestone':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'encouragement':
        return <Sparkles className="w-4 h-4 text-indigo-600" />;
      default:
        return <Clock className="w-4 h-4 text-amber-600" />;
    }
  };

  const handleSendReminder = () => {
    addNotification({
      title: 'Study Reminder Sprint',
      message: 'Take a quick 15-minute quiz or complete your next curriculum topic to maintain your daily streak!',
      type: 'reminder',
    });
    triggerVoiceEncouragement('Here is your friendly reminder: 15 minutes of deliberate practice keeps your career skills sharp!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-purple-100 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-purple-100 bg-purple-50/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">In-App Notifications</h3>
              <p className="text-xs text-slate-500">Study reminders & motivational updates</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="px-5 py-2.5 border-b border-slate-100 bg-white flex items-center justify-between text-xs">
          <button
            onClick={markAllNotificationsAsRead}
            className="text-purple-600 hover:text-purple-800 font-semibold flex items-center gap-1.5 transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark all read</span>
          </button>
          <button
            onClick={handleSendReminder}
            className="text-slate-600 hover:text-purple-700 font-medium transition-colors"
          >
            + Trigger Reminder
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              <Bell className="w-8 h-8 mx-auto mb-2 text-slate-300 stroke-1" />
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => markNotificationAsRead(item.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  item.read
                    ? 'bg-slate-50/60 border-slate-100 opacity-80'
                    : 'bg-purple-50/40 border-purple-100 shadow-2xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 rounded-lg bg-white border border-purple-100 shadow-2xs shrink-0">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-800 truncate">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg shadow-2xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
