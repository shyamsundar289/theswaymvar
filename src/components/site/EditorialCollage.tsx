import React from "react";
import { motion } from "motion/react";

export function EditorialCollage() {
  const row1 = [1, 2, 3, 4, 5];
  const row2Left = [6, 7];
  const row2Right = [8, 9];
  const row3 = [10, 11, 12, 13, 14];

  return (
    <section className="w-full bg-white overflow-hidden relative border-y border-white/20">
      <div className="w-full flex flex-col gap-[2px] bg-white p-[2px]">
        {/* Row 1: 5 Photos */}
        <div className="grid grid-cols-5 gap-[2px]">
          {row1.map((num, idx) => (
            <motion.div 
              key={`r1-${num}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="aspect-square relative overflow-hidden bg-[#f0ede6]"
            >
              <img src={`/images/crew/pic${num}.jpg`} alt="Editorial moment" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </motion.div>
          ))}
        </div>

        {/* Row 2: 2 Photos, ICONIC TEXT, 2 Photos */}
        <div className="grid grid-cols-5 gap-[2px]">
          {row2Left.map((num, idx) => (
            <motion.div 
              key={`r2l-${num}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="aspect-square relative overflow-hidden bg-[#f0ede6]"
            >
              <img src={`/images/crew/pic${num}.jpg`} alt="Editorial moment" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </motion.div>
          ))}

          {/* Middle Iconic Text Block */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ duration: 0.8 }}
            className="aspect-square relative flex flex-col items-center justify-center text-center bg-white px-1 md:px-2"
          >
            <p className="font-serif text-[6.5px] min-[400px]:text-[8px] sm:text-[11px] md:text-[clamp(10px,1.2vw,16px)] text-[#4a4843] tracking-wide leading-tight">
              some of the most
            </p>
            <h3 className="font-display text-[12px] min-[400px]:text-[15px] sm:text-[22px] md:text-[clamp(1.5rem,3.5vw,4rem)] font-normal text-[#2d2c2a] italic leading-none my-[2px] md:my-2">
              "ICONIC"
            </h3>
            <p className="font-serif text-[6.5px] min-[400px]:text-[8px] sm:text-[11px] md:text-[clamp(10px,1.2vw,16px)] text-[#4a4843] tracking-wide leading-tight">
              wedding images
            </p>
          </motion.div>

          {row2Right.map((num, idx) => (
            <motion.div 
              key={`r2r-${num}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.6, delay: (idx + 3) * 0.1 }}
              className="aspect-square relative overflow-hidden bg-[#f0ede6]"
            >
              <img src={`/images/crew/pic${num}.jpg`} alt="Editorial moment" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </motion.div>
          ))}
        </div>

        {/* Row 3: 5 Photos */}
        <div className="grid grid-cols-5 gap-[2px]">
          {row3.map((num, idx) => (
            <motion.div 
              key={`r3-${num}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="aspect-square relative overflow-hidden bg-[#f0ede6]"
            >
              <img src={`/images/crew/pic${num}.jpg`} alt="Editorial moment" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
