'use client';

import { useState, useEffect } from 'react';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<'signup' | 'login'>('signup');

  const toggleMode = () => setMode(mode === 'signup' ? 'login' : 'signup');

  useEffect(() => {
    if (isOpen) setShow(true);
    else setTimeout(() => setShow(false), 200); // wait for animation
  }, [isOpen]);

  if (!isOpen && !show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-200 ${
          isOpen ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-xl p-8 max-w-md w-full shadow-lg transform transition-all duration-300 ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-center mb-4">
          {mode === 'signup' ? 'Create an Account' : 'Login to Trendies'}
        </h2>

        <form className="space-y-4">
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {mode === 'signup' && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          )}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition cursor-pointer"
          >
            {mode === 'signup' ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          {mode === 'signup'
            ? 'Already have an account?'
            : "Don't have an account?"}{' '}
          <button
            onClick={toggleMode}
            className="text-black font-medium hover:underline cursor-pointer"
          >
            {mode === 'signup' ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}
