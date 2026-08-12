import { Link } from "@tanstack/react-router";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link to="/" className={`wordmark text-lg md:text-xl ${className ?? ""}`}>
      theswaymvar
    </Link>
  );
}
