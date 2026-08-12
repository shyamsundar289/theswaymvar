export function Laurel({ category, year, body }: { category: string; year: string; body: string }) {
  return (
    <div className="flex w-44 shrink-0 items-center justify-center gap-2 text-center">
      <LaurelBranch className="h-16 w-5 text-bronze" />
      <div className="px-1">
        <p className="label-xs text-[0.6rem] text-foreground/70">{category}</p>
        <p className="font-display mt-1 text-xl">{year}</p>
        <p className="label-xs mt-1 text-[0.55rem] text-muted-foreground">{body}</p>
      </div>
      <LaurelBranch className="h-16 w-5 scale-x-[-1] text-bronze" />
    </div>
  );
}

function LaurelBranch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 80" fill="none" className={className} aria-hidden="true">
      <path d="M19 2C8 16 6 40 8 60c1 8 4 14 8 18" stroke="currentColor" strokeWidth="1.1" />
      {Array.from({ length: 7 }).map((_, i) => (
        <ellipse
          key={i}
          cx={9 - i * 0.2}
          cy={12 + i * 8}
          rx="5.5"
          ry="2.6"
          transform={`rotate(${-32 + i * 5} ${9 - i * 0.2} ${12 + i * 8})`}
          fill="currentColor"
          opacity="0.85"
        />
      ))}
    </svg>
  );
}
