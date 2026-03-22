"use client";

import Image from "next/image";
import { motion } from "motion/react";

export function Card() {
  return (
    <motion.div
      className="flex flex-col rounded-[9px] shadow-[0px_20px_30px_-10px_#270419] overflow-hidden max-w-[563px] w-full"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Hero Image */}
      <motion.div
        className="relative w-full aspect-[563/844] overflow-hidden"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/hero-image.png"
          alt="Still life with flowers, a book, coffee, and a watch"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Quote + Play Button */}
      <div className="bg-[#c1b17d] flex flex-col items-center gap-[70px] px-10 py-10">
        <motion.p
          className="font-['new-spirit-condensed',serif] text-[#013838] text-[29px] leading-normal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          Suzanne Mozes: &ldquo;If not for my 7th-grade teacher whose name I
          can&rsquo;t remember, I probably wouldn&rsquo;t have discovered my
          love for writing&hellip;&rdquo;
        </motion.p>

        <motion.button
          type="button"
          aria-label="Play episode"
          className="w-[105px] h-[105px] rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            viewBox="0 0 105 105"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <circle cx="52.5" cy="52.5" r="52.5" fill="#46092D" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M40.4121 26.4322C39.3097 26.4311 38.2251 26.7109 37.2608 27.2452C36.2719 27.7493 35.4388 28.513 34.8508 29.4544C34.2628 30.3958 33.9421 31.4795 33.9231 32.5893V72.4072C33.9421 73.517 34.2628 74.6007 34.8508 75.5422C35.4388 76.4836 36.2719 77.2473 37.2608 77.7513C38.2426 78.2967 39.3492 78.5779 40.4722 78.5674C41.5952 78.557 42.6963 78.2552 43.6678 77.6917L75.8518 57.7846C76.845 57.2841 77.6796 56.5175 78.2627 55.5704C78.8457 54.6233 79.1543 53.5329 79.1539 52.4207C79.1535 51.3085 78.8442 50.2183 78.2605 49.2716C77.6768 48.3249 76.8416 47.5589 75.848 47.0591L43.6641 27.3012L43.6044 27.2676C42.6301 26.7187 41.5304 26.431 40.4121 26.4322Z"
              fill="#E7D9B8"
            />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}
