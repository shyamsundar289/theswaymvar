import { Reveal } from "@/components/site/Reveal";

export function RedTelephoneSection() {
  return (
    <section className="w-full bg-[#fcfbfa] py-24 md:py-32 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Vintage Grain Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.12] mix-blend-multiply z-0" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>

      <Reveal className="max-w-3xl w-full px-4 flex flex-col items-center relative z-10">
        
        {/* AI-Generated Vintage Red Telephone Image */}
        <div className="relative w-full max-w-[360px] md:max-w-[400px] mx-auto select-none mt-4 md:mt-8">
          <img 
            src="/images/red-rotary-telephone.jpg" 
            alt="Vintage Red Rotary Telephone" 
            className="w-full h-auto drop-shadow-2xl mix-blend-multiply"
          />
        </div>
        
        {/* Mobile Number */}
        <div className="mt-8 md:mt-12 text-center relative z-10">
          <a 
            href="tel:+919000000000" 
            className="font-display text-[32px] sm:text-[40px] md:text-[56px] text-[#2d2c2a] hover:text-[#b31212] transition-colors tracking-wider block"
          >
            +91 90000 00000
          </a>
        </div>
      </Reveal>
    </section>
  );
}
