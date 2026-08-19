export function MarshallSpeaker({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex flex-col items-center select-none pointer-events-none ${className}`}>
      
      {/* Container for the speaker to maintain relative positioning for sound waves */}
      <div className="relative w-[180px] sm:w-[220px]">
        {/* Sound Waves */}
        <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-12 h-12 z-20">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-foreground">
            <path d="M20 80 Q 50 50 80 20" strokeWidth="2.5" strokeLinecap="round" className="opacity-0 animate-[pulse_2s_ease-in-out_infinite_0s]"/>
            <path d="M35 90 Q 60 65 90 35" strokeWidth="2.5" strokeLinecap="round" className="opacity-0 animate-[pulse_2s_ease-in-out_infinite_0.4s]"/>
            <path d="M50 100 Q 75 80 100 50" strokeWidth="2.5" strokeLinecap="round" className="opacity-0 animate-[pulse_2s_ease-in-out_infinite_0.8s]"/>
          </svg>
        </div>

        {/* Main Speaker Body */}
        <div className="relative bg-[#fdfbf6] rounded-[8px] border-[2.5px] border-foreground p-[5px] shadow-sm aspect-[1.7/1] mt-[26px] z-10">
          
          {/* Top Control Panel */}
          <div className="absolute bottom-[100%] mb-[-2.5px] left-[8%] right-[8%] h-[28px] sm:h-[32px] bg-[#fdfbf6] border-[2.5px] border-b-0 border-foreground rounded-t-[6px] flex items-end justify-around px-2 sm:px-4 pb-[3px] z-10">
            
            {/* VOLUME */}
            <div className="flex flex-col items-center">
              <div className="w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] rounded-full border-[1.5px] border-foreground bg-gradient-to-b from-[#ffffff] to-[#e0e0e0] shadow-[0_1px_1px_rgba(0,0,0,0.2)] relative flex items-center justify-center overflow-hidden">
                <div className="w-[65%] h-[65%] rounded-full border-[0.5px] border-foreground/20 bg-gradient-to-t from-[#ffffff] to-[#e0e0e0] relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1.5px] h-[40%] bg-foreground origin-bottom rotate-[-40deg]"></div>
                </div>
              </div>
              <span className="text-[4px] sm:text-[4.5px] font-sans font-bold tracking-[0.2em] text-foreground mt-[3px] uppercase opacity-90">VOL</span>
            </div>

            {/* BASS */}
            <div className="flex flex-col items-center">
              <div className="w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] rounded-full border-[1.5px] border-foreground bg-gradient-to-b from-[#ffffff] to-[#e0e0e0] shadow-[0_1px_1px_rgba(0,0,0,0.2)] relative flex items-center justify-center overflow-hidden">
                <div className="w-[65%] h-[65%] rounded-full border-[0.5px] border-foreground/20 bg-gradient-to-t from-[#ffffff] to-[#e0e0e0] relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1.5px] h-[40%] bg-foreground origin-bottom rotate-[15deg]"></div>
                </div>
              </div>
              <span className="text-[4px] sm:text-[4.5px] font-sans font-bold tracking-[0.2em] text-foreground mt-[3px] uppercase opacity-90">BASS</span>
            </div>

            {/* TREBLE */}
            <div className="flex flex-col items-center">
              <div className="w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] rounded-full border-[1.5px] border-foreground bg-gradient-to-b from-[#ffffff] to-[#e0e0e0] shadow-[0_1px_1px_rgba(0,0,0,0.2)] relative flex items-center justify-center overflow-hidden">
                <div className="w-[65%] h-[65%] rounded-full border-[0.5px] border-foreground/20 bg-gradient-to-t from-[#ffffff] to-[#e0e0e0] relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1.5px] h-[40%] bg-foreground origin-bottom rotate-[60deg]"></div>
                </div>
              </div>
              <span className="text-[4px] sm:text-[4.5px] font-sans font-bold tracking-[0.2em] text-foreground mt-[3px] uppercase opacity-90">TREB</span>
            </div>

            {/* POWER SWITCH */}
            <div className="flex flex-col items-center">
              <div className="w-[7px] h-[10px] sm:w-[8px] sm:h-[12px] border-[1.5px] border-foreground rounded-[2px] bg-gradient-to-b from-[#e0e0e0] to-[#ffffff] relative flex flex-col justify-end items-center pb-[1px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
                 <div className="w-[3px] h-[5px] sm:w-[4px] sm:h-[6px] bg-foreground rounded-[1px] shadow-[0_1px_1px_rgba(0,0,0,0.5)]"></div>
              </div>
              <span className="text-[4px] sm:text-[4.5px] font-sans font-bold tracking-[0.2em] text-foreground mt-[4px] uppercase opacity-90">PWR</span>
            </div>

          </div>

          {/* Inner Grill with horizontal lines */}
          <div className="w-full h-full rounded-[4px] border-[2px] border-foreground relative overflow-hidden flex flex-col justify-between py-1 bg-white">
            {/* Horizontal lines */}
            {[...Array(14)].map((_, i) => (
              <div key={i} className="w-full h-[1px] bg-foreground/90"></div>
            ))}

            {/* Marshall Logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none drop-shadow-md bg-white/20 backdrop-blur-[0.5px]">
              <span 
                className="font-serif italic font-bold text-foreground text-3xl sm:text-4xl tracking-tighter"
                style={{ transform: "rotate(-3deg)" }}
              >
                Marshall
              </span>
            </div>
          </div>
        </div>

        {/* Speaker Feet */}
        <div className="flex justify-between px-6 -mt-[1px]">
          <div className="w-[14px] h-[6px] bg-foreground rounded-b-[3px]"></div>
          <div className="w-[14px] h-[6px] bg-foreground rounded-b-[3px]"></div>
        </div>
      </div>

      {/* THE SOUND OF FOREVER - Typography */}
      <div className="mt-12 flex flex-col items-center justify-center opacity-85 mix-blend-multiply">
        <span 
          className="font-display text-[11px] sm:text-[13px] tracking-[0.4em] sm:tracking-[0.5em] text-foreground uppercase font-normal relative"
          style={{ textShadow: '0px 0.5px 0px rgba(255,255,255,0.8)' }}
        >
          The Sound Of Forever
        </span>
      </div>

    </div>
  );
}
