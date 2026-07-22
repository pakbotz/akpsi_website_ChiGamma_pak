'use client';

import { motion, type Variants } from 'framer-motion';
import { CldImage } from 'next-cloudinary';

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const letters = ['A', 'K', 'Ψ'];

export default function Hero({ backgroundImage }: { backgroundImage: string | null }) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0">
        {backgroundImage && (
          <CldImage
            src={backgroundImage}
            alt="Chi Gamma chapter"
            fill
            sizes="100vw"
            quality="auto"
            format="auto"
            className="object-cover opacity-70"
            preload
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, rgba(200,184,154,0.16) 0%, rgba(10,10,10,0) 55%), radial-gradient(circle at 20% 80%, rgba(120,90,40,0.12) 0%, rgba(10,10,10,0) 50%), radial-gradient(circle at 85% 15%, rgba(160,140,100,0.10) 0%, rgba(10,10,10,0) 45%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-screen"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6">
        <motion.div className="flex items-end gap-3 sm:gap-6 md:gap-10" initial="hidden" animate="visible">
          {letters.map((letter, i) => (
            <motion.span
              key={letter + i}
              custom={i}
              variants={wordVariants}
              className="font-medium leading-none tracking-tight text-[#f0eeea] select-none"
              style={{ fontSize: 'clamp(4.5rem, 22vw, 17rem)' }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-md text-center text-sm tracking-[0.25em] uppercase text-white/40 sm:mt-10"
        >
          Chi Gamma Chapter — UC Santa Cruz
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 right-8 z-10 hidden text-xs tracking-[0.2em] text-white/40 sm:block"
      >
        (SCROLL)
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-8 z-10 hidden border-b border-white/20 pb-1 text-xs tracking-[0.15em] text-white/50 sm:block"
      >
        Professional. Brotherhood. Driven.
      </motion.div>
    </section>
  );
}