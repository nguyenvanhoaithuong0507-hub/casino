import React, { useState } from "react";
import { Layout } from "@/components/layout/layout";

type TxType = "all" | "deposit" | "withdrawal" | "win" | "bet";

interface Transaction {
  id: number;
  type: "deposit" | "withdrawal" | "win" | "bet";
  amount: number;
  game?: string;
  method?: string;
  status: "success" | "pending" | "failed";
  time: string;
  date: string;
}

const mockTx: Transaction[] = [
  { id: 1,  type: "deposit",    amount:  500000,  method: "Vietcombank",     status: "success", time: "14:32", date: "Hôm nay" },
  { id: 2,  type: "win",        amount:  320000,  game: "Fortune Gems",      status: "success", time: "13:15", date: "Hôm nay" },
  { id: 3,  type: "bet",        amount: -150000,  game: "Super Ace",         status: "success", time: "13:10", date: "Hôm nay" },
  { id: 4,  type: "withdrawal", amount: -300000,  method: "MB Bank",         status: "pending", time: "11:47", date: "Hôm nay" },
  { id: 5,  type: "win",        amount:  875000,  game: "Dragon Treasure",   status: "success", time: "22:05", date: "Hôm qua" },
  { id: 6,  type: "bet",        amount: -200000,  game: "Lucky Neko",        status: "success", time: "21:58", date: "Hôm qua" },
  { id: 7,  type: "deposit",    amount: 1000000,  method: "MoMo",            status: "success", time: "20:10", date: "Hôm qua" },
  { id: 8,  type: "bet",        amount: -500000,  game: "Sweet Bonanza",     status: "success", time: "19:32", date: "Hôm qua" },
  { id: 9,  type: "win",        amount: 1250000,  game: "Mahjong Ways",      status: "success", time: "18:44", date: "Hôm qua" },
  { id: 10, type: "withdrawal", amount: -800000,  method: "Techcombank",     status: "success", time: "10:20", date: "02/08" },
  { id: 11, type: "deposit",    amount: 2000000,  method: "Vietcombank",     status: "success", time: "09:05", date: "02/08" },
  { id: 12, type: "bet",        amount: -1000000, game: "Big Bass Bonanza",  status: "success", time: "08:30", date: "02/08" },
  { id: 13, type: "win",        amount: 3500000,  game: "Zeus vs Hades",     status: "success", time: "08:25", date: "02/08" },
  { id: 14, type: "deposit",    amount:  500000,  method: "ZaloPay",         status: "failed",  time: "16:00", date: "01/08" },
  { id: 15, type: "bet",        amount: -250000,  game: "Starlight Princess",status: "success", time: "15:42", date: "01/08" },
];

const TABS: { key: TxType; label: string; emoji: string }[] = [
  { key: "all",        label: "Tất cả",    emoji: "📋" },
  { key: "deposit",    label: "Nạp tiền",  emoji: "💰" },
  { key: "withdrawal", label: "Rút tiền",  emoji: "💸" },
  { key: "win",        label: "Thắng",     emoji: "🏆" },
  { key: "bet",        label: "Cược",      emoji: "🎰" },
];

const TYPE_META: Record<Transaction["type"], { label: string; color: string; bgColor: string; emoji: string }> = {
  deposit:    { label: "Nạp tiền",  color: "#2EC97C", bgColor: "rgba(46,201,124,0.1)",  emoji: "💰" },
  withdrawal: { label: "Rút tiền",  color: "#E85D5D", bgColor: "rgba(232,93,93,0.1)",   emoji: "💸" },
  win:        { label: "Thắng",     color: "#C9A84C", bgColor: "rgba(201,168,76,0.1)",  emoji: "🏆" },
  bet:        { label: "Cược",      color: "#9ca3af", bgColor: "rgba(156,163,175,0.08)", emoji: "🎰" },
};

const STATUS_META: Record<Transaction["status"], { label: string; color: string }> = {
  success: { label: "Thành công", color: "#2EC97C" },
  pending: { label: "Đang xử lý", color: "#f59e0b" },
  failed:  { label: "Thất bại",   color: "#E85D5D" },
};

export default function History() {
  const [activeTab, setActiveTab] = useState<TxType>("all");

  const filtered = activeTab === "all" ? mockTx : mockTx.filter(t => t.type === activeTab);

  const stats = {
    totalDeposit:    mockTx.filter(t => t.type === "deposit"    && t.status === "success").reduce((s, t) => s + t.amount, 0),
    totalWithdrawal: mockTx.filter(t => t.type === "withdrawal" && t.status === "success").reduce((s, t) => s + Math.abs(t.amount), 0),
    totalWin:        mockTx.filter(t => t.type === "win").reduce((s, t) => s + t.amount, 0),
    totalBet:        mockTx.filter(t => t.type === "bet").reduce((s, t) => s + Math.abs(t.amount), 0),
  };

  // Group by date
  const grouped: Record<string, Transaction[]> = {};
  for (const tx of filtered) {
    if (!grouped[tx.date]) grouped[tx.date] = [];
    grouped[tx.date].push(tx);
  }

  return (
    <Layout>
      {/* Page header */}
      <div style={{ padding: "14px 14px 10px", borderBottom: "1px solid rgba(201,168,76,0.12)", background: "#0D0D1A" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 3, height: 20, background: "linear-gradient(#C9A84C,#F5D787)", borderRadius: 2 }} />
          <h1 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 20, fontWeight: 700, color: "#C9A84C", margin: 0, letterSpacing: "0.05em" }}>
            LỊCH SỬ
          </h1>
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: "2px 0 0 11px" }}>Lịch sử giao dịch & cược</p>
      </div>

      {/* Stats summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, padding: "10px 10px 0" }}>
        {[
          { label: "Tổng nạp",  value: stats.totalDeposit,    color: "#2EC97C" },
          { label: "Tổng rút",  value: stats.totalWithdrawal, color: "#E85D5D" },
          { label: "Tổng thắng",value: stats.totalWin,        color: "#C9A84C" },
          { label: "Tổng cược", value: stats.totalBet,        color: "#9ca3af" },
        ].map(s => (
          <div key={s.label} style={{ background: "#13131F", border: `1px solid ${s.color}22`, borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: s.color, fontFamily: "'Oswald',sans-serif" }}>
              {s.value.toLocaleString("vi-VN")} ₫
            </div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{
        display: "flex", overflowX: "auto", scrollbarWidth: "none",
        padding: "10px 10px 0", gap: 6,
      }} className="no-scrollbar">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              flex: "0 0 auto", height: 34, padding: "0 12px",
              borderRadius: 20, cursor: "pointer",
              background: activeTab === tab.key ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${activeTab === tab.key ? "#C9A84C" : "rgba(255,255,255,0.08)"}`,
              fontSize: 12, fontWeight: 600,
              color: activeTab === tab.key ? "#C9A84C" : "rgba(255,255,255,0.5)",
              display: "flex", alignItems: "center", gap: 5,
              transition: "all 0.15s",
            }}
          >
            <span style={{ fontSize: 14 }}>{tab.emoji}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Transaction list grouped by date */}
      <div style={{ padding: "10px 10px 24px" }}>
        {Object.entries(grouped).length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: "rgba(201,168,76,0.3)", fontSize: 13 }}>
            Không có giao dịch nào
          </div>
        ) : (
          Object.entries(grouped).map(([date, txs]) => (
            <div key={date} style={{ marginBottom: 14 }}>
              {/* Date label */}
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 700, letterSpacing: "0.06em", marginBottom: 6, paddingLeft: 2, textTransform: "uppercase" }}>
                {date}
              </div>
              {/* Transactions */}
              <div style={{ background: "#13131F", border: "1px solid rgba(201,168,76,0.1)", borderRadius: 12, overflow: "hidden" }}>
                {txs.map((tx, i) => {
                  const meta   = TYPE_META[tx.type];
                  const status = STATUS_META[tx.status];
                  const isPositive = tx.amount > 0;
                  return (
                    <div
                      key={tx.id}
                      style={{
                        display: "flex", alignItems: "center", gap: 10, padding: "11px 12px",
                        borderBottom: i < txs.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                      }}
                    >
                      {/* Icon */}
                      <div style={{
                        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                        background: meta.bgColor,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 18,
                      }}>
                        {meta.emoji}
                      </div>
                      {/* Details */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>
                            {meta.label}
                          </span>
                          <span style={{ fontSize: 9, fontWeight: 700, color: status.color, background: `${status.color}18`, borderRadius: 4, padding: "1px 5px" }}>
                            {status.label}
                          </span>
                        </div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {tx.game || tx.method || ""} · {tx.time}
                        </div>
                      </div>
                      {/* Amount */}
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: isPositive ? "#2EC97C" : "rgba(255,255,255,0.7)", fontFamily: "'Oswald',sans-serif" }}>
                          {isPositive ? "+" : ""}{tx.amount.toLocaleString("vi-VN")}
                        </div>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>VND</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
