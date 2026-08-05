import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

export default function Register() {
  const [, setLocation] = useLocation();
  const [form, setForm] = useState({ username: "", phone: "", password: "", confirm: "" });
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed]   = useState(false);

  const errors = {
    username: form.username && form.username.length < 6 ? "Tối thiểu 6 ký tự" : "",
    phone:    form.phone && !/^0\d{9}$/.test(form.phone) ? "Số điện thoại không hợp lệ" : "",
    password: form.password && form.password.length < 8  ? "Tối thiểu 8 ký tự" : "",
    confirm:  form.confirm && form.confirm !== form.password ? "Mật khẩu không khớp" : "",
  };

  const valid =
    form.username.length >= 6 &&
    /^0\d{9}$/.test(form.phone) &&
    form.password.length >= 8 &&
    form.confirm === form.password &&
    agreed;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) { toast.error("Vui lòng điền đầy đủ và chính xác thông tin"); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Đăng ký thành công! Chào mừng bạn đến với HUYNH THUONG!");
      setLocation("/");
    }, 1400);
  };

  const Field = ({
    name, label, type = "text", placeholder, icon,
  }: { name: keyof typeof form; label: string; type?: string; placeholder: string; icon: React.ReactNode }) => (
    <div>
      <label style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 700, display: "block", marginBottom: 6, letterSpacing: "0.06em" }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
          {icon}
        </div>
        <input
          data-testid={`input-register-${name}`}
          type={name === "password" || name === "confirm" ? (showPw ? "text" : "password") : type}
          placeholder={placeholder}
          value={form[name]}
          onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
          style={{
            width: "100%", height: 48,
            paddingLeft: 38, paddingRight: name === "password" ? 44 : 12,
            boxSizing: "border-box",
            background: "#0D0D1A",
            border: `1px solid ${errors[name] ? "#C0272D" : "rgba(201,168,76,0.2)"}`,
            borderRadius: 10, color: "#fff", fontSize: 14, outline: "none",
            transition: "border-color 0.15s",
          }}
          onFocus={e => { if (!errors[name]) e.target.style.borderColor = "rgba(201,168,76,0.6)"; }}
          onBlur={e => { if (!errors[name]) e.target.style.borderColor = "rgba(201,168,76,0.2)"; }}
        />
        {(name === "password") && (
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
        )}
      </div>
      {errors[name] && <div style={{ fontSize: 11, color: "#E85D5D", marginTop: 4 }}>{errors[name]}</div>}
    </div>
  );

  const UserIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.3)">
      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
    </svg>
  );
  const PhoneIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.3)">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
  );
  const LockIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.3)">
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
    </svg>
  );

  return (
    <div style={{ minHeight: "100dvh", background: "#0D0D1A", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 480, display: "flex", flexDirection: "column", minHeight: "100dvh", position: "relative", overflow: "hidden" }}>

        {/* Background decoration */}
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(201,168,76,0.04)", filter: "blur(40px)", pointerEvents: "none" }} />

        {/* Back */}
        <div style={{ padding: "16px 14px 0" }}>
          <Link href="/login">
            <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
              Đăng nhập
            </button>
          </Link>
        </div>

        {/* Header */}
        <div style={{ textAlign: "center", padding: "20px 20px 18px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 56, height: 56, borderRadius: 14, marginBottom: 12,
            background: "linear-gradient(135deg,#1A1A2E,#0D0D1A)",
            border: "1px solid rgba(201,168,76,0.3)",
            boxShadow: "0 0 24px rgba(201,168,76,0.12)",
            fontSize: 26,
          }}>
            🎰
          </div>
          <div style={{
            fontFamily: "'Oswald',sans-serif", fontSize: 22, fontWeight: 700,
            background: "linear-gradient(135deg,#C9A84C,#F5D787)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text", letterSpacing: "0.06em",
          }}>
            ĐĂNG KÝ
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 3 }}>
            Tạo tài khoản và nhận thưởng ngay
          </div>
        </div>

        {/* Bonus badge */}
        <div style={{ margin: "0 14px 14px", background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>🎁</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#C9A84C" }}>Tặng 150% thưởng cho thành viên mới</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Nạp lần đầu lên đến 5,000,000 VND</div>
          </div>
        </div>

        {/* Form card */}
        <div style={{ margin: "0 14px", background: "#13131F", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 16, padding: "20px 16px 24px" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            <Field name="username" label="TÊN ĐĂNG NHẬP" placeholder="Tối thiểu 6 ký tự" icon={<UserIcon />} />
            <Field name="phone" label="SỐ ĐIỆN THOẠI" type="tel" placeholder="Số điện thoại (0xxxxxxxxx)" icon={<PhoneIcon />} />
            <Field name="password" label="MẬT KHẨU" placeholder="Tối thiểu 8 ký tự" icon={<LockIcon />} />
            <Field name="confirm" label="XÁC NHẬN MẬT KHẨU" placeholder="Nhập lại mật khẩu" icon={<LockIcon />} />

            {/* Terms */}
            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
              <div
                onClick={() => setAgreed(a => !a)}
                style={{
                  width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 1,
                  background: agreed ? "linear-gradient(135deg,#C9A84C,#F5D787)" : "transparent",
                  border: `1.5px solid ${agreed ? "#C9A84C" : "rgba(255,255,255,0.2)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.15s",
                }}
              >
                {agreed && <svg width="11" height="11" viewBox="0 0 24 24" fill="#0D0D1A"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>}
              </div>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                Tôi đồng ý với{" "}
                <a href="#" style={{ color: "#C9A84C" }}>Điều khoản & Điều kiện</a>{" "}
                và{" "}
                <a href="#" style={{ color: "#C9A84C" }}>Chính sách bảo mật</a>{" "}
                của HUYNH THUONG
              </span>
            </label>

            {/* Submit */}
            <button
              data-testid="button-submit-register"
              type="submit"
              disabled={!valid || loading}
              style={{
                width: "100%", height: 50, borderRadius: 12, border: "none",
                cursor: valid && !loading ? "pointer" : "not-allowed",
                background: valid && !loading
                  ? "linear-gradient(135deg,#C9A84C,#F5D787)"
                  : "rgba(255,255,255,0.08)",
                fontFamily: "'Oswald',sans-serif", fontSize: 16, fontWeight: 700,
                color: valid && !loading ? "#0D0D1A" : "rgba(255,255,255,0.3)",
                letterSpacing: "0.06em",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "all 0.2s",
              }}
            >
              {loading ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    style={{ animation: "spin 0.8s linear infinite", color: "rgba(255,255,255,0.6)" }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  Đang đăng ký...
                </>
              ) : "ĐĂNG KÝ NGAY"}
            </button>
          </form>
        </div>

        <div style={{ textAlign: "center", padding: "14px 20px 24px", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
          Đã có tài khoản?{" "}
          <Link href="/login">
            <span style={{ color: "#C9A84C", fontWeight: 700, cursor: "pointer" }}>Đăng nhập</span>
          </Link>
        </div>

        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
