import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout/layout";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";

const CDN = "https://xgamecdn.com";

const banners = [
  `${CDN}/kp/202604/TENL9HFvJ1JW77vO.png`,
  `${CDN}/kp/202604/vo7Iww95-46d-_XC.png`,
  `${CDN}/kp/202604/i2tX9HzTKt61pL5h.png`,
  `${CDN}/kp/202604/2Q0EpeG-e8_uO1mG.png`,
];

const HALLS: Record<string, { label: string; sub: string; games: Game[] }> = {
  jili: {
    label: "JILI", sub: "SLOT",
    games: [
      { id: 101, name: "Fortune Gems",    provider: "JILI", img: `${CDN}/game/OM/g/JL/3/200/0.png` },
      { id: 102, name: "Super Ace",       provider: "JILI", img: `${CDN}/game/OM/g/JL/3/204/0.png` },
      { id: 103, name: "Boxing King",     provider: "JILI", img: `${CDN}/game/OM/g/JL/3/208/0.png` },
      { id: 104, name: "Mega Ace",        provider: "JILI", img: `${CDN}/game/OM/g/JL/3/209/0.png` },
      { id: 105, name: "Lucky Coming",    provider: "JILI", img: `${CDN}/game/OM/g/JL/3/214/0.png` },
      { id: 106, name: "Samba",           provider: "JILI", img: `${CDN}/game/OM/g/JL/3/216/0.png` },
      { id: 107, name: "Dragon Treasure", provider: "JILI", img: `${CDN}/game/OM/g/JL/3/217/0.png` },
      { id: 108, name: "Golden Empire",   provider: "JILI", img: `${CDN}/game/OM/g/JL/3/223/0.png` },
      { id: 109, name: "Crazy FaFaFa",    provider: "JILI", img: `${CDN}/game/OM/g/JL/3/224/0.png` },
      { id: 110, name: "Money Coming",    provider: "JILI", img: `${CDN}/game/OM/g/JL/3/225/0.png` },
      { id: 111, name: "Wild Ace",        provider: "JILI", img: `${CDN}/game/OM/g/JL/3/226/0.png` },
      { id: 112, name: "Charge Buffalo",  provider: "JILI", img: `${CDN}/game/OM/g/JL/3/228/0.png` },
      { id: 113, name: "RomaX",           provider: "JILI", img: `${CDN}/game/OM/g/JL/3/229/0.png` },
      { id: 114, name: "Jungle King",     provider: "JILI", img: `${CDN}/game/OM/g/JL/3/230/0.png` },
      { id: 115, name: "Fortune Tree",    provider: "JILI", img: `${CDN}/game/OM/g/JL/3/232/0.png` },
    ],
  },
  pg: {
    label: "PG", sub: "SLOT",
    games: [
      { id: 201, name: "Ways of the Qilin",        provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31047/0.png` },
      { id: 202, name: "Rise of Apollo",            provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31048/0.png` },
      { id: 203, name: "Ganesha Fortune",           provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31042/0.png` },
      { id: 204, name: "Egypt's Book of Mystery",   provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31040/0.png` },
      { id: 205, name: "Double Happiness",          provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31033/0.png` },
      { id: 206, name: "Phoenix Rises",             provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31031/0.png` },
      { id: 207, name: "Mahjong Ways",              provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31030/0.png` },
      { id: 208, name: "Lucky Neko",                provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31026/0.png` },
      { id: 209, name: "Treasures of Aztec",        provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31007/0.png` },
      { id: 210, name: "Candy Burst",               provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31009/0.png` },
      { id: 211, name: "Dragon Tiger Luck",         provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31010/0.png` },
      { id: 212, name: "Prosperity Fortune Tree",   provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31011/0.png` },
      { id: 213, name: "Gem Saviour Sword",         provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31012/0.png` },
      { id: 214, name: "Shaolin Soccer",            provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31013/0.png` },
      { id: 215, name: "Hood vs Wolf",              provider: "PG", img: `${CDN}/game/OM/g/PGC/3/31014/0.png` },
    ],
  },
  wg: {
    label: "WG", sub: "SLOT",
    games: [
      { id: 301, name: "Fortune Ox",        provider: "WG", img: `${CDN}/game/OM/g/WG/3/41015/0.png` },
      { id: 302, name: "Dragon Hatch",      provider: "WG", img: `${CDN}/game/OM/g/WG/3/41003/0.png` },
      { id: 303, name: "Queen of Bounty",   provider: "WG", img: `${CDN}/game/OM/g/WG/3/41004/0.png` },
      { id: 304, name: "Galactic Gems",     provider: "WG", img: `${CDN}/game/OM/g/WG/3/41005/0.png` },
      { id: 305, name: "Piggy Gold",        provider: "WG", img: `${CDN}/game/OM/g/WG/3/41007/0.png` },
      { id: 306, name: "Leprechaun Riches", provider: "WG", img: `${CDN}/game/OM/g/WG/3/41010/0.png` },
      { id: 307, name: "Wild Fireworks",    provider: "WG", img: `${CDN}/game/OM/g/WG/3/41012/0.png` },
      { id: 308, name: "Buffalo Win",       provider: "WG", img: `${CDN}/game/OM/g/WG/3/41016/0.png` },
      { id: 309, name: "Golden Dragon",     provider: "WG", img: `${CDN}/game/OM/g/WG/3/41020/0.png` },
      { id: 310, name: "Jungle Delight",    provider: "WG", img: `${CDN}/game/OM/g/WG/3/41023/0.png` },
      { id: 311, name: "Aztec Temple",      provider: "WG", img: `${CDN}/game/OM/g/WG/3/41025/0.png` },
      { id: 312, name: "Ocean Riches",      provider: "WG", img: `${CDN}/game/OM/g/WG/3/41034/0.png` },
      { id: 313, name: "Lucky Zodiac",      provider: "WG", img: `${CDN}/game/OM/g/WG/3/41035/0.png` },
      { id: 314, name: "Panda's Fortune",   provider: "WG", img: `${CDN}/game/OM/g/WG/3/41037/0.png` },
      { id: 315, name: "Gem Queen",         provider: "WG", img: `${CDN}/game/OM/g/WG/3/41038/0.png` },
    ],
  },
  fc: {
    label: "FC", sub: "SLOT",
    games: [
      { id: 401, name: "Caishen Wins",  provider: "FC", img: `${CDN}/game/OM/g/NJL/3/31226/0.png` },
      { id: 402, name: "Dragon Gold",   provider: "FC", img: `${CDN}/game/OM/g/NJL/3/31219/0.png` },
      { id: 403, name: "Money Cat",     provider: "FC", img: `${CDN}/game/OM/g/NJL/3/31262/0.png` },
      { id: 404, name: "Tiger Fortune", provider: "FC", img: `${CDN}/game/OM/g/NJL/3/31201/0.png` },
      { id: 405, name: "Jade Emperor",  provider: "FC", img: `${CDN}/game/OM/g/NJL/3/31202/0.png` },
      { id: 406, name: "Phoenix Queen", provider: "FC", img: `${CDN}/game/OM/g/NJL/3/31203/0.png` },
      { id: 407, name: "Lucky Koi",     provider: "FC", img: `${CDN}/game/OM/g/NJL/3/31204/0.png` },
      { id: 408, name: "Neko Fortune",  provider: "FC", img: `${CDN}/game/OM/g/NJL/3/31205/0.png` },
      { id: 409, name: "Dragon Pearl",  provider: "FC", img: `${CDN}/game/OM/g/NJL/3/31206/0.png` },
      { id: 410, name: "Golden Toad",   provider: "FC", img: `${CDN}/game/OM/g/NJL/3/31207/0.png` },
      { id: 411, name: "Royal Court",   provider: "FC", img: `${CDN}/game/OM/g/NJL/3/31208/0.png` },
      { id: 412, name: "Mystic Gems",   provider: "FC", img: `${CDN}/game/OM/g/NJL/3/31209/0.png` },
      { id: 413, name: "Fortune Lion",  provider: "FC", img: `${CDN}/game/OM/g/NJL/3/31210/0.png` },
      { id: 414, name: "Star Harvest",  provider: "FC", img: `${CDN}/game/OM/g/NJL/3/31211/0.png` },
      { id: 415, name: "Golden Palace", provider: "FC", img: `${CDN}/game/OM/g/NJL/3/31214/0.png` },
    ],
  },
  jdb: {
    label: "JDB", sub: "SLOT",
    games: [
      { id: 501, name: "Monkey King",     provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1404100/0.png` },
      { id: 502, name: "Sea Emperor",     provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1404200/0.png` },
      { id: 503, name: "Lucky 777",       provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1404300/0.png` },
      { id: 504, name: "Fishing Master",  provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1404400/0.png` },
      { id: 505, name: "JDB Treasure",    provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1404500/0.png` },
      { id: 506, name: "Golden Dragon",   provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1404600/0.png` },
      { id: 507, name: "Magic Lamp",      provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1404700/0.png` },
      { id: 508, name: "Fortune God",     provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1404800/0.png` },
      { id: 509, name: "Dragon Palace",   provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1405000/0.png` },
      { id: 510, name: "Wild Safari",     provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1405100/0.png` },
      { id: 511, name: "Rooster Warrior", provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1405200/0.png` },
      { id: 512, name: "Happy Rich Year", provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1403300/0.png` },
      { id: 513, name: "Dragon Ball",     provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1403400/0.png` },
      { id: 514, name: "Tiger Warrior",   provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1403500/0.png` },
      { id: 515, name: "Treasure Hunt",   provider: "JDB", img: `${CDN}/game/OM/g/JDB/3/1403600/0.png` },
    ],
  },
  pp: {
    label: "PP", sub: "SLOT",
    games: [
      { id: 601, name: "Sweet Bonanza",      provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs20pbonanza/0.png` },
      { id: 602, name: "Starlight Princess", provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs20starlightx/0.png` },
      { id: 603, name: "Big Bass Bonanza",   provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs10txbigbass/0.png` },
      { id: 604, name: "Dog House Megaways", provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs20doghouse/0.png` },
      { id: 605, name: "Fruit Party",        provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs20fruitparty/0.png` },
      { id: 606, name: "Zeus vs Hades",      provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs15godsofwar/0.png` },
      { id: 607, name: "Lucky Tiger",        provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs5luckytig/0.png` },
      { id: 608, name: "Pyramid Bonanza",    provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs25pyramid/0.png` },
      { id: 609, name: "Cleopatra's Gold",   provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs40cleoeye/0.png` },
      { id: 610, name: "Wild Bandito",       provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs25wildies/0.png` },
      { id: 611, name: "Mahjong Wins Bonus", provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs1024mjwinbns/0.png` },
      { id: 612, name: "Rainbow Gold",       provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs20rainbowrsh/0.png` },
      { id: 613, name: "Gold Fish",          provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs10goldfish/0.png` },
      { id: 614, name: "Sugar Rush",         provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs20sugarrush/0.png` },
      { id: 615, name: "Fruit Party 2",      provider: "PP", img: `${CDN}/game/OM/g/PP/3/vs20fruitswx/0.png` },
    ],
  },
};

interface Game { id: number; name: string; provider: string; img: string; }

/* ── Jackpot Counter ─────────────────────────────────────────── */
function useJackpot(start = 621100219) {
  const [val, setVal] = useState(start);
  useEffect(() => {
    const t = setInterval(() => setVal(v => v + Math.floor(Math.random() * 280 + 70)), 1400);
    return () => clearInterval(t);
  }, []);
  return val.toLocaleString("vi-VN");
}

/* ── Ticker ─────────────────────────────────────────────────── */
const TICKER_TEXT =
  "🎉 Chúc mừng bạn đến với HUYNH THUONG Casino! Nạp lần đầu nhận 150% thưởng lên đến 5,000,000 VND. Mừng ngày khai trương sòng bài & nhận ngay ưu đãi đặc biệt. Chúc các bạn chơi game vui vẻ và may mắn! ⭐⭐⭐";

/* ── Quick Actions ───────────────────────────────────────────── */
const quickActions = [
  { icon: "🏆", label: "Nạp tiền",  href: "/deposit",    bg: "from-yellow-500/20 to-yellow-600/10", border: "border-yellow-500/30" },
  { icon: "💸", label: "Rút tiền",  href: "/withdrawal", bg: "from-green-500/20 to-green-600/10",  border: "border-green-500/30" },
  { icon: "🎁", label: "Khuyến mãi", href: "/promotions", bg: "from-purple-500/20 to-purple-600/10", border: "border-purple-500/30" },
  { icon: "👑", label: "VIP",        href: "/profile",    bg: "from-red-500/20 to-red-600/10",    border: "border-red-500/30" },
];

export default function Home() {
  const jackpot = useJackpot();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: false });
  const [activeSlide, setActiveSlide] = useState(0);
  const [currentHall, setCurrentHall] = useState("jili");
  const [showFav, setShowFav] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set([101, 203, 301, 501, 601]));

  /* auto-play carousel */
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setActiveSlide(emblaApi.selectedScrollSnap()));
    const t = setInterval(() => emblaApi.scrollNext(), 3500);
    return () => clearInterval(t);
  }, [emblaApi]);

  const toggleFav = (id: number) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const games: Game[] = showFav
    ? Object.values(HALLS).flatMap(h => h.games).filter(g => favorites.has(g.id))
    : HALLS[currentHall].games;

  const hallTitle = showFav ? "YÊU THÍCH" : `${HALLS[currentHall].label} ${HALLS[currentHall].sub}`;

  return (
    <Layout>
      {/* ── BANNER ─────────────────────────────────────────────── */}
      <div className="relative" ref={emblaRef} style={{ overflow: "hidden" }}>
        <div className="flex">
          {banners.map((src, i) => (
            <div key={i} className="flex-none w-full">
              <img
                src={src}
                alt={`Banner ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                style={{ width: "100%", aspectRatio: "21/9", objectFit: "cover", display: "block" }}
                onError={e => (e.currentTarget.style.display = "none")}
              />
            </div>
          ))}
        </div>
        {/* dots */}
        <div style={{ display: "flex", gap: 4, justifyContent: "center", padding: "6px 0 4px" }}>
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              style={{
                height: 5, borderRadius: 3, border: "none", cursor: "pointer",
                background: i === activeSlide ? "#C9A84C" : "rgba(255,255,255,0.2)",
                width: i === activeSlide ? 18 : 6,
                transition: "all 0.25s",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* ── TICKER ─────────────────────────────────────────────── */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        background: "rgba(201,168,76,0.06)",
        borderTop: "1px solid rgba(201,168,76,0.15)",
        borderBottom: "1px solid rgba(201,168,76,0.15)",
        padding: "6px 10px", overflow: "hidden",
      }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="#C9A84C" style={{ flexShrink: 0 }}>
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
        </svg>
        <div className="ticker-wrap" style={{ flex: 1 }}>
          <span className="ticker-content" style={{ fontSize: 11, color: "#E0C97A" }}>{TICKER_TEXT}</span>
        </div>
      </div>

      {/* ── JACKPOT ────────────────────────────────────────────── */}
      <div style={{ padding: "10px 10px 0" }}>
        <div style={{
          borderRadius: 12, padding: "14px 0",
          background: "linear-gradient(135deg, #0D0D1A 0%, #1A1A2E 50%, #0D0D1A 100%)",
          border: "1px solid rgba(201,168,76,0.25)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
          boxShadow: "0 0 30px rgba(201,168,76,0.08) inset",
        }}>
          <span style={{ fontSize: 10, color: "#C9A84C", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" }}>
            🔥 JACKPOT POOL
          </span>
          <span className="jackpot-num" style={{ fontSize: 36 }}>{jackpot}</span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>VND</span>
        </div>
      </div>

      {/* ── QUICK ACTIONS ──────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, padding: "10px 10px 0" }}>
        {quickActions.map(a => (
          <Link key={a.href} href={a.href}>
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: 5, padding: "10px 6px", borderRadius: 10, cursor: "pointer",
              background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.12)",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(201,168,76,0.12)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(201,168,76,0.05)")}
            >
              <span style={{ fontSize: 22 }}>{a.icon}</span>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", fontWeight: 600, textAlign: "center", lineHeight: 1.2 }}>
                {a.label}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* ── HALL TABS ──────────────────────────────────────────── */}
      <div style={{
        display: "flex", overflowX: "auto", scrollbarWidth: "none",
        borderBottom: "1px solid rgba(201,168,76,0.15)",
        background: "#0D0D1A", marginTop: 10,
        position: "sticky", top: 0, zIndex: 20,
      }} className="no-scrollbar">
        {Object.entries(HALLS).map(([key, hall]) => {
          const active = !showFav && currentHall === key;
          return (
            <button
              key={key}
              onClick={() => { setShowFav(false); setCurrentHall(key); }}
              style={{
                flex: "0 0 auto", minWidth: 58, padding: "10px 14px 7px",
                background: "none", border: "none", cursor: "pointer",
                borderBottom: `2px solid ${active ? "#C9A84C" : "transparent"}`,
                marginBottom: -1, transition: "border-color 0.15s",
              }}
            >
              <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 14, fontWeight: 700, color: active ? "#C9A84C" : "rgba(255,255,255,0.4)", letterSpacing: "0.05em" }}>
                {hall.label}
              </div>
              <div style={{ fontSize: 9, color: active ? "rgba(201,168,76,0.6)" : "rgba(255,255,255,0.2)", fontWeight: 400 }}>
                {hall.sub}
              </div>
            </button>
          );
        })}
        {/* Favorites */}
        <button
          onClick={() => setShowFav(true)}
          style={{
            flex: "0 0 auto", minWidth: 46, padding: "10px 10px 7px",
            marginLeft: "auto", background: "none", border: "none", cursor: "pointer",
            borderBottom: `2px solid ${showFav ? "#C9A84C" : "transparent"}`,
            marginBottom: -1, transition: "border-color 0.15s",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 1,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={showFav ? "#C9A84C" : "rgba(255,255,255,0.35)"}>
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <div style={{ fontSize: 9, color: showFav ? "rgba(201,168,76,0.6)" : "rgba(255,255,255,0.2)", fontWeight: 400 }}>
            YÊU THÍCH
          </div>
        </button>
      </div>

      {/* ── SECTION HEADER ─────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px 4px" }}>
        <div style={{ width: 3, height: 16, background: "linear-gradient(#C9A84C, #F5D787)", borderRadius: 2 }} />
        <span style={{ fontFamily: "'Oswald',sans-serif", color: "#C9A84C", fontSize: 15, fontWeight: 700, letterSpacing: "0.05em" }}>
          {hallTitle}
        </span>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginLeft: 2 }}>
          {games.length} trò chơi
        </span>
      </div>

      {/* ── GAME GRID ──────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, padding: "0 8px 20px" }}>
        {games.length === 0 ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "48px 0", color: "rgba(201,168,76,0.35)", fontSize: 13 }}>
            Chưa có game nào trong danh sách yêu thích
          </div>
        ) : (
          games.map(g => (
            <GameCard key={g.id} game={g} isFav={favorites.has(g.id)} onToggleFav={toggleFav} />
          ))
        )}
      </div>
    </Layout>
  );
}

/* ── Game Card ───────────────────────────────────────────────── */
function GameCard({ game, isFav, onToggleFav }: { game: Game; isFav: boolean; onToggleFav: (id: number) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="game-card"
      style={{ borderColor: hovered ? "rgba(201,168,76,0.5)" : "rgba(201,168,76,0.08)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => alert(`Đăng nhập để chơi ${game.name}`)}
    >
      <img
        src={game.img}
        alt={game.name}
        loading="lazy"
        onError={e => {
          e.currentTarget.src = `https://placehold.co/200x267/1A1A2E/C9A84C?text=${encodeURIComponent(game.name)}`;
        }}
      />
      {/* Provider badge */}
      <div style={{
        position: "absolute", top: 4, left: 4,
        background: "rgba(201,168,76,0.9)", color: "#0D0D1A",
        fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 3, lineHeight: "14px",
      }}>
        {game.provider}
      </div>
      {/* Fav button */}
      <button
        onClick={e => { e.stopPropagation(); onToggleFav(game.id); }}
        style={{ position: "absolute", top: 4, right: 4, background: "none", border: "none", cursor: "pointer", padding: 2 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill={isFav ? "#C9A84C" : "rgba(255,255,255,0.4)"}>
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      </button>
      {/* Name overlay */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "linear-gradient(transparent, rgba(0,0,0,0.88))",
        color: "#fff", fontSize: 10, fontWeight: 500,
        textAlign: "center", padding: "14px 4px 5px", lineHeight: 1.2,
      }}>
        {game.name}
      </div>
      {/* Play overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: hovered ? "rgba(0,0,0,0.42)" : "rgba(0,0,0,0)",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: hovered ? 1 : 0, transition: "all 0.2s",
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: "50%",
          background: "rgba(201,168,76,0.92)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 18px rgba(201,168,76,0.6)",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#0D0D1A"><path d="M8 5v14l11-7z" /></svg>
        </div>
      </div>
    </div>
  );
}
