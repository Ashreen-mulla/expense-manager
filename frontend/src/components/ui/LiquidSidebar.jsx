import { useRef, useEffect } from "react";
import {
    LayoutDashboard,
    Receipt,
    Tags,
    Wallet,
    ChartColumn,
    LogOut
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const items = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { title: "Expenses",  icon: Receipt,          path: "/expenses"  },
    { title: "Categories",icon: Tags,             path: "/categories"},
    { title: "Budgets",   icon: Wallet,           path: "/budgets"   },
    { title: "Analytics", icon: ChartColumn,      path: "/analytics" },
];

export default function LiquidSidebar() {
    const canvasRef = useRef(null);
    const asideRef  = useRef(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
    };

    /* ── mouse-reactive specular on the sidebar shell ── */
    useEffect(() => {
        const canvas = canvasRef.current;
        const aside  = asideRef.current;
        if (!canvas || !aside) return;
        const ctx = canvas.getContext("2d");

        const draw = (mx, my) => {
            ctx.clearRect(0, 0, 96, 9999);

            // primary specular lobe that follows the cursor
            const g1 = ctx.createRadialGradient(mx, my * 0.5, 0, mx, my * 0.5, 110);
            g1.addColorStop(0,   `rgba(255,255,255,${0.20 + (mx / 96) * 0.14})`);
            g1.addColorStop(0.5, "rgba(255,255,255,0.04)");
            g1.addColorStop(1,   "rgba(255,255,255,0)");
            ctx.fillStyle = g1;
            ctx.fillRect(0, 0, 96, canvas.height);

            // fixed top-edge highlight that shifts horizontally with mouse
            const g2 = ctx.createLinearGradient(0, 0, 96, 0);
            g2.addColorStop(0,              `rgba(255,255,255,${0.10 + (mx/96)*0.10})`);
            g2.addColorStop(Math.max(0, mx / 96 - 0.05), "rgba(255,255,255,0.38)");
            g2.addColorStop(Math.min(1, mx / 96 + 0.05), "rgba(255,255,255,0.38)");
            g2.addColorStop(1,              "rgba(255,255,255,0.04)");
            ctx.fillStyle = g2;
            ctx.fillRect(0, 0, 96, 24);
        };

        // size canvas to match aside height
        const ro = new ResizeObserver(() => {
            canvas.height = aside.offsetHeight;
            draw(48, 180);
        });
        ro.observe(aside);
        draw(48, 180);

        const onMove = (e) => {
            const r = aside.getBoundingClientRect();
            draw(e.clientX - r.left, e.clientY - r.top);
        };
        const onLeave = () => draw(48, 180);

        aside.addEventListener("mousemove", onMove);
        aside.addEventListener("mouseleave", onLeave);
        return () => {
            ro.disconnect();
            aside.removeEventListener("mousemove", onMove);
            aside.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    return (
        <>
            {/* ── SVG filter defs (zero-size, off-screen) ── */}
            <svg
                aria-hidden="true"
                style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
            >
                <defs>
                    {/* refraction displacement for the pill */}
                    <filter
                        id="lg-pill-refract"
                        x="-25%" y="-25%"
                        width="150%" height="150%"
                        colorInterpolationFilters="sRGB"
                    >
                        <feTurbulence
                            type="turbulence"
                            baseFrequency="0.045 0.065"
                            numOctaves="2"
                            seed="3"
                            result="turb"
                        >
                            <animate attributeName="seed"
                                     values="3;7;11;15;3"
                                     dur="5s" repeatCount="indefinite"/>
                            <animate attributeName="baseFrequency"
                                     values="0.045 0.065;0.055 0.075;0.045 0.065"
                                     dur="3.5s" repeatCount="indefinite"/>
                        </feTurbulence>
                        <feDisplacementMap
                            in="SourceGraphic" in2="turb"
                            scale="6"
                            xChannelSelector="R" yChannelSelector="G"
                        />
                    </filter>

                    {/* specular radial gradient */}
                    <radialGradient id="lg-spec" cx="32%" cy="22%" r="62%">
                        <stop offset="0%"   stopColor="rgba(255,255,255,0.95)"/>
                        <stop offset="38%"  stopColor="rgba(255,255,255,0.32)"/>
                        <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
                    </radialGradient>

                    {/* bottom rim gradient */}
                    <radialGradient id="lg-rim" cx="50%" cy="100%" r="70%">
                        <stop offset="0%"   stopColor="rgba(255,255,255,0.50)"/>
                        <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
                    </radialGradient>
                </defs>
            </svg>

            <aside
                ref={asideRef}
                className="
                    fixed left-6 top-6 bottom-6 w-24
                    rounded-[36px] overflow-hidden
                    border border-white/25
                    bg-white/[0.10]
                    backdrop-blur-[32px]
                    shadow-[0_20px_60px_rgba(0,0,0,.12)]
                    z-50
                "
            >
                {/* mouse-reactive specular canvas */}
                <canvas
                    ref={canvasRef}
                    width={96}
                    height={600}
                    style={{
                        position: "absolute", inset: 0,
                        zIndex: 6, pointerEvents: "none",
                        borderRadius: 36, opacity: 0.75,
                    }}
                />

                {/* top highlight */}
                <div className="
                    absolute left-2 right-2 top-2 h-12
                    rounded-full bg-white/40 blur-xl pointer-events-none
                "/>

                {/* outer shine */}
                <div className="
                    absolute inset-0
                    bg-gradient-to-b from-white/25 via-transparent to-transparent
                    pointer-events-none
                "/>

                {/* content */}
                <div className="
                    relative h-full flex flex-col
                    justify-between items-center py-8
                ">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.08, rotate: 8 }}
                        transition={{ type: "spring", stiffness: 120, damping: 22, mass: 1.4 }}
                        className="
                            relative h-14 w-14 rounded-2xl
                            flex items-center justify-center
                            text-white text-2xl font-bold
                            bg-gradient-to-br from-cyan-400 to-blue-600
                            shadow-xl
                        "
                    >
                        ₹
                    </motion.div>

                    {/* Nav */}
                    <nav className="flex flex-col gap-5">
                        {items.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink key={item.path} to={item.path}>
                                    {({ isActive }) => (
                                        <motion.div
                                            whileHover={{ scale: 1.08 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="
                                                relative h-14 w-14
                                                flex items-center justify-center
                                                cursor-pointer
                                            "
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="glass-pill"
                                                    transition={{
                                                        type: "tween",
                                                        duration: 1.0,
                                                        ease: [0.22, 1, 0.36, 1],
                                                    }}
                                                    className="absolute inset-0 rounded-2xl overflow-hidden"
                                                >
                                                    {/*
                                                     * LAYER STACK (bottom → top)
                                                     * 1. SVG displacement — actual pixel refraction
                                                     * 2. Glass body — translucent base + inset rim lights
                                                     * 3. Top meniscus blur
                                                     * 4. Left edge rim light
                                                     * 5. SVG specular lobe + bottom rim + caustic line
                                                     * 6. Shimmer sweep
                                                     * 7. Outer glow ring
                                                     */}

                                                    {/* 1 — SVG displacement refraction */}
                                                    <svg
                                                        aria-hidden="true"
                                                        width="56" height="56"
                                                        style={{
                                                            position: "absolute", inset: 0,
                                                            borderRadius: 16, overflow: "hidden",
                                                        }}
                                                    >
                                                        <rect
                                                            width="56" height="56" rx="16"
                                                            fill="rgba(255,255,255,0.04)"
                                                            filter="url(#lg-pill-refract)"
                                                        />
                                                    </svg>

                                                    {/* 2 — glass body */}
                                                    <div
                                                        className="absolute inset-0 rounded-2xl bg-transparent border border-white/30"
                                                        style={{
                                                            backdropFilter: "blur(40px) saturate(200%)",
                                                            WebkitBackdropFilter: "blur(40px) saturate(200%)",
                                                            boxShadow: `
                                                                inset 0 1px 0 rgba(255,255,255,.60),
                                                                inset 0 -8px 16px rgba(255,255,255,.07),
                                                                inset 1px 0 0 rgba(255,255,255,.50),
                                                                inset -1px 0 0 rgba(255,255,255,.22)
                                                            `,
                                                        }}
                                                    />

                                                    {/* 3 — top meniscus highlight */}
                                                    <div
                                                        className="absolute left-1 right-1 top-[3px] h-[14px] rounded-full bg-white/45"
                                                        style={{ filter: "blur(4px)" }}
                                                    />

                                                    {/* 4 — left edge rim light */}
                                                    <div
                                                        className="absolute left-[3px] top-2 bottom-2 w-[2px] rounded-full bg-white/80"
                                                        style={{ filter: "blur(1px)" }}
                                                    />

                                                    {/* 5 — SVG specular lobe + rim + caustic */}
                                                    <svg
                                                        aria-hidden="true"
                                                        width="56" height="56"
                                                        style={{
                                                            position: "absolute", inset: 0,
                                                            borderRadius: 16, pointerEvents: "none",
                                                        }}
                                                    >
                                                        {/* Phong specular lobe — top-left */}
                                                        <ellipse cx="27" cy="13" rx="17" ry="9"
                                                                 fill="url(#lg-spec)" opacity="0.72"/>
                                                        {/* bottom rim bounce */}
                                                        <ellipse cx="28" cy="53" rx="18" ry="6"
                                                                 fill="url(#lg-rim)" opacity="0.45"/>
                                                        {/* left caustic edge line */}
                                                        <line
                                                            x1="4" y1="9" x2="4" y2="47"
                                                            stroke="rgba(255,255,255,0.65)"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            filter="url(#lg-pill-refract)"
                                                        />
                                                        {/* right dim edge */}
                                                        <line
                                                            x1="52" y1="13" x2="52" y2="43"
                                                            stroke="rgba(255,255,255,0.28)"
                                                            strokeWidth="1"
                                                            strokeLinecap="round"
                                                        />
                                                    </svg>

                                                    {/* 6 — shimmer sweep */}
                                                    <div
                                                        className="absolute inset-0 overflow-hidden rounded-2xl"
                                                    >
                                                        <div style={{
                                                            position: "absolute",
                                                            top: 0, left: 0,
                                                            width: "45%", height: "100%",
                                                            background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.42),transparent)",
                                                            animation: "liquid-shimmer 3s cubic-bezier(.4,0,.2,1) infinite",
                                                            transform: "skewX(-15deg)",
                                                        }}/>
                                                    </div>

                                                    {/* 7 — outer glow ring */}
                                                    <div
                                                        className="absolute inset-0 rounded-2xl"
                                                        style={{
                                                            boxShadow: "0 0 18px 2px rgba(255,255,255,0.18), inset 0 0 6px rgba(255,255,255,0.10)",
                                                        }}
                                                    />
                                                </motion.div>
                                            )}

                                            <motion.div
                                                animate={{
                                                    scale:   isActive ? 1.12 : 1,
                                                    y:       isActive ? -1   : 0,
                                                    opacity: isActive ? 1    : 0.75,
                                                }}
                                                transition={{ duration: 0.2 }}
                                                className="relative z-10"
                                            >
                                                <Icon
                                                    size={24}
                                                    strokeWidth={2.2}
                                                    className={isActive ? "text-slate-950" : "text-slate-700"}
                                                />
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </NavLink>
                            );
                        })}
                    </nav>

                    {/* Logout */}
                    <motion.button
                        onClick={handleLogout}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="
                        relative h-14 w-14 rounded-2xl
                        flex items-center justify-center
                        text-red-500 hover:bg-red-500/10
                        transition-all duration-300"
                    >
                        <LogOut size={24} strokeWidth={2.2}/>
                    </motion.button>
                </div>

                {/* bottom reflection */}
                <div className="
                    absolute bottom-0 left-0 right-0 h-24
                    bg-gradient-to-t from-white/15 to-transparent
                    pointer-events-none
                "/>

                {/* inner border */}
                <div className="
                    absolute inset-[1px] rounded-[35px]
                    border border-white/15 pointer-events-none
                "/>
            </aside>
        </>
    );
}