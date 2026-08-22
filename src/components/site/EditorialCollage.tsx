import React from "react";
import { motion } from "motion/react";

export function EditorialCollage() {
  // We need 14 images total to surround 1 center text block (15 items total)
  // In a 5-col grid, the center is the 8th item.
  // In a 3-col grid, the center is also the 8th item!
  const topImages = [1, 2, 3, 4, 5, 6, 7];
  const bottomImages = [8, 9, 10, 11, 12, 13, 14];

  return (
    <section className="w-full bg-white overflow-hidden relative border-y border-white/20">
      <div className="w-full grid grid-cols-3 md:grid-cols-5 gap-[2px] bg-white p-[2px]">
        {/* First 7 Images */}
        {topImages.map((num, idx) => (
          <motion.div 
            key={`top-${num}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ duration: 0.6, delay: idx * 0.05 }}
            className="aspect-square relative overflow-hidden bg-[#f0ede6]"
          >
            <picture>
              <source media="(min-width: 768px)" srcSet={`/images/Home/iconic 14/Desktop/${num}.png`} />
              <img src={`/images/Home/iconic 14/${num}.png`} alt="Editorial moment" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </picture>
          </motion.div>
        ))}

        {/* Center Iconic Text Block (8th Item) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "50px" }}
          transition={{ duration: 0.8 }}
          className="aspect-square relative flex flex-col items-center justify-center text-center bg-white px-1 md:px-2"
        >
          <p className="font-display text-[9px] min-[400px]:text-[11px] sm:text-[14px] md:text-[clamp(10px,1.2vw,16px)] text-[#4a4843] tracking-wide leading-tight">
            some of the most
          </p>
          <h3 className="font-display text-[20px] min-[400px]:text-[24px] sm:text-[32px] md:text-[clamp(1.5rem,3.5vw,4rem)] font-normal text-[#2d2c2a] italic leading-none my-[4px] md:my-2">
            "ICONIC"
          </h3>
          <p className="font-display text-[9px] min-[400px]:text-[11px] sm:text-[14px] md:text-[clamp(10px,1.2vw,16px)] text-[#4a4843] tracking-wide leading-tight">
            wedding images
          </p>
        </motion.div>

        {/* Last 7 Images */}
        {bottomImages.map((num, idx) => (
          <motion.div 
            key={`bot-${num}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ duration: 0.6, delay: (idx + 7) * 0.05 }}
            className="aspect-square relative overflow-hidden bg-[#f0ede6]"
          >
            <picture>
              <source media="(min-width: 768px)" srcSet={`/images/Home/iconic 14/Desktop/${num}.png`} />
              <img src={`/images/Home/iconic 14/${num}.png`} alt="Editorial moment" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </picture>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
