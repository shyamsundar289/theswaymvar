import { createFileRoute } from "@tanstack/react-router";
import { Reveal, RevealImage } from "@/components/site/Reveal";
import { images } from "@/data/images";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — theswayamvar" },
      {
        name: "description",
        content: "Cinematic Wedding Films & Photography. Quiet records of celebrations.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const teamMembers = [
    {
      id: "member-1",
      name: "Ritesh Sharma",
      role: "Founder & Filmmaker",
      img: "/images/crew/pic1.jpg",
      description: "With a background in documentary filmmaking, Ritesh approaches weddings not as staged productions, but as living, breathing stories. He believes the most powerful moments happen when nobody realizes the camera is rolling."
    },
    {
      id: "member-2",
      name: "Ayesha Khanna",
      role: "Lead Photographer",
      img: "/images/crew/pic2.jpg",
      description: "Ayesha looks for the quiet spaces between the celebrations. Her frames are defined by an obsession with natural light, delicate composition, and preserving the exact feeling of a fleeting second."
    },
    {
      id: "member-3",
      name: "Vikram Singh",
      role: "Cinematographer",
      img: "/images/crew/pic4.jpg",
      description: "A master of light and atmosphere, Vikram captures the grand scale and the intimate details with equal reverence. His work ensures that every film feels atmospheric, cinematic, and timeless."
    },
    {
      id: "member-4",
      name: "Priya Desai",
      role: "Editor & Colorist",
      img: "/images/crew/pic7.jpg",
      description: "Priya shapes the final narrative, bringing rhythm and emotion to every film and photograph. She cuts to the genuine heartbeat of the day, ensuring the final memory is as honest as the moment itself."
    }
  ];

  return (
    <div className="bg-background text-foreground min-h-[100svh] selection:bg-[#d1cbbd]/30 overflow-hidden">
      
      {/* 1. HERO / INTRODUCTION */}
      <section className="relative w-full pt-[160px] pb-24 md:pt-[220px] md:pb-32 px-[5vw]">
        <Reveal className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <p className="font-sans text-[10px] md:text-[12px] uppercase tracking-[0.3em] text-[#8b867c] mb-6 md:mb-8">
            The Swayamvar
          </p>
          <h1 className="font-display text-[clamp(2.8rem,6vw,5rem)] text-[#2d2c2a] leading-[1.05] tracking-tight mb-6">
            theswayamvar
          </h1>
          <p className="font-sans text-[11px] md:text-[13px] uppercase tracking-[0.2em] text-[#2d2c2a] mb-12 opacity-80">
            Cinematic Wedding Films & Photography
          </p>
          <p className="font-sans text-[15px] md:text-[18px] text-[#5D5A55] leading-relaxed max-w-2xl mx-auto">
            We are a wedding photography and film studio making quiet, cinematic records of celebrations across India and worldwide. We focus on narrative, light, and the honest moments you were too busy to notice.
          </p>
        </Reveal>
      </section>

      {/* 2. THE SWAYAMVAR LOGO / BRAND STORY */}
      <section className="shell py-24 md:py-32 border-t border-border/40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center max-w-6xl mx-auto px-[5vw]">
          <Reveal className="flex justify-center md:justify-start order-1 md:order-1">
            <img 
              src="/images/swamyvar_logo.svg" 
              alt="The Swayamvar Logo" 
              className="w-[200px] md:w-[280px] lg:w-[320px] opacity-90"
            />
          </Reveal>
          
          <Reveal className="flex flex-col order-2 md:order-2">
            <p className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#8b867c] mb-6">
              The Name
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-[#2d2c2a] leading-[1.15] mb-8">
              More than a name.<br />
              <span className="italic font-light">A way of remembering.</span>
            </h2>
            <div className="space-y-6 text-[15px] md:text-[17px] text-[#5D5A55] leading-relaxed">
              <p>
                In ancient traditions, a <em>Swayamvar</em> was the ultimate act of choosing one's own destiny. We chose this name because every celebration is, at its heart, a profound, personal choice to build a life together.
              </p>
              <p>
                As a studio, we approach weddings as observers rather than directors. Our philosophy is rooted in the belief that the truth of a moment is always more beautiful than anything we could stage. We are here to preserve the quiet glances, the unscripted tears, and the genuine joy, creating a cinematic legacy that feels as honest tomorrow as it did today.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. FOUNDER / STUDIO PORTRAIT */}
      <section className="w-full bg-[#F6F4EE] py-24 md:py-32">
        <div className="shell grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center max-w-7xl mx-auto px-[5vw]">
          <div className="w-full">
            <RevealImage className="w-full aspect-[4/5] overflow-hidden bg-muted rounded-[2px] shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
              <img 
                src={images.approach.inset} 
                alt="Studio Portrait" 
                className="w-full h-full object-cover object-center grayscale-[20%]"
              />
            </RevealImage>
          </div>
          
          <Reveal className="flex flex-col">
            <p className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#8b867c] mb-6">
              The person behind the frame
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-[#2d2c2a] leading-[1.15] mb-8">
              Every story deserves to be<br />
              <span className="italic font-light">remembered honestly.</span>
            </h2>
            <div className="space-y-6 text-[15px] md:text-[17px] text-[#5D5A55] leading-relaxed">
              <p>
                I started with a borrowed camera and a preference for sitting in the back row. What I learned quickly was that the most important moments of a wedding rarely happen on stage. They happen in the hallways, in the thirty seconds before walking down the aisle, and in the quiet glances exchanged when nobody else is looking.
              </p>
              <p>
                We shifted our focus entirely toward documentary-style filmmaking because we realized that directing a couple to pose for a memory completely strips the truth out of it. We believe the smallest, most imperfect moments often become the most important memories you keep.
              </p>
              <p>
                For us, the greatest privilege is not just being invited to your celebration, but being trusted enough to blend in, stay out of the way, and preserve the day exactly as it felt.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. PHILOSOPHY / APPROACH */}
      <section className="shell py-24 md:py-40 border-b border-border/40">
        <Reveal className="max-w-5xl mx-auto px-[5vw]">
          <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] text-[#2d2c2a] leading-[1.1] mb-20 text-center md:text-left">
            We don't direct the memory.<br />
            <span className="italic font-light text-[#8b867c]">We preserve it.</span>
          </h2>
          
          <div className="flex flex-col gap-16 md:gap-20 border-l border-[#e4e0d7] pl-8 md:pl-16">
            <Reveal delay={0.1}>
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#8b867c] w-[140px] shrink-0">
                  01 — Observe
                </span>
                <p className="font-display text-2xl md:text-3xl text-[#2d2c2a] leading-relaxed max-w-2xl">
                  We look for the moments that happen naturally. No awkward pausing, no staging—just life as it unfolds.
                </p>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#8b867c] w-[140px] shrink-0">
                  02 — Feel
                </span>
                <p className="font-display text-2xl md:text-3xl text-[#2d2c2a] leading-relaxed max-w-2xl">
                  We photograph emotion before perfection. A slightly blurred image full of tears and laughter is always worth more than a perfectly sharp, empty pose.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#8b867c] w-[140px] shrink-0">
                  03 — Preserve
                </span>
                <p className="font-display text-2xl md:text-3xl text-[#2d2c2a] leading-relaxed max-w-2xl">
                  We create photographs and films that still feel alive years later, allowing you to not just see what happened, but remember exactly how it felt.
                </p>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </section>

      {/* 5. TEAM SECTION */}
      <section className="shell py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-[5vw] lg:px-[7vw]">
          <Reveal className="flex flex-col items-center text-center mb-16 md:mb-24">
            <p className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#8b867c] mb-6">
              The Team
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-[#2d2c2a] leading-[1.15] mb-6">
              The people behind the frame.
            </h2>
            <p className="font-sans text-[15px] md:text-[17px] text-[#5D5A55] max-w-xl mx-auto">
              A small team, brought together by a shared obsession with stories, light and honest moments.
            </p>
          </Reveal>

          {/* 4 Team Members Grid */}
          <Reveal delay={0.2} className="w-full">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {teamMembers.map((member, idx) => (
                <div key={member.id} className="w-full flex flex-col group cursor-pointer relative" tabIndex={0}>
                  
                  {/* EXACT Photography Page Frame Shape & Dual-Layer Hover */}
                  <div 
                    className="relative overflow-hidden rounded-[20px] bg-muted w-full aspect-[4/5]" 
                    style={{ boxShadow: '0 15px 30px rgba(0,0,0,0.08)' }}
                  >
                    {/* Bottom Layer: Original Color */}
                    <img 
                      src={member.img} 
                      alt={member.name} 
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105 group-focus:scale-105"
                    />
                    
                    {/* Top Layer: Grayscale (fades out on hover) */}
                    <img 
                      src={member.img} 
                      alt="" 
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-center grayscale opacity-100 group-hover:opacity-0 group-focus:opacity-0 transition-opacity duration-700 pointer-events-none"
                    />
                    
                    {/* Overlay: Name inside image on hover */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-700 flex flex-col items-center justify-center p-4 text-center pointer-events-none">
                      <h4 className="font-display text-white text-[22px] md:text-[28px] tracking-wide mb-2">
                        {member.name}
                      </h4>
                      <p className="font-sans text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-white/90">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. INDIVIDUAL TEAM STORIES */}
      <section className="shell py-16 md:py-24 bg-[#F8F6F2] border-y border-border/30">
        <div className="max-w-5xl mx-auto px-[5vw] flex flex-col gap-24 md:gap-40">
          {teamMembers.map((member, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div key={`story-${member.id}`} className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-[40%]">
                  <RevealImage className="w-full aspect-[3/4] overflow-hidden bg-muted shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
                    <img 
                      src={member.img} 
                      alt={member.name} 
                      loading="lazy"
                      className="w-full h-full object-cover object-center grayscale-[80%]"
                    />
                  </RevealImage>
                </div>
                
                <div className="w-full md:w-[60%] flex flex-col">
                  <Reveal>
                    <span className="font-sans text-[10px] text-[#8b867c] tracking-[0.2em] mb-4 block">
                      0{idx + 1}
                    </span>
                    <h3 className="font-display text-[2rem] md:text-[3rem] text-[#2d2c2a] leading-none mb-3">
                      {member.name}
                    </h3>
                    <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#8b867c] mb-8">
                      {member.role}
                    </p>
                    <p className="text-[15px] md:text-[17px] text-[#5D5A55] leading-relaxed max-w-md">
                      {member.description}
                    </p>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. CONTACT / ENQUIRY CTA */}
      <section className="w-full py-32 md:py-48 text-center bg-background px-[5vw]">
        <Reveal className="max-w-3xl mx-auto flex flex-col items-center">
          <p className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#8b867c] mb-8">
            Let's make something worth remembering
          </p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] text-[#2d2c2a] leading-[1.05] tracking-tight mb-12">
            Your story starts here.
          </h2>
          <p className="font-sans text-[15px] md:text-[17px] text-[#5D5A55] max-w-lg mx-auto mb-16">
            For wedding enquiries, films, photography or simply to tell us a little about your day, we'd love to hear from you.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 mb-16">
            <div className="flex flex-col items-center">
              <span className="font-display italic text-[#8b867c] text-xl mb-2">Email</span>
              <a href="mailto:hello@theswayamvar.com" className="font-sans text-[13px] tracking-widest uppercase hover:text-[#8b867c] transition-colors">
                hello@theswayamvar.com
              </a>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="font-display italic text-[#8b867c] text-xl mb-2">Phone</span>
              <a href="tel:+919876543210" className="font-sans text-[13px] tracking-widest uppercase hover:text-[#8b867c] transition-colors">
                +91 98765 43210
              </a>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="font-display italic text-[#8b867c] text-xl mb-2">Studio</span>
              <span className="font-sans text-[13px] tracking-widest uppercase">
                New Delhi, India
              </span>
            </div>
          </div>
          
          <a 
            href="mailto:hello@theswayamvar.com"
            className="inline-flex items-center justify-center border border-[#d1cbbd] px-10 py-4 text-[11px] tracking-[0.25em] uppercase hover:bg-[#2d2c2a] hover:text-white hover:border-[#2d2c2a] transition-all duration-500"
          >
            Get In Touch
          </a>
        </Reveal>
      </section>

    </div>
  );
}
