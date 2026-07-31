import { useState } from "react";
import { Link, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";

/* ── Inline SVG Icons ─────────────────────────────────────────── */
const IconHome = ({ size = 22, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);
const IconGift = ({ size = 22, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconDeposit = ({ size = 26, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-4H7l5-5 5 5h-4v4z"/>
  </svg>
);
const IconHistory = ({ size = 22, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
  </svg>
);
const IconUser = ({ size = 22, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
  </svg>
);
const IconMenu = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const IconSearch = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconClose = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconChevronRight = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
);
const IconBetRecords = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM8 13h8v2H8v-2zm0 4h5v2H8v-2z"/>
  </svg>
);
const IconAgent = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
  </svg>
);
const IconHot = ({ size = 20, color = "#C9A84C" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M13.5 0.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
  </svg>
);
const IconSlots = ({ size = 20, color = "rgba(255,255,255,0.4)" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
  </svg>
);
const IconRecent = ({ size = 20, color = "rgba(255,255,255,0.4)" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
  </svg>
);
const IconFavorite = ({ size = 20, color = "rgba(255,255,255,0.4)" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
  </svg>
);

/* Offer center items with colored SVG icons */
const offerItems = [
  {
    label: "Sự kiện",
    bg: "#5B6CF6",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
        <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
      </svg>
    ),
  },
  {
    label: "Nhiệm vụ",
    bg: "#2EC97C",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    ),
  },
  {
    label: "Hoàn trả",
    bg: "#F5A623",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
      </svg>
    ),
  },
  {
    label: "Nhận thưởng",
    bg: "#E85D5D",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
        <path d="M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Lịch sử",
    bg: "#E87D2F",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
        <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
      </svg>
    ),
  },
  {
    label: "Lãi suất",
    bg: "#E860B3",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
      </svg>
    ),
  },
  {
    label: "VIP",
    bg: "#8B3FD9",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
        <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
      </svg>
    ),
  },
  {
    label: "Quỹ",
    bg: "#27A660",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
        <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
      </svg>
    ),
  },
];

const gameTabs = [
  { id: "hot",      Icon: IconHot,      label: "Hot" },
  { id: "slots",    Icon: IconSlots,    label: "Slots" },
  { id: "recent",   Icon: IconRecent,   label: "Recent" },
  { id: "favorite", Icon: IconFavorite, label: "Favorite" },
];

const NavIcon = ({ Icon, label, href, active }: { Icon: React.FC<{size?:number;color?:string}>; label: string; href: string; active: boolean }) => (
  <Link href={href} style={{ flex: 1 }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "7px 0", cursor: "pointer", gap: 2 }}>
      <Icon size={22} color={active ? "#C9A84C" : "rgba(255,255,255,0.4)"} />
      <span style={{ fontSize: 10, color: active ? "#C9A84C" : "rgba(255,255,255,0.4)", fontWeight: active ? 700 : 400, lineHeight: 1 }}>{label}</span>
    </div>
  </Link>
);

interface LayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const [location] = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "center", minHeight: "100dvh", background: "#0D0D1A" }}>
      <div style={{ width: "100%", maxWidth: 480, background: "#13131F", minHeight: "100dvh", position: "relative", display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* ═══ HEADER ═══ */}
        <header style={{
          position: "sticky", top: 0, zIndex: 40,
          background: "#0D0D1A",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 12px", height: 46, flexShrink: 0,
          borderBottom: "1px solid rgba(201,168,76,0.3)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => setDrawerOpen(true)} data-testid="button-menu"
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)", padding: 4, display: "flex" }}>
              <IconMenu size={22} />
            </button>
            <Link href="/">
              <span style={{ 
                fontFamily: "'Oswald', sans-serif", 
                fontWeight: 700, 
                fontSize: 18, 
                background: "linear-gradient(135deg, #C9A84C, #F5D787)", 
                WebkitBackgroundClip: "text", 
                WebkitTextFillColor: "transparent", 
                backgroundClip: "text", 
                letterSpacing: "0.05em",
                cursor: "pointer"
              }}>
                HUYNH THUONG
              </span>
            </Link>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Link href="/login">
              <button data-testid="button-login" style={{
                background: "none", border: "1px solid #C9A84C", borderRadius: 4,
                color: "#C9A84C", fontSize: 12, fontWeight: 600, padding: "4px 10px", cursor: "pointer",
              }}>Đăng nhập</button>
            </Link>
            <Link href="/register">
              <button data-testid="button-register" style={{
                background: "#C9A84C", border: "none", borderRadius: 4,
                color: "#0D0D1A", fontSize: 12, fontWeight: 700, padding: "4px 10px", cursor: "pointer",
              }}>Đăng ký</button>
            </Link>
            <button data-testid="button-search" style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)", display: "flex", padding: 2 }}>
              <IconSearch size={18} />
            </button>
            {/* VN flag as SVG */}
            <div style={{ width: 22, height: 22, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
              <svg viewBox="0 0 30 20" width="22" height="22">
                <rect width="30" height="20" fill="#DA251D"/>
                <polygon points="15,4 16.76,9.42 22.36,9.42 17.8,12.58 19.56,18 15,14.84 10.44,18 12.2,12.58 7.64,9.42 13.24,9.42" fill="#FFFF00"/>
              </svg>
            </div>
          </div>
        </header>

        {/* ═══ LEFT DRAWER ═══ */}
        <AnimatePresence>
          {drawerOpen && (
            <>
              <motion.div key="ov"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 49 }}
                onClick={() => setDrawerOpen(false)}
              />
              <motion.div key="dr"
                initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.22 }}
                style={{
                  position: "fixed", top: 0, bottom: 0, left: 0,
                  width: "78%", maxWidth: 300, background: "#0D0D1A",
                  zIndex: 50, overflowY: "auto", display: "flex", flexDirection: "column",
                }}
              >
                {/* Drawer head */}
                <div style={{ background: "#1A1A2E", padding: "14px 14px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#13131F", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(201,168,76,0.3)" }}>
                      <IconUser size={20} color="#C9A84C" />
                    </div>
                    <div>
                      <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>Khách</div>
                      <div style={{ color: "#C9A84C", fontSize: 11, cursor: "pointer" }}>
                        <Link href="/login" onClick={() => setDrawerOpen(false)}>Đăng nhập/Đăng ký &gt;</Link>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setDrawerOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)" }}>
                    <IconClose size={20} />
                  </button>
                </div>

                {/* Game Category Tabs */}
                <div style={{ background: "#1A1A2E", padding: "8px 10px", display: "flex", gap: 6, borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
                  {gameTabs.map(t => {
                    const isActive = activeTab === t.id;
                    return (
                      <button key={t.id} onClick={() => { onTabChange?.(t.id); setDrawerOpen(false); }}
                        style={{
                          flex: 1, background: isActive ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.05)",
                          border: isActive ? "1px solid rgba(201,168,76,0.3)" : "1px solid transparent", 
                          borderRadius: 6, padding: "7px 2px", cursor: "pointer",
                          display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                        }}
                      >
                        <t.Icon size={20} color={isActive ? "#C9A84C" : "rgba(255,255,255,0.4)"} />
                        <span style={{ fontSize: 10, color: isActive ? "#C9A84C" : "rgba(255,255,255,0.4)", fontWeight: isActive ? 700 : 400 }}>{t.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Financial Actions */}
                <div style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[
                      { Icon: IconDeposit, label: "Nạp tiền", href: "/deposit" },
                      { Icon: IconDeposit, label: "Rút tiền", href: "/withdrawal" },
                    ].map(({ Icon, label, href }) => (
                      <Link key={label} href={href} onClick={() => setDrawerOpen(false)}>
                        <button style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#fff" }}>
                          <Icon size={20} color="#C9A84C" />
                          <span style={{ fontSize: 12, color: "#fff" }}>{label}</span>
                        </button>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Bet Records & Agent */}
                <div style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[
                      { Icon: IconBetRecords, label: "Lịch sử cược", href: "/history" },
                      { Icon: IconAgent,      label: "Đại lý", href: "#" },
                    ].map(({ Icon, label, href }) => (
                      <Link key={label} href={href} onClick={() => setDrawerOpen(false)}>
                        <button style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, color: "#fff" }}>
                          <Icon size={22} color="#C9A84C" />
                          <span style={{ fontSize: 12, color: "#fff" }}>{label}</span>
                        </button>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Offer Center */}
                <div style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 600, marginBottom: 8 }}>Trung tâm ưu đãi</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {offerItems.map((item, i) => (
                      <button key={i} style={{
                        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
                        padding: "8px 8px", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 8, color: "#fff",
                      }}>
                        <div style={{ width: 32, height: 32, borderRadius: 6, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {item.icon}
                        </div>
                        <span style={{ fontSize: 11, color: "#fff", textAlign: "left", lineHeight: 1.2 }}>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bottom links */}
                <div style={{ marginTop: "auto", padding: "12px 12px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <svg viewBox="0 0 30 20" width="22" height="16" style={{ borderRadius: 2 }}>
                        <rect width="30" height="20" fill="#DA251D"/>
                        <polygon points="15,4 16.76,9.42 22.36,9.42 17.8,12.58 19.56,18 15,14.84 10.44,18 12.2,12.58 7.64,9.42 13.24,9.42" fill="#FFFF00"/>
                      </svg>
                      <span style={{ color: "#fff", fontSize: 13 }}>Tiếng Việt</span>
                    </div>
                    <IconChevronRight size={14} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-around" }}>
                    {[
                      { label: "CSKH", color: "rgba(255,255,255,0.4)", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)"><path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"/></svg> },
                      { label: "FAQ",  color: "rgba(255,255,255,0.4)", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg> },
                      { label: "Giới thiệu", color: "rgba(255,255,255,0.4)", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg> },
                    ].map((item, i) => (
                      <button key={i} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                        {item.icon}
                        <span style={{ fontSize: 10, color: item.color }}>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ═══ MAIN ═══ */}
        <main style={{ flex: 1, overflowY: "auto", overflowX: "hidden", paddingBottom: 60 }} className="no-scrollbar">
          {children}
        </main>

        {/* ═══ BOTTOM NAV ═══ */}
        <nav style={{
          position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: "100%", maxWidth: 480,
          background: "#0D0D1A",
          borderTop: "1px solid rgba(201,168,76,0.3)",
          zIndex: 40, display: "flex", alignItems: "center",
        }}>
          <NavIcon Icon={IconHome}    label="Trang chủ" href="/"           active={location === "/"} />
          <NavIcon Icon={IconGift}    label="Khuyến mãi" href="/promotions" active={location === "/promotions"} />

          {/* Center deposit */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Link href="/deposit">
              <div data-testid="nav-deposit" style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", marginTop: -18 }}>
                <div style={{
                  width: 50, height: 50, borderRadius: "50%",
                  background: "linear-gradient(135deg, #C9A84C, #E8C96A)",
                  border: "3px solid #0D0D1A",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 2px 15px rgba(201,168,76,0.4)",
                }}>
                  <IconDeposit size={26} color="#0D0D1A" />
                </div>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2, fontWeight: 400 }}>Nạp tiền</span>
              </div>
            </Link>
          </div>

          <NavIcon Icon={IconHistory} label="Lịch sử"   href="/history"    active={location === "/history"} />
          <NavIcon Icon={IconUser}    label="Tôi"        href="/profile"     active={location === "/profile"} />
        </nav>
      </div>
    </div>
  );
}
