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
    { id: "faq", label: "FAQ", href: "#faq" },
    { id: "about", label: "About", href: "#about" },
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
    }, []);

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
                      bg-[#252528] dark:bg-zinc-100
                      shadow-xs
                    "
                                />
                            )}

                            {/* Text */}
                            <motion.span
                                layout="position"
                                className={`relative z-10 text-sm sm:text-base font-semibold transition-colors duration-200
                    ${isActive
                                        ? "text-[#EDEDEC] dark:text-zinc-950"
                                        : "text-[#343437] dark:text-zinc-500 hover:text-[#62625D] dark:hover:text-zinc-300"
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
