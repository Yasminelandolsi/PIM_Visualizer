'use client';
import React, { useEffect, useRef } from 'react';

interface DialogModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const DialogModal: React.FC<DialogModalProps> = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Modal container */}
      <div 
        ref={modalRef}
        className="
          fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          bg-white rounded-lg border border-gray-200 shadow-xl z-[100]
          p-4 w-11/12 md:w-4/5 lg:w-3/4 max-w-6xl max-h-[90vh] overflow-auto
        "
      >
        {/* Modal header */}
        {title && (
          <div className="flex justify-between items-center pb-2 mb-3 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">{title}</h2>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close dialog"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        )}
        
        {/* Modal content */}
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DialogModal;