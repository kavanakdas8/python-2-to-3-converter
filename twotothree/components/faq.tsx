"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqProps {
  badge?: string;
  title: React.ReactNode;
  faqs: FaqItem[];
  className?: string;
}

export function Faq({ badge, title, faqs, className }: FaqProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className={`mx-auto w-full max-w-4xl px-4 py-16 ${className || ''}`}>
      <div className="mb-12 flex flex-col items-center text-center">
        {badge && (
          <span className="bg-white/10 text-white mb-6 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium">
            {badge}
          </span>
        )}
        <h2 className="text-white max-w-2xl text-3xl leading-tight font-semibold tracking-tight md:text-5xl md:leading-tight">
          {title}
        </h2>
      </div>

      <div className="w-full flex flex-col gap-2">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-white/5 rounded-none border-none px-6 transition-colors hover:bg-white/10"
            >
              <button
                onClick={() => toggle(faq.id)}
                className="group flex w-full items-center py-6 text-left"
              >
                <span className="text-white pr-4 text-left text-base font-medium md:text-lg">
                  {faq.question}
                </span>
                <div className="text-neutral-400 ml-auto flex shrink-0 items-center justify-center">
                  {isOpen ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </div>
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pt-0 pb-6">
                      <p className="text-neutral-400 text-sm leading-relaxed md:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
