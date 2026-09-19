import React, { useEffect, useState } from 'react';

export default function AnimatedCounter({ value, prefix = '', suffix = '', duration = 1200 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const endValue = typeof value === 'number' ? value : parseFloat(value) || 0;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out quad formula for smooth decelerating animation
      const currentCount = Math.floor((1 - Math.pow(1 - progress, 3)) * endValue);
      setCount(currentCount);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
