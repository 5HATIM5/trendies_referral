'use client';

import { useState } from 'react';
import AuthModal from '@/app/components/HomePage/AuthModal';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-3xl md:text-5xl font-semibold mb-2">
        Luxury reinvented. Exclusivity within your reach.
      </h1>
      <p className="text-lg md:text-2xl font-medium mb-6">
        Welcome to Trendies—Morocco&apos;s exclusive luxury marketplace.
      </p>
      <button
        className="mt-4 bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800"
        onClick={() => setModalOpen(true)}
      >
        Sign Up
      </button>

      <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
