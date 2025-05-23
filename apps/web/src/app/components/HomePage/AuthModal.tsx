'use client';

import { useState, useEffect } from 'react';
import AuthForm from '@/app/components/HomePage/AuthForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<'signup' | 'login'>('signup');

  useEffect(() => {
    if (isOpen) setShow(true);
    else setTimeout(() => setShow(false), 200);
  }, [isOpen]);

  if (!isOpen && !show) return null;

  const toggleMode = () => setMode(prev => (prev === 'signup' ? 'login' : 'signup'));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      />

      <div
        className="relative bg-white rounded-xl p-8 max-w-md w-full shadow-lg transition-all"
      >
        <button className="absolute top-3 right-3" onClick={onClose}>
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-center mb-4">
          {mode === 'signup' ? 'Create an Account' : 'Login to Trendies'}
        </h2>

        <AuthForm mode={mode} />

        <p className="text-sm text-center text-gray-600 mt-4">
          {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
          <button onClick={toggleMode} className="text-black font-medium ml-1 underline cursor-pointer">
            {mode === 'signup' ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}
