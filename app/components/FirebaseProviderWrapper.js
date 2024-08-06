"use client"; // This ensures the component is treated as a client component

import React from 'react';
import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig } from '@/app/firebase';

export default function FirebaseProviderWrapper({ children }) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      {children}
    </FirebaseAppProvider>
  );
}
