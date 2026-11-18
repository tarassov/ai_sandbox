import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { CoreValue, PeerUser } from '../types/recognition';
import { RecognitionComposer } from './RecognitionComposer';

interface GiveBonutsModalProps {
  isOpen: boolean;
  peers: PeerUser[];
  monthlyAllowance: number;
  initialRecipientId?: string | null;
  initialAmount?: number;
  initialMessage?: string;
  initialCoreValue?: CoreValue;
  onClose: () => void;
  onSubmitRecognition: (payload: {
    recipientIds: string[];
    message: string;
    bonutsPerRecipient: number;
    coreValue: CoreValue;
  }) => void;
}

export const GiveBonutsModal: React.FC<GiveBonutsModalProps> = ({
  isOpen,
  peers,
  monthlyAllowance,
  initialRecipientId,
  initialAmount,
  initialMessage,
  initialCoreValue,
  onClose,
  onSubmitRecognition,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/35 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Give Bonuts"
    >
      <div className="surface-modal rounded-2xl max-w-xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close recognition composer"
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <RecognitionComposer
          peers={peers}
          monthlyAllowance={monthlyAllowance}
          initialRecipientId={initialRecipientId}
          initialAmount={initialAmount}
          initialMessage={initialMessage}
          initialCoreValue={initialCoreValue}
          compact
          onSubmitRecognition={(payload) => {
            onSubmitRecognition(payload);
            onClose();
          }}
        />
      </div>
    </div>
  );
};
