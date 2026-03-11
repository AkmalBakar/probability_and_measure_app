import React, { useState, useEffect, useCallback } from 'react';
import { ProgressProvider } from './context/ProgressContext';
import StatsBar from './components/StatsBar';
import MapScreen from './components/MapScreen';
import LevelScreen from './components/LevelScreen';
import ReviewScreen from './components/ReviewScreen';

function parseHash() {
  const hash = window.location.hash.slice(1) || '/';
  const parts = hash.split('/').filter(Boolean);

  if (parts[0] === 'level' && parts[1]) {
    return {
      screen: 'level',
      levelId: parseInt(parts[1]),
      tab: parts[2] || 'read',
    };
  }
  if (parts[0] === 'review') {
    return { screen: 'review' };
  }
  return { screen: 'map' };
}

export function navigate(hash) {
  window.location.hash = hash;
}

export default function App() {
  const [route, setRoute] = useState(parseHash);

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <ProgressProvider>
      <StatsBar />
      {route.screen === 'map' && <MapScreen />}
      {route.screen === 'level' && (
        <LevelScreen levelId={route.levelId} initialTab={route.tab} />
      )}
      {route.screen === 'review' && <ReviewScreen />}
    </ProgressProvider>
  );
}
