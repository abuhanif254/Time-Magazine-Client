import { useEffect, useState } from 'react';

function formatNow() {
  const now = new Date();
  const date = now.toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const time = now.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return { date, time };
}

export default function Clock() {
  const [value, setValue] = useState(formatNow);

  useEffect(() => {
    const id = window.setInterval(() => setValue(formatNow()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-end text-right text-xs leading-tight text-white/80">
      <span className="font-semibold">{value.date}</span>
      <span className="font-mono">{value.time}</span>
    </div>
  );
}

