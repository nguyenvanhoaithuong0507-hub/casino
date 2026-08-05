import React, { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const AMOUNTS = [50000, 100000, 200000, 500000, 1000000, 2000000];

const banks = [
  { id: "vcb",  name: "Vietcombank", short: "VCB", color: "#006633" },
  { id: "acb",  name: "ACB",         short: "ACB", color: "#003087" },
  { id: "mb",   name: "MB Bank",     short: "MB",  color: "#004B87" },
  { id: "tech", name: "Techcombank", short: "TCB", color: "#CC0001" },
  { id: "vpb",  name: "VPBank",      short: "VPB", color: "#006940" },
  { id: "tpb",  name: "TPBank",      short: "TPB", color: "#9B1F5E" },
];

const ewallets = [
  { id: "momo",    name: "MoMo",    emoji: "🟣", color: "#A50064" },
  { id: "zalopay", name: "ZaloPay", emoji: "💙", color: "#0068FF" },
];

export default function Withdrawal() {
  const [amount, setAmount]     = useState("");
  const [method, setMethod]     = useState<"bank" | "ewallet" | null>(null);
  const [selectedBank, setSelectedBank]       = useState("vcb");
  const [selectedEwallet, setSelectedEwallet] = useState("momo");
  const [accountNumber, setAccountNumber]     = useState("");
  const [accountHolder, setAccountHolder]     = useState("");
  const [ewalletPhone, setEwalletPhone]       = useState("");
  const [step, setStep]         = useState<"form" | "confirm">("form");

  const numAmount = Number(amount.replace(/\D/g, ""));
  const bankValid = method === "bank" && accountNumber && accountHolder;
  const ewalletValid = method === "ewallet" && ewalletPhone;
  const valid = numAmount >= 50000 && (bankValid || ewalletValid);

  const handleAmountInput = (v: string) => {
    const num = v.replace(/\D/g, "");
    setAmount(num ? Number(num).toLocaleString("vi-VN") : "");
  };

  const handleSubmit = () => {
    if (!valid) { toast.error("Vui lòng điền đầy đủ thông tin"); return; }
    setStep("confirm");
  };

  const handleConfirm = () => {
    toast.success(`Yêu cầu rút ${numAmount.toLocaleString("vi-VN")} VND đã được gửi! Xử lý trong 5–15 phút.`);
    setAmount(""); setMethod(null); setAccountNumber(""); setAccountHolder(""); setEwalletPhone(""); setStep("form");
  };

  return (
    <Layout>
      {/* Page header */}
      <div style={{ padding: "14px 14px 10px", borderBottom: "1px solid rgba(201,168,76,0.12)", background: "#0D0D1A" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 3, height: 20, background: "linear-gradient(#C9A84C,#F5D787)", borderRadius: 2 }} />
          <h1 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 20, fontWeight: 700, color: "#C9A84C", margin: 0, letterSpacing: "0.05em" }}>
            RÚT TIỀN
          </h1>
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: "2px 0 0 11px" }}>Tối thiểu 50,000 VND · Xử lý 5–15 phút</p>
      </div>

      <div style={{ padding: "14px 12px 24px" }}>
        <AnimatePresence mode="wait">
          {step === "form" ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

              {/* Balance */}
              <div style={{
                background: "linear-gradient(135deg,#1A1A2E,#0D0D1A)",
                border: "1px solid rgba(201,168,76,0.2)", borderRadius: 12,
                padding: 14, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>Số dư khả dụng</div>
                  <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 22, fontWeight: 700, color: "#2EC97C" }}>
                    5,234,550 ₫
                  </div>
                </div>
                <div style={{ fontSize: 28 }}>💸</div>
              </div>

              {/* Amount */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 6, fontWeight: 600 }}>SỐ TIỀN RÚT</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>₫</span>
                  <input
                    type="text" inputMode="numeric" placeholder="Nhập số tiền" value={amount}
                    onChange={e => handleAmountInput(e.target.value)}
                    style={{
                      width: "100%", height: 48, paddingLeft: 30, paddingRight: 12, boxSizing: "border-box",
                      background: "#1A1A2E", border: `1px solid ${numAmount > 0 && numAmount < 50000 ? "#C0272D" : "rgba(201,168,76,0.25)"}`,
                      borderRadius: 10, color: "#fff", fontSize: 15, fontWeight: 600, outline: "none",
                    }}
                  />
                </div>
                {numAmount > 0 && numAmount < 50000 && (
                  <div style={{ fontSize: 11, color: "#E85D5D", marginTop: 4 }}>Số tiền tối thiểu là 50,000 VND</div>
                )}
              </div>

              {/* Quick */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 7, marginBottom: 16 }}>
                {AMOUNTS.map(a => (
                  <button key={a} onClick={() => setAmount(a.toLocaleString("vi-VN"))}
                    style={{
                      height: 36, borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600,
                      background: numAmount === a ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${numAmount === a ? "#C9A84C" : "rgba(255,255,255,0.1)"}`,
                      color: numAmount === a ? "#C9A84C" : "rgba(255,255,255,0.6)", transition: "all 0.15s",
                    }}>
                    {a >= 1000000 ? `${a / 1000000}M` : `${a / 1000}K`}
                  </button>
                ))}
              </div>

              {/* Method */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 8, fontWeight: 600 }}>PHƯƠNG THỨC RÚT</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                  {(["bank", "ewallet"] as const).map(m => (
                    <button key={m} onClick={() => setMethod(m)}
                      style={{
                        height: 50, borderRadius: 10, cursor: "pointer",
                        background: method === m ? "rgba(201,168,76,0.12)" : "rgba(255,255,255,0.04)",
                        border: `1.5px solid ${method === m ? "#C9A84C" : "rgba(255,255,255,0.1)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.15s",
                      }}>
                      <span style={{ fontSize: 20 }}>{m === "bank" ? "🏦" : "📱"}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: method === m ? "#C9A84C" : "rgba(255,255,255,0.6)" }}>
                        {m === "bank" ? "Ngân hàng" : "Ví điện tử"}
                      </span>
                    </button>
                  ))}
                </div>

                {method === "bank" && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 7 }}>
                      {banks.map(b => (
                        <button key={b.id} onClick={() => setSelectedBank(b.id)}
                          style={{
                            height: 44, borderRadius: 8, cursor: "pointer",
                            background: selectedBank === b.id ? `${b.color}22` : "rgba(255,255,255,0.04)",
                            border: `1px solid ${selectedBank === b.id ? b.color : "rgba(255,255,255,0.08)"}`,
                            fontSize: 12, fontWeight: 700,
                            color: selectedBank === b.id ? "#fff" : "rgba(255,255,255,0.5)", transition: "all 0.15s",
                          }}>{b.short}</button>
                      ))}
                    </div>
                    <input placeholder="Số tài khoản" value={accountNumber} onChange={e => setAccountNumber(e.target.value)}
                      style={{ height: 44, borderRadius: 10, background: "#1A1A2E", border: "1px solid rgba(201,168,76,0.2)", color: "#fff", padding: "0 12px", fontSize: 13, outline: "none", width: "100%", boxSizing: "border-box" }} />
                    <input placeholder="Tên chủ tài khoản" value={accountHolder} onChange={e => setAccountHolder(e.target.value)}
                      style={{ height: 44, borderRadius: 10, background: "#1A1A2E", border: "1px solid rgba(201,168,76,0.2)", color: "#fff", padding: "0 12px", fontSize: 13, outline: "none", width: "100%", boxSizing: "border-box" }} />
                  </motion.div>
                )}

                {method === "ewallet" && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      {ewallets.map(e => (
                        <button key={e.id} onClick={() => setSelectedEwallet(e.id)}
                          style={{
                            height: 48, borderRadius: 10, cursor: "pointer",
                            background: selectedEwallet === e.id ? `${e.color}22` : "rgba(255,255,255,0.04)",
                            border: `1px solid ${selectedEwallet === e.id ? e.color : "rgba(255,255,255,0.08)"}`,
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                            fontSize: 13, fontWeight: 700,
                            color: selectedEwallet === e.id ? "#fff" : "rgba(255,255,255,0.5)", transition: "all 0.15s",
                          }}>
                          <span style={{ fontSize: 20 }}>{e.emoji}</span> {e.name}
                        </button>
                      ))}
                    </div>
                    <input placeholder="Số điện thoại ví" value={ewalletPhone} onChange={e => setEwalletPhone(e.target.value)}
                      style={{ height: 44, borderRadius: 10, background: "#1A1A2E", border: "1px solid rgba(201,168,76,0.2)", color: "#fff", padding: "0 12px", fontSize: 13, outline: "none", width: "100%", boxSizing: "border-box" }} />
                  </motion.div>
                )}
              </div>

              <button onClick={handleSubmit} disabled={!valid}
                style={{
                  width: "100%", height: 50, borderRadius: 12, border: "none", cursor: valid ? "pointer" : "not-allowed",
                  background: valid ? "linear-gradient(135deg,#2EC97C,#34d399)" : "rgba(255,255,255,0.08)",
                  fontFamily: "'Oswald',sans-serif", fontSize: 16, fontWeight: 700, letterSpacing: "0.05em",
                  color: valid ? "#0D0D1A" : "rgba(255,255,255,0.3)", transition: "all 0.2s",
                }}>
                TIẾP TỤC
              </button>
            </motion.div>
          ) : (
            <motion.div key="confirm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div style={{ background: "rgba(46,201,124,0.06)", border: "1px solid rgba(46,201,124,0.2)", borderRadius: 12, padding: 14, marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: "#2EC97C", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 10, textTransform: "uppercase" }}>Xác nhận rút tiền</div>
                {[
                  { label: "Số tiền rút", value: `${numAmount.toLocaleString("vi-VN")} VND` },
                  { label: "Phương thức", value: method === "bank" ? `${banks.find(b=>b.id===selectedBank)?.name}` : `${ewallets.find(e=>e.id===selectedEwallet)?.name}` },
                  ...(method === "bank" ? [
                    { label: "Số tài khoản", value: accountNumber },
                    { label: "Chủ tài khoản", value: accountHolder },
                  ] : [
                    { label: "Số điện thoại", value: ewalletPhone },
                  ]),
                ].map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{row.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{row.value}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: "rgba(255,165,0,0.08)", border: "1px solid rgba(255,165,0,0.2)", borderRadius: 10, padding: "10px 12px", marginBottom: 16, fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                ⚠️ Vui lòng kiểm tra kỹ thông tin trước khi xác nhận. Yêu cầu sẽ được xử lý trong <strong style={{ color: "#F5D787" }}>5–15 phút</strong>.
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <button onClick={() => setStep("form")}
                  style={{ height: 48, borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", cursor: "pointer", fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>
                  QUAY LẠI
                </button>
                <button onClick={handleConfirm}
                  style={{ height: 48, borderRadius: 10, border: "none", background: "linear-gradient(135deg,#2EC97C,#34d399)", cursor: "pointer", fontFamily: "'Oswald',sans-serif", fontSize: 14, fontWeight: 700, color: "#0D0D1A" }}>
                  XÁC NHẬN
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
