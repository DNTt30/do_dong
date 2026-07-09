'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDanger?: boolean;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Xác nhận',
  cancelLabel = 'Hủy',
  onConfirm,
  onCancel,
  isDanger = false,
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 overflow-hidden z-10"
          >
            {/* Close Button */}
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-full transition"
            >
              <X size={18} />
            </button>

            <div className="flex gap-4 items-start mt-2">
              {isDanger && (
                <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <AlertTriangle size={20} />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 leading-tight">
                  {title}
                </h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  {message}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end mt-8">
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-colors shadow-sm"
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                onClick={() => {
                  onConfirm();
                }}
                className={`px-5 py-2.5 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm ${
                  isDanger
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-black hover:bg-gray-800'
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
