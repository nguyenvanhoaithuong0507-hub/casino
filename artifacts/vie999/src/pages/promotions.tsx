import React, { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { motion, AnimatePresence } from "framer-motion";

interface Promo {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  desc: string;
  terms: string[];
  highlight: string;
  gradient: string;
  type: "hot" | "new" | "vip" | "daily" | "weekly";
  date: string;
  emoji: string;
}

const promotions: Promo[] = [
  {
    id: 1,
    badge: "HOT",
    emoji: "🔥",
    title: "Chào mừng tân thủ",
    subtitle: "Tặng 150% lần nạp đầu",
    desc: "Nạp lần đầu nhận ngay 150% thưởng, tối đa 5,000,000 VND. Áp dụng cho tất cả thành viên mới.",
    highlight: "Tối đa 5,000,000 ₫",
    gradient: "linear-gradient(135deg, #C9A84C 0%, #F5D787 50%, #D4AF37 100%)",
    type: "hot",
    date: "Không giới hạn",
    terms: ["Nạp tối thiểu 100,000 VND", "Hoàn cược x20 trước khi rút", "Áp dụng 1 lần/tài khoản"],
  },
  {
    id: 2,
    badge: "MỚI",
    emoji: "💎",
    title: "Hoàn trả hàng ngày",
    subtitle: "Nhận lại 1.5% mỗi ngày",
    desc: "Mỗi ngày nhận lại 1.5% tổng số tiền cược, không giới hạn số tiền hoàn trả.",
    highlight: "1.5% mỗi ngày",
    gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    type: "new",
    date: "Mỗi ngày",
    terms: ["Tự động tính vào 00:00 mỗi ngày", "Không cần yêu cầu thủ công", "Không giới hạn số tiền"],
  },
  {
    id: 3,
    badge: "VIP",
    emoji: "👑",
    title: "Ưu đãi VIP độc quyền",
    subtitle: "Tặng thưởng theo cấp VIP",
    desc: "Thành viên VIP nhận thưởng sinh nhật, thưởng nạp tiền đặc biệt và hỗ trợ ưu tiên 24/7.",
    highlight: "Tới 5% cashback",
    gradient: "linear-gradient(135deg, #C0272D 0%, #E85D5D 100%)",
    type: "vip",
    date: "Thường xuyên",
    terms: ["Dành riêng cho thành viên VIP", "Lên cấp VIP bằng cách nạp tiền", "Liên hệ CSKH để biết thêm chi tiết"],
  },
  {
    id: 4,
    badge: "HÀNG NGÀY",
    emoji: "☀️",
    title: "Nạp tiền ngày thường",
    subtitle: "Thêm 30% vào Thứ 2–6",
    desc: "Nạp tiền vào các ngày trong tuần (thứ 2 đến thứ 6) nhận thêm 30% thưởng nạp, tối đa 2,000,000 VND.",
    highlight: "Tối đa 2,000,000 ₫",
    gradient: "linear-gradient(135deg, #059669 0%, #34d399 100%)",
    type: "daily",
    date: "Thứ 2 – Thứ 6",
    terms: ["Nạp tối thiểu 200,000 VND", "Hoàn cược x15 trước khi rút", "Tối đa 1 lần/ngày"],
  },
  {
    id: 5,
    badge: "CUỐI TUẦN",
    emoji: "🎊",
    title: "Thứ 7 & Chủ nhật",
    subtitle: "Bonus 20% cuối tuần",
    desc: "Nạp tiền cuối tuần nhận ngay 20% thưởng lên đến 2,000,000 VND. Vui chơi không giới hạn.",
    highlight: "Tối đa 2,000,000 ₫",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
    type: "weekly",
    date: "Thứ 7 & Chủ nhật",
    terms: ["Nạp tối thiểu 200,000 VND", "Hoàn cược x15 trước khi rút", "Tối đa 2 lần/ngày cuối tuần"],
  },
  {
    id: 6,
    badge: "SỰ KIỆN",
    emoji: "🎰",
    title: "Giải đấu Slot tuần",
    subtitle: "Top 10 nhận thưởng lớn",
    desc: "Tham gia giải đấu Slot hàng tuần, top 10 người chơi nhiều nhất sẽ nhận giải thưởng tiền mặt đặc biệt.",
    highlight: "Giải 1: 10,000,000 ₫",
    gradient: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
    type: "weekly",
    date: "Mỗi tuần",
    terms: ["Đặt cược càng nhiều càng có cơ hội", "Kết quả công bố mỗi thứ 2", "Giải thưởng cộng trực tiếp vào ví"],
  },
];

const badgeColors: Record<string, string> = {
  HOT: "#C0272D",
  MỚI: "#6366f1",
  VIP: "#C9A84C",
  "HÀNG NGÀY": "#059669",
  "CUỐI TUẦN": "#f59e0b",
  "SỰ KIỆN": "#ec4899",
};

export default function Promotions() {
  const [selected, setSelected] = useState<Promo | null>(null);

  return (
    <Layout>
      {/* Page header */}
      <div style={{
        padding: "16px 14px 10px",
        borderBottom: "1px solid rgba(201,168,76,0.12)",
        background: "#0D0D1A",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
          <div style={{ width: 3, height: 20, background: "linear-gradient(#C9A84C, #F5D787)", borderRadius: 2 }} />
          <h1 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 20, fontWeight: 700, color: "#C9A84C", margin: 0, letterSpacing: "0.05em" }}>
            KHUYẾN MÃI
          </h1>
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0, paddingLeft: 11 }}>
          Nhiều phần thưởng hấp dẫn đang chờ đón bạn
        </p>
      </div>

      {/* Promo cards */}
      <div style={{ padding: "10px 10px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
        {promotions.map((promo, i) => (
          <motion.div
            key={promo.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            onClick={() => setSelected(promo)}
            style={{
              borderRadius: 14, overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer", position: "relative",
              background: "#13131F",
              boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
            }}
          >
            {/* Banner area */}
            <div style={{
              height: 80, background: promo.gradient,
              display: "flex", alignItems: "center",
              padding: "0 16px", position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", right: -16, top: -20,
                width: 100, height: 100, borderRadius: "50%",
                background: "rgba(255,255,255,0.1)", filter: "blur(10px)",
              }} />
              <div style={{
                position: "absolute", right: 16, bottom: -10,
                width: 60, height: 60, borderRadius: "50%",
                background: "rgba(0,0,0,0.15)",
              }} />
              <span style={{ fontSize: 36, marginRight: 12, flexShrink: 0 }}>{promo.emoji}</span>
              <div>
                <div style={{
                  display: "inline-block", background: "rgba(0,0,0,0.3)",
                  borderRadius: 4, padding: "1px 7px", fontSize: 10,
                  fontWeight: 700, color: "#fff", marginBottom: 3, letterSpacing: "0.06em",
                }}>
                  {promo.badge}
                </div>
                <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 17, fontWeight: 700, color: "#fff", lineHeight: 1.1, textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
                  {promo.title}
                </div>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "10px 14px 12px" }}>
              <div style={{
                fontSize: 13, fontWeight: 700, color: "#F5D787", marginBottom: 4,
              }}>
                {promo.subtitle}
              </div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.5, margin: "0 0 8px" }}>
                {promo.desc}
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{
                  background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)",
                  borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 700, color: "#C9A84C",
                }}>
                  {promo.highlight}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#C9A84C", fontWeight: 600 }}>
                  Chi tiết
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail bottom sheet */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              style={{
                position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)",
                zIndex: 50,
              }}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              style={{
                position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
                width: "100%", maxWidth: 480,
                background: "#13131F", borderRadius: "18px 18px 0 0",
                border: "1px solid rgba(201,168,76,0.2)",
                zIndex: 51, maxHeight: "80vh", overflowY: "auto",
              }}
            >
              {/* Drag handle */}
              <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 0" }}>
                <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.2)" }} />
              </div>

              {/* Banner */}
              <div style={{ height: 90, background: selected.gradient, display: "flex", alignItems: "center", padding: "0 16px", gap: 12, margin: "10px 14px", borderRadius: 12, overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", right: -10, top: -20, width: 90, height: 90, borderRadius: "50%", background: "rgba(255,255,255,0.1)", filter: "blur(8px)" }} />
                <span style={{ fontSize: 40 }}>{selected.emoji}</span>
                <div>
                  <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>
                    {selected.title}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>{selected.subtitle}</div>
                </div>
              </div>

              <div style={{ padding: "0 14px 30px" }}>
                {/* Highlight */}
                <div style={{
                  background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.3)",
                  borderRadius: 10, padding: "10px 14px", marginBottom: 14,
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Phần thưởng</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#C9A84C" }}>{selected.highlight}</span>
                </div>

                {/* Desc */}
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: 14 }}>
                  {selected.desc}
                </p>

                {/* Time */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#C9A84C">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
                  </svg>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Thời gian áp dụng:</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{selected.date}</span>
                </div>

                {/* Terms */}
                <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "12px 14px" }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 8, textTransform: "uppercase" }}>
                    Điều kiện áp dụng
                  </div>
                  {selected.terms.map((t, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#C9A84C", marginTop: 5, flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{t}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    width: "100%", marginTop: 14, height: 48, borderRadius: 10,
                    background: "linear-gradient(135deg, #C9A84C, #F5D787)",
                    border: "none", cursor: "pointer",
                    fontFamily: "'Oswald',sans-serif", fontSize: 16, fontWeight: 700,
                    color: "#0D0D1A", letterSpacing: "0.05em",
                  }}
                >
                  NHẬN NGAY
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Layout>
  );
}
