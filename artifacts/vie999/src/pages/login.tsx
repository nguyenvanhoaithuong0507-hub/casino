import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

export default function Login() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) { toast.error("Vui lòng điền đầy đủ thông tin"); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Đăng nhập thành công!");
      setLocation("/");
    }, 1200);
  };

  return (
    <div style={{
      minHeight: "100dvh", background: "#0D0D1A",
      display: "flex", justifyContent: "center",
    }}>
      <div style={{ width: "100%", maxWidth: 480, display: "flex", flexDirection: "column", minHeight: "100dvh", position: "relative", overflow: "hidden" }}>

        {/* Background decoration */}
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(201,168,76,0.04)", filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(192,39,45,0.04)", filter: "blur(30px)", pointerEvents: "none" }} />

        {/* Back button */}
        <div style={{ padding: "16px 14px 0" }}>
          <Link href="/">
            <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
              Trang chủ
            </button>
          </Link>
        </div>

        {/* Logo area */}
        <div style={{ textAlign: "center", padding: "28px 20px 24px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 64, height: 64, borderRadius: 16, marginBottom: 14,
            background: "linear-gradient(135deg,#1A1A2E,#0D0D1A)",
            border: "1px solid rgba(201,168,76,0.3)",
            boxShadow: "0 0 30px rgba(201,168,76,0.15)",
            fontSize: 28,
          }}>
            🎰
          </div>
          <div style={{
            fontFamily: "'Oswald',sans-serif", fontSize: 26, fontWeight: 700,
            background: "linear-gradient(135deg,#C9A84C,#F5D787)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text", letterSpacing: "0.06em", lineHeight: 1.1,
          }}>
            HUYNH THUONG
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>
            Chào mừng trở lại
          </div>
        </div>

        {/* Form card */}
        <div style={{ margin: "0 14px", background: "#13131F", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 16, padding: "20px 16px 24px" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Username */}
            <div>
              <label style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 700, display: "block", marginBottom: 6, letterSpacing: "0.06em" }}>
                TÊN ĐĂNG NHẬP
              </label>
              <div style={{ position: "relative" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.3)"
                  style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
                <input
                  data-testid="input-username"
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  style={{
                    width: "100%", height: 48, paddingLeft: 38, paddingRight: 12, boxSizing: "border-box",
                    background: "#0D0D1A", border: "1px solid rgba(201,168,76,0.2)",
                    borderRadius: 10, color: "#fff", fontSize: 14, outline: "none",
                    transition: "border-color 0.15s",
                  }}
                  onFocus={e => (e.target.style.borderColor = "rgba(201,168,76,0.6)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(201,168,76,0.2)")}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 700, display: "block", marginBottom: 6, letterSpacing: "0.06em" }}>
                MẬT KHẨU
              </label>
              <div style={{ position: "relative" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.3)"
                  style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
                <input
                  data-testid="input-password"
                  type={showPw ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{
                    width: "100%", height: 48, paddingLeft: 38, paddingRight: 44, boxSizing: "border-box",
                    background: "#0D0D1A", border: "1px solid rgba(201,168,76,0.2)",
                    borderRadius: 10, color: "#fff", fontSize: 14, outline: "none",
                    transition: "border-color 0.15s",
                  }}
                  onFocus={e => (e.target.style.borderColor = "rgba(201,168,76,0.6)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(201,168,76,0.2)")}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(p => !p)}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", padding: 2 }}
                >
                  {showPw
                    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
              <div style={{ textAlign: "right", marginTop: 6 }}>
                <a href="#" style={{ fontSize: 12, color: "rgba(201,168,76,0.7)" }}>Quên mật khẩu?</a>
              </div>
            </div>

            {/* Submit */}
            <button
              data-testid="button-submit-login"
              type="submit"
              disabled={loading}
              style={{
                width: "100%", height: 50, borderRadius: 12, border: "none", cursor: loading ? "wait" : "pointer",
                background: loading ? "rgba(201,168,76,0.5)" : "linear-gradient(135deg,#C9A84C,#F5D787)",
                fontFamily: "'Oswald',sans-serif", fontSize: 16, fontWeight: 700,
                color: "#0D0D1A", letterSpacing: "0.06em",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "all 0.2s",
              }}
            >
              {loading ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D0D1A" strokeWidth="2.5"
                    style={{ animation: "spin 0.8s linear infinite" }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  Đang đăng nhập...
                </>
              ) : "ĐĂNG NHẬP"}
            </button>
          </form>
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 20px" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>hoặc</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
        </div>

        {/* Register CTA */}
        <div style={{ margin: "0 14px" }}>
          <Link href="/register">
            <button style={{
              width: "100%", height: 48, borderRadius: 12, cursor: "pointer",
              background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)",
              fontFamily: "'Oswald',sans-serif", fontSize: 14, fontWeight: 700,
              color: "#C9A84C", letterSpacing: "0.05em",
            }}>
              ĐĂNG KÝ TÀI KHOẢN MỚI
            </button>
          </Link>
          <p style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 12, lineHeight: 1.5 }}>
            Bằng cách đăng nhập, bạn đồng ý với{" "}
            <a href="#" style={{ color: "rgba(201,168,76,0.6)" }}>Điều khoản</a> &{" "}
            <a href="#" style={{ color: "rgba(201,168,76,0.6)" }}>Chính sách</a> của HUYNH THUONG
          </p>
        </div>

        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
