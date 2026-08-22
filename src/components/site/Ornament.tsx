export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-0 ${className}`}>
      <div className="w-[50px] md:w-[70px] h-[1px] bg-[#c4a97d]" />
      <span className="text-[#c4a97d] text-[8px] mx-[6px]">✦</span>
      <div className="w-[50px] md:w-[70px] h-[1px] bg-[#c4a97d]" />
    </div>
  );
}
