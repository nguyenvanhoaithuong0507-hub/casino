import React, { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Link } from "wouter";
import { toast } from "sonner";

const VIP_LEVELS = [
  { level: 0, name: "Thành viên",   emoji: "⚪", color: "#9ca3af", min: 0 },
  { level: 1, name: "Bạc",          emoji: "🥈", color: "#94a3b8", min: 5_000_000 },
  { level: 2, name: "Vàng",         emoji: "🥇", color: "#C9A84C", min: 10_000_000 },
  { level: 3, name: "Bạch Kim",     emoji: "💠", color: "#7dd3fc", min: 50_000_000 },
  { level: 4, name: "Kim Cương",    emoji: "💎", color: "#a78bfa", min: 100_000_000 },
];

const menuItems = [
  { emoji: "🔐", label: "Đổi mật khẩu",    href: "#" },
  { emoji: "🏦", label: "Tài khoản ngân hàng", href: "#" },
  { emoji: "📋", label: "Lịch sử giao dịch",  href: "/history" },
  { emoji: "💬", label: "Hỗ trợ khách hàng",  href: "#" },
  { emoji: "❓", label: "Câu hỏi thường gặp",  href: "#" },
  { emoji: "ℹ️",  label: "Giới thiệu",          href: "#" },
];

const mockUser = {
  username: "user123456",
  email: "user@example.com",
  phone: "0988888888",
  balance: 5_234_550,
  totalDeposited: 15_000_000,
  joinedDate: "15/01/2024",
  vipLevel: 2,
};

export default function Profile() {
  const [user, setUser]       = useState(mockUser);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ email: user.email, phone: user.phone });
  const [copied, setCopied]   = useState(false);

  const currentVip  = VIP_LEVELS[user.vipLevel];
  const nextVip     = VIP_LEVELS[Math.min(user.vipLevel + 1, VIP_LEVELS.length - 1)];
  const progress    = user.vipLevel >= VIP_LEVELS.length - 1
    ? 100
    : Math.min(100, (user.totalDeposited / nextVip.min) * 100);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Đã sao chép!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!editForm.email || !editForm.phone) { toast.error("Vui lòng điền đầy đủ thông tin"); return; }
    setUser({ ...user, ...editForm });
    setEditMode(false);
    toast.success("Cập nhật thành công!");
  };

  return (
    <Layout>
      {/* Page header */}
      <div style={{ padding: "14px 14px 10px", borderBottom: "1px solid rgba(201,168,76,0.12)", background: "#0D0D1A" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 3, height: 20, background: "linear-gradient(#C9A84C,#F5D787)", borderRadius: 2 }} />
          <h1 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 20, fontWeight: 700, color: "#C9A84C", margin: 0, letterSpacing: "0.05em" }}>
            TÀI KHOẢN
          </h1>
        </div>
      </div>

      <div style={{ padding: "14px 12px 24px", display: "flex", flexDirection: "column", gap: 12 }}>

        {/* Avatar + balance card */}
        <div style={{
          background: "linear-gradient(135deg,#1A1A2E 0%,#0D0D1A 100%)",
          border: "1px solid rgba(201,168,76,0.2)", borderRadius: 14, padding: "16px 14px",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", right: -20, top: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(201,168,76,0.05)", filter: "blur(20px)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{
              width: 54, height: 54, borderRadius: "50%",
              background: "linear-gradient(135deg,#1A1A2E,#0D0D1A)",
              border: "2px solid rgba(201,168,76,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, flexShrink: 0,
            }}>
              {currentVip.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 16, fontWeight: 700, color: "#fff" }}>
                  {user.username}
                </span>
                <button onClick={() => handleCopy(user.username)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: copied ? "#2EC97C" : "rgba(255,255,255,0.3)" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                </button>
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 3, background: `${currentVip.color}22`, border: `1px solid ${currentVip.color}55`, borderRadius: 20, padding: "2px 8px" }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: currentVip.color }}>{currentVip.name}</span>
              </div>
            </div>
          </div>

          {/* Balance row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>Số dư</div>
              <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 16, fontWeight: 700, color: "#C9A84C" }}>
                {user.balance.toLocaleString("vi-VN")} ₫
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>Ngày tham gia</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{user.joinedDate}</div>
            </div>
          </div>
        </div>

        {/* VIP Progress */}
        <div style={{ background: "#13131F", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 12, padding: "12px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>Tiến độ VIP</span>
            {user.vipLevel < VIP_LEVELS.length - 1 && (
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                Cần {(nextVip.min - user.totalDeposited).toLocaleString("vi-VN")} ₫ để lên {nextVip.name}
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
            {VIP_LEVELS.map(v => (
              <div key={v.level} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <div style={{
                  width: "100%", height: 4, borderRadius: 2,
                  background: user.vipLevel >= v.level ? v.color : "rgba(255,255,255,0.1)",
                  transition: "background 0.3s",
                }} />
                <span style={{ fontSize: 8, color: user.vipLevel === v.level ? v.color : "rgba(255,255,255,0.3)", fontWeight: 700 }}>
                  {v.emoji}
                </span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
            Tổng nạp: <span style={{ color: "#C9A84C", fontWeight: 700 }}>{user.totalDeposited.toLocaleString("vi-VN")} ₫</span>
          </div>
        </div>

        {/* Account info */}
        <div style={{ background: "#13131F", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Thông tin tài khoản</span>
            <button
              onClick={() => editMode ? handleSave() : setEditMode(true)}
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: "#C9A84C", fontSize: 12, fontWeight: 700 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              {editMode ? "LƯU" : "SỬA"}
            </button>
          </div>
          {[
            { label: "Email", value: user.email, editKey: "email" as const, type: "email" },
            { label: "Điện thoại", value: user.phone, editKey: "phone" as const, type: "tel" },
          ].map(row => (
            <div key={row.label} style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 3 }}>{row.label}</div>
              {editMode ? (
                <input
                  type={row.type}
                  value={editForm[row.editKey]}
                  onChange={e => setEditForm({ ...editForm, [row.editKey]: e.target.value })}
                  style={{ width: "100%", height: 36, borderRadius: 8, background: "#0D0D1A", border: "1px solid rgba(201,168,76,0.3)", color: "#fff", padding: "0 10px", fontSize: 13, outline: "none", boxSizing: "border-box" }}
                />
              ) : (
                <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{row.value}</span>
              )}
            </div>
          ))}
          {editMode && (
            <div style={{ padding: "8px 14px" }}>
              <button onClick={() => setEditMode(false)}
                style={{ width: "100%", height: 38, borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>
                HỦY
              </button>
            </div>
          )}
        </div>

        {/* Quick action buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <Link href="/deposit">
            <button style={{ width: "100%", height: 46, borderRadius: 10, background: "linear-gradient(135deg,#C9A84C,#F5D787)", border: "none", cursor: "pointer", fontFamily: "'Oswald',sans-serif", fontSize: 14, fontWeight: 700, color: "#0D0D1A" }}>
              NẠP TIỀN
            </button>
          </Link>
          <Link href="/withdrawal">
            <button style={{ width: "100%", height: 46, borderRadius: 10, background: "rgba(46,201,124,0.1)", border: "1px solid rgba(46,201,124,0.3)", cursor: "pointer", fontFamily: "'Oswald',sans-serif", fontSize: 14, fontWeight: 700, color: "#2EC97C" }}>
              RÚT TIỀN
            </button>
          </Link>
        </div>

        {/* Menu items */}
        <div style={{ background: "#13131F", border: "1px solid rgba(201,168,76,0.12)", borderRadius: 12, overflow: "hidden" }}>
          {menuItems.map((item, i) => (
            <Link key={i} href={item.href}>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "13px 14px",
                borderBottom: i < menuItems.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                cursor: "pointer",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{item.emoji}</span>
                  <span style={{ fontSize: 13, color: "#fff" }}>{item.label}</span>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={() => toast.info("Đã đăng xuất")}
          style={{ width: "100%", height: 46, borderRadius: 10, background: "rgba(192,39,45,0.08)", border: "1px solid rgba(192,39,45,0.25)", cursor: "pointer", fontSize: 14, fontWeight: 700, color: "#E85D5D" }}
        >
          ĐĂNG XUẤT
        </button>
      </div>
    </Layout>
  );
}
