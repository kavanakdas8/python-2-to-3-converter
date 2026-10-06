"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const riseItem: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 0.6, bounce: 0 },
  },
};

export function Footer() {
  const navColumns = [
    {
      title: "PRODUCT",
      links: [
        { label: "Converter", href: "/convert" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "RESOURCES",
      links: [
        { label: "Python 2 Migration", href: "#" },
        { label: "Python 3 Guide", href: "#" },
        { label: "Documentation", href: "#" },
      ],
    },
    {
      title: "SUPPORT",
      links: [
        { label: "Help Center", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Feedback", href: "#" },
      ],
    },
  ];

  return (
    <motion.footer
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="relative w-full bg-transparent text-neutral-300 font-sans overflow-hidden selection:bg-cyan-500/30"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10 flex flex-col justify-between">
        


        {/* ── Middle Section: Links ── */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-16">
          <motion.div variants={riseItem} className="flex items-center gap-2 text-white">
            <span className="text-xl md:text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              ModernizePy
            </span>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24 lg:gap-32 w-full md:w-auto">
            {navColumns.map((col, idx) => (
              <motion.div key={idx} variants={riseItem} className="flex flex-col gap-6">
                <h4 className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-4">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link 
                        href={link.href} 
                        className="text-sm text-zinc-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Bottom Section: Meta ── */}
        <motion.div variants={riseItem} className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 text-xs text-neutral-600 border-t border-white/5">
          <p>&copy; 2026 ModernizePy. All rights reserved.</p>
        </motion.div>

      </div>
    </motion.footer>
  );
}
