import React from 'react';

interface AOLogoProps {
  className?: string;
  size?: number;
  variant?: 'outline' | 'filled' | 'glow';
  showText?: boolean;
}

export const QuantixLogo: React.FC<AOLogoProps> = ({
  className = "w-6 h-6",
  size = 28,
  variant = 'outline',
  showText = false,
}) => {
  // Center is (50, 50), radius of outer ring centers is 24, circle radius is 10
  const centerRadius = 10;
  const outerRadius = 10;
  const ringDistance = 24;

  const circles = [
    { x: 50, y: 50, r: centerRadius }, // center
    ...[0, 60, 120, 180, 240, 300].map(angle => {
      const rad = (angle * Math.PI) / 180;
      return {
        x: 50 + ringDistance * Math.cos(rad),
        y: 50 + ringDistance * Math.sin(rad),
        r: outerRadius
      };
    })
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Connecting bridges / lines between center and outer nodes */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x2 = 50 + ringDistance * Math.cos(rad);
        const y2 = 50 + ringDistance * Math.sin(rad);
        return (
          <line
            key={`bridge-${i}`}
            x1="50"
            y1="50"
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.85"
          />
        );
      })}

      {/* Nodes */}
      {circles.map((c, i) => (
        <circle
          key={`node-${i}`}
          cx={c.x}
          cy={c.y}
          r={c.r}
          stroke="currentColor"
          strokeWidth="3"
          fill={variant === 'filled' ? 'currentColor' : '#080C14'}
        />
      ))}

      {/* Inner dots in each outer node */}
      {circles.slice(1).map((c, i) => (
        <circle
          key={`dot-${i}`}
          cx={c.x}
          cy={c.y}
          r="2.5"
          fill="currentColor"
        />
      ))}

      {/* Center AO branding */}
      <text
        x="50"
        y="53.5"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="currentColor"
        fontSize="10"
        fontWeight="bold"
        fontFamily="sans-serif"
        letterSpacing="-0.5"
      >
        AO
      </text>
    </svg>
  );
};
