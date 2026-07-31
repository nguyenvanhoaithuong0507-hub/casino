import React, { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { toast } from "sonner";
import { Copy, Edit2, LogOut, ChevronRight } from "lucide-react";

interface UserProfile {
  username: string;
  email: string;
  phone: string;
  balance: number;
  totalDeposited: number;
  totalWithdrawn: number;
  joinedDate: string;
  vipLevel: number;
}

const mockUser: UserProfile = {
  username: "user123456",
  email: "user@example.com",
  phone: "0988888888",
  balance: 5234550,
  totalDeposited: 15000000,
  totalWithdrawn: 9765450,
  joinedDate: "2024-01-15",
  vipLevel: 2,
};

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [editForm, setEditForm] = useState({
    email: user.email,
    phone: user.phone,
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Đã sao chép!");
  };

  const handleSaveEdit = () => {
    if (!editForm.email || !editForm.phone) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    setUser({ ...user, ...editForm });
    setEditMode(false);
    toast.success("Cập nhật thông tin thành công!");
  };

  const vipLevels = [
    { level: 0, name: "Thành viên", minDeposit: 0, bonus: "0%" },
    { level: 1, name: "Bạc", minDeposit: 5000000, bonus: "0.5%" },
    { level: 2, name: "Vàng", minDeposit: 10000000, bonus: "1%" },
    { level: 3, name: "Bạch Kim", minDeposit: 50000000, bonus: "2%" },
    { level: 4, name: "Kim Cương", minDeposit: 100000000, bonus: "5%" },
  ];

  const currentVipInfo = vipLevels[user.vipLevel];
  const nextVipLevel = vipLevels[Math.min(user.vipLevel + 1, vipLevels.length - 1)];
  const progressToNextLevel = user.vipLevel < vipLevels.length - 1
    ? Math.min(100, (user.totalDeposited / nextVipLevel.minDeposit) * 100)
    : 100;

  return (
    <Layout>
      <div className="p-4 pb-24">
        {/* Header */}
        <div className="text-center mb-6 mt-4">
          <h1 className="text-2xl font-black mb-2" style={{ fontFamily: "'Oswald', sans-serif", background: "linear-gradient(135deg, #C9A84C, #F5D787)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            TÀI KHOẢN CỦA TÔI
          </h1>
        </div>

        {/* User Avatar & Name */}
        <div className="bg-[#1A1A2E] border border-[#C9A84C]/20 rounded-lg p-4 mb-4 text-center">
          <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#F5D787] flex items-center justify-center">
            <span className="text-4xl font-bold text-[#0D0D1A]">{user.username.charAt(0).toUpperCase()}</span>
          </div>
          <p className="font-bold text-white text-lg mb-1">{user.username}</p>
          <p className="text-xs text-white/50 mb-3">Tham gia từ {new Date(user.joinedDate).toLocaleDateString("vi-VN")}</p>
          
          {/* VIP Badge */}
          <div className="inline-block px-3 py-1 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]">
            <span className="text-xs font-bold text-[#C9A84C]">⭐ {currentVipInfo.name}</span>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-[#C9A84C]/20 to-[#C9A84C]/5 border border-[#C9A84C]/30 rounded-lg p-4 mb-4">
          <p className="text-xs text-white/60 mb-1">SỐ DƯ HIỆN TẠI</p>
          <p className="text-3xl font-black text-[#C9A84C] mb-3">{user.balance.toLocaleString("vi-VN")} ₫</p>
          <div className="flex gap-2">
            <Link href="/deposit" className="flex-1">
              <Button className="w-full h-10 text-sm font-bold bg-[#1A1A2E] border border-[#C9A84C]/30 text-[#C9A84C] hover:border-[#C9A84C] transition">
                NẠPTIỀN
              </Button>
            </Link>
            <Link href="/withdrawal" className="flex-1">
              <Button className="w-full h-10 text-sm font-bold bg-gradient-to-br from-[#C9A84C] to-[#E8C96A] text-[#0D0D1A] hover:opacity-90">
                RÚT TIỀN
              </Button>
            </Link>
          </div>
        </div>

        {/* VIP Progress */}
        <div className="bg-[#1A1A2E] border border-[#C9A84C]/20 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-white">Tiến độ VIP</p>
            <p className="text-xs text-white/50">{Math.floor(progressToNextLevel)}%</p>
          </div>
          <div className="w-full h-2 bg-[#0D0D1A] rounded-full overflow-hidden mb-3">
            <div 
              className="h-full bg-gradient-to-r from-[#C9A84C] to-[#F5D787] transition-all"
              style={{ width: `${progressToNextLevel}%` }}
            />
          </div>
          {user.vipLevel < vipLevels.length - 1 && (
            <p className="text-xs text-white/60">
              Cần <span className="text-[#C9A84C]">{(nextVipLevel.minDeposit - user.totalDeposited).toLocaleString("vi-VN")} ₫</span> nữa để lên <span className="text-[#C9A84C]">{nextVipLevel.name}</span>
            </p>
          )}
          {user.vipLevel === vipLevels.length - 1 && (
            <p className="text-xs text-[#C9A84C]">Bạn đã đạt cấp VIP cao nhất! 🎉</p>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#1A1A2E] border border-[#C9A84C]/20 rounded-lg p-3">
            <p className="text-xs text-white/50 mb-1">Tổng nạp</p>
            <p className="font-bold text-[#C9A84C]">{user.totalDeposited.toLocaleString("vi-VN")} ₫</p>
          </div>
          <div className="bg-[#1A1A2E] border border-[#C9A84C]/20 rounded-lg p-3">
            <p className="text-xs text-white/50 mb-1">Tổng rút</p>
            <p className="font-bold text-[#C9A84C]">{user.totalWithdrawn.toLocaleString("vi-VN")} ₫</p>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-[#1A1A2E] border border-[#C9A84C]/20 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-white">Thông tin tài khoản</p>
            <button
              onClick={() => {
                if (editMode) {
                  handleSaveEdit();
                } else {
                  setEditMode(true);
                }
              }}
              className="text-[#C9A84C] hover:text-[#F5D787] flex items-center gap-1"
            >
              <Edit2 size={16} />
              <span className="text-xs font-bold">{editMode ? "LƯU" : "CHỈNH SỬA"}</span>
            </button>
          </div>

          <div className="space-y-3">
            {/* Username (Read-only) */}
            <div>
              <p className="text-xs text-white/50 mb-1">Tên đăng nhập</p>
              <div className="flex items-center justify-between">
                <p className="font-bold text-white">{user.username}</p>
                <button onClick={() => handleCopy(user.username)} className="text-white/50 hover:text-[#C9A84C]">
                  {copied ? <span className="text-xs">✓</span> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* Email */}
            <div>
              <p className="text-xs text-white/50 mb-1">Email</p>
              {editMode ? (
                <Input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="h-9 bg-[#0D0D1A] border border-[#C9A84C]/30 text-white"
                />
              ) : (
                <div className="flex items-center justify-between">
                  <p className="font-bold text-white">{user.email}</p>
                  <button onClick={() => handleCopy(user.email)} className="text-white/50 hover:text-[#C9A84C]">
                    {copied ? <span className="text-xs">✓</span> : <Copy size={16} />}
                  </button>
                </div>
              )}
            </div>

            {/* Phone */}
            <div>
              <p className="text-xs text-white/50 mb-1">Số điện thoại</p>
              {editMode ? (
                <Input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="h-9 bg-[#0D0D1A] border border-[#C9A84C]/30 text-white"
                />
              ) : (
                <div className="flex items-center justify-between">
                  <p className="font-bold text-white">{user.phone}</p>
                  <button onClick={() => handleCopy(user.phone)} className="text-white/50 hover:text-[#C9A84C]">
                    {copied ? <span className="text-xs">✓</span> : <Copy size={16} />}
                  </button>
                </div>
              )}
            </div>
          </div>

          {editMode && (
            <Button
              onClick={() => setEditMode(false)}
              className="w-full h-9 text-sm font-bold bg-[#0D0D1A] border border-[#C9A84C]/30 text-[#C9A84C] hover:border-[#C9A84C] mt-3"
            >
              HỦY
            </Button>
          )}
        </div>

        {/* VIP Benefits */}
        <div className="bg-[#1A1A2E] border border-[#C9A84C]/20 rounded-lg p-4 mb-4">
          <p className="text-sm font-bold text-white mb-3">Quyền lợi VIP</p>
          <div className="space-y-2">
            {vipLevels.map((level) => (
              <div
                key={level.level}
                className={`p-2 rounded border ${
                  user.vipLevel >= level.level
                    ? "bg-[#C9A84C]/10 border-[#C9A84C]"
                    : "bg-[#0D0D1A]/50 border-white/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${user.vipLevel >= level.level ? "text-[#C9A84C]" : "text-white/50"}`}>
                    {level.name}
                  </span>
                  <span className={`text-xs ${user.vipLevel >= level.level ? "text-[#C9A84C]" : "text-white/50"}`}>
                    Hoàn trả {level.bonus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2 mb-4">
          <button className="w-full flex items-center justify-between p-4 bg-[#1A1A2E] border border-[#C9A84C]/20 rounded-lg hover:border-[#C9A84C]/50 transition">
            <span className="text-sm font-bold text-white">Hỗ trợ khách hàng</span>
            <ChevronRight size={16} className="text-white/50" />
          </button>
          <button className="w-full flex items-center justify-between p-4 bg-[#1A1A2E] border border-[#C9A84C]/20 rounded-lg hover:border-[#C9A84C]/50 transition">
            <span className="text-sm font-bold text-white">Câu hỏi thường gặp</span>
            <ChevronRight size={16} className="text-white/50" />
          </button>
          <button className="w-full flex items-center justify-between p-4 bg-[#1A1A2E] border border-[#C9A84C]/20 rounded-lg hover:border-[#C9A84C]/50 transition">
            <span className="text-sm font-bold text-white">Điều khoản & Điều kiện</span>
            <ChevronRight size={16} className="text-white/50" />
          </button>
        </div>

        {/* Logout */}
        <Button className="w-full h-12 text-md font-bold bg-[#C0272D]/20 border border-[#C0272D]/50 text-[#C0272D] hover:bg-[#C0272D]/30 flex items-center justify-center gap-2">
          <LogOut size={18} />
          ĐĂNG XUẤT
        </Button>
      </div>
    </Layout>
  );
}
