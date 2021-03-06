import { useState } from 'react';

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  function transition(newMode, replace) {
    setMode(newMode);

    if (replace) {
      setHistory((prev) => {
        const prevCopy = [...prev];
        prevCopy.pop();
        return [...prevCopy, newMode];
      });
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  }
  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  }
  return { mode, transition, back };
}
