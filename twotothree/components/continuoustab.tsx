"use client";

import { useState, useEffect, type FC } from "react";
import { motion, LayoutGroup } from "motion/react";

/* ---------- Types ---------- */
interface TabItem {
    id: string;
    label: string;
    href?: string;
}

interface ContinuousTabsProps {
    tabs?: TabItem[];
    defaultActiveId?: string;
    onChange?: (id: string) => void;
}

/* ---------- Defaults ---------- */
const DEFAULT_TABS: TabItem[] = [
    { id: "home", label: "Home", href: "/" },
    { id: "how-it-works", label: "How it works", href: "#how-it-works" },
    { id: "faq", label: "FAQ", href: "#faq" },
];

export const ContinuousTabs: FC<ContinuousTabsProps> = ({
    tabs = DEFAULT_TABS,
    defaultActiveId = "home",
    onChange,
}) => {
    const [active, setActive] = useState<string>(defaultActiveId);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        requestAnimationFrame(() => setIsMounted(true));

        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 3;
            let currentActive = "home";

            for (const tab of tabs) {
                if (tab.href && tab.href.startsWith("#")) {
                    const el = document.querySelector(tab.href) as HTMLElement;
                    if (el && el.offsetTop <= scrollPosition) {
                        currentActive = tab.id;
                    }
                }
            }
            
            if (window.scrollY < 100) {
                currentActive = "home";
            }

            setActive(currentActive);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [tabs]);

    const handleChange = (id: string, href?: string) => {
        setActive(id);
        onChange?.(id);
        
        if (href) {
            if (href.startsWith("#")) {
                const el = document.querySelector(href);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                }
            } else if (href === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }
    };

    if (!isMounted) return null;

    return (
        <LayoutGroup>
            <nav
                className="
          relative flex items-center gap-0.5 sm:gap-1 p-1 sm:p-1.5
            rounded-full
            transition-all duration-300
          "
            >
                {tabs.map((tab) => {
                    const isActive = active === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleChange(tab.id, tab.href)}
                            className="relative px-4 py-2 sm:px-6 sm:py-3 rounded-full outline-none cursor-pointer"
                        >
                            {/* Active pill */}
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    transition={{
                                        type: "spring",
                                        stiffness: 380,
                                        damping: 30,
                                        mass: 0.9,
                                    }}
                                    className="
                      absolute inset-0 rounded-full
                      bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-violet-500/20
                      border border-white/10
                      shadow-[0_0_15px_rgba(59,130,246,0.15)]
                    "
                                />
                            )}

                            {/* Text */}
                            <motion.span
                                layout="position"
                                className={`relative z-10 text-sm sm:text-base font-semibold transition-colors duration-200
                    ${isActive
                                        ? "text-white"
                                        : "text-neutral-400 hover:text-white"
                                    }
                  `}
                            >
                                {tab.label}
                            </motion.span>
                        </button>
                    );
                })}
            </nav>
        </LayoutGroup>
    );
};
