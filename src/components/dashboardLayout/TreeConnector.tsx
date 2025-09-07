/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useMemo } from 'react';

interface TreeConnectorProps {
  itemCount: number;
  itemHeight?: number;
  leftOffset?: number;
  color?: string;
}

const TreeConnector: React.FC<TreeConnectorProps> = ({
  itemCount,
  itemHeight = 40,
  leftOffset = 16,
  color = '#225A7F',
}) => {
  if (itemCount <= 0) return null;

  const totalHeight = itemCount * itemHeight;

  // Generate horizontal connectors (├ or └)
  const connectors = useMemo(() => {
    return Array.from({ length: itemCount }, (_, i) => {
      const isLast = i === itemCount - 1;
      const symbol = isLast ? '└' : '├';
      const y = (i + 0.5) * itemHeight;

      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: 0,
            top: y - 12,
            fontSize: 14,
            fontFamily: 'monospace',
            color: color,
            transform: 'translateY(-50%)',
          }}
        >
          {symbol}
        </div>
      );
    });
  }, [itemCount, itemHeight, color]);

  return (
    <svg
      width={leftOffset}
      height={totalHeight}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        pointerEvents: 'none',
      }}
    >
      {/* Vertical line */}
      <line
        x1={leftOffset}
        y1={0}
        x2={leftOffset}
        y2={totalHeight}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      {/* Horizontal connectors */}
      {connectors}
    </svg>
  );
};

export default TreeConnector;