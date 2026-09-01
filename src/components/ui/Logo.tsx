export default function Logo({
  className = "h-8 w-auto",
}: {
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 100 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        <defs>
          {/* Metallic Gold Gradient */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5E0A3" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#AA7C11" />
          </linearGradient>
        </defs>

        {/* 'C' Loop */}
        <path
          d="M 36 12 C 16 12, 6 22, 6 32 C 6 42, 16 52, 36 52 C 45 52, 50 48, 55 42"
          stroke="url(#goldGradient)"
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 'P' Loop & Stem */}
        <path
          d="M 50 52 L 50 12 C 50 12, 74 12, 74 24 C 74 36, 50 36, 50 36"
          stroke="url(#goldGradient)"
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="font-semibold text-lg tracking-wide text-white whitespace-nowrap">
        Christopher Pham
      </span>
    </div>
  );
}
