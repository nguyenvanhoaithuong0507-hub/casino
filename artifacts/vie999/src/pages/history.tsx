import React, { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpRight, ArrowDownLeft, ChevronDown } from "lucide-react";

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "bet" | "win";
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  method?: string;
  description: string;
}

const mockTransactions: Transaction[] = [
  { id: "1", type: "win", amount: 2500000, date: "2024-12-28 14:30", status: "completed", description: "Thắng game Fortune Gems" },
  { id: "2", type: "bet", amount: -500000, date: "2024-12-28 14:20", status: "completed", description: "Cược game Super Ace" },
  { id: "3", type: "deposit", amount: 5000000, date: "2024-12-27 10:15", status: "completed", method: "Chuyển khoản Vietcombank", description: "Nạp tiền" },
  { id: "4", type: "withdrawal", amount: -3000000, date: "2024-12-26 15:45", status: "completed", method: "ZaloPay", description: "Rút tiền" },
  { id: "5", type: "bet", amount: -1000000, date: "2024-12-26 09:30", status: "completed", description: "Cược game Mahjong Ways" },
  { id: "6", type: "deposit", amount: 10000000, date: "2024-12-25 22:00", status: "completed", method: "Momo", description: "Nạp tiền" },
  { id: "7", type: "withdrawal", amount: -2000000, date: "2024-12-24 18:20", status: "pending", method: "Vietcombank", description: "Rút tiền" },
  { id: "8", type: "win", amount: 1500000, date: "2024-12-24 12:00", status: "completed", description: "Thắng game Dragon Hatch" },
  { id: "9", type: "bet", amount: -800000, date: "2024-12-23 20:30", status: "completed", description: "Cược game PG Slots" },
  { id: "10", type: "deposit", amount: 2000000, date: "2024-12-23 14:00", status: "completed", method: "E-wallet", description: "Nạp tiền" },
];

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  completed: { bg: "bg-green-500/10", text: "text-green-400", label: "Hoàn tất" },
  pending: { bg: "bg-yellow-500/10", text: "text-yellow-400", label: "Đang xử lý" },
  failed: { bg: "bg-red-500/10", text: "text-red-400", label: "Thất bại" },
};

export default function History() {
  const [filterType, setFilterType] = useState<"all" | "deposit" | "withdrawal" | "bet" | "win">("all");
  const [searchText, setSearchText] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredTransactions = mockTransactions.filter(tx => {
    if (filterType !== "all" && tx.type !== filterType) return false;
    if (searchText && !tx.description.toLowerCase().includes(searchText.toLowerCase())) return false;
    return true;
  });

  const getTransactionIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="w-5 h-5" style={{ color: "#2EC97C" }} />;
      case "withdrawal":
        return <ArrowUpRight className="w-5 h-5" style={{ color: "#E85D5D" }} />;
      case "bet":
        return <ArrowUpRight className="w-5 h-5" style={{ color: "#F5A623" }} />;
      case "win":
        return <ArrowDownLeft className="w-5 h-5" style={{ color: "#C9A84C" }} />;
    }
  };

  const getTransactionColor = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit":
      case "win":
        return "text-green-400";
      case "withdrawal":
      case "bet":
        return "text-red-400";
      default:
        return "text-white";
    }
  };

  const getTransactionSign = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit":
      case "win":
        return "+";
      case "withdrawal":
      case "bet":
        return "-";
      default:
        return "";
    }
  };

  return (
    <Layout>
      <div className="p-4 pb-24">
        {/* Header */}
        <div className="text-center mb-6 mt-4">
          <h1 className="text-2xl font-black mb-2" style={{ fontFamily: "'Oswald', sans-serif", background: "linear-gradient(135deg, #C9A84C, #F5D787)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            LỊCH SỬ GIAO DỊCH
          </h1>
          <p className="text-xs text-white/50">Theo dõi tất cả các giao dịch của bạn</p>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Tìm kiếm giao dịch..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="h-10 bg-[#1A1A2E] border border-[#C9A84C]/30 text-white placeholder:text-white/30 focus:border-[#C9A84C]"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide pb-2">
          {[
            { value: "all" as const, label: "Tất cả" },
            { value: "deposit" as const, label: "Nạp tiền", icon: "📥" },
            { value: "withdrawal" as const, label: "Rút tiền", icon: "📤" },
            { value: "bet" as const, label: "Cược", icon: "🎰" },
            { value: "win" as const, label: "Thắng", icon: "🏆" },
          ].map(filter => (
            <button
              key={filter.value}
              onClick={() => setFilterType(filter.value)}
              className={`px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                filterType === filter.value
                  ? "bg-[#C9A84C] text-[#0D0D1A]"
                  : "bg-[#1A1A2E] border border-[#C9A84C]/20 text-white/60 hover:border-[#C9A84C]/50"
              }`}
            >
              {filter.icon && <span className="mr-1">{filter.icon}</span>}
              {filter.label}
            </button>
          ))}
        </div>

        {/* Transactions List */}
        <div className="space-y-2">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white/50 text-sm">Không có giao dịch nào</p>
            </div>
          ) : (
            filteredTransactions.map(tx => {
              const isExpanded = expandedId === tx.id;
              const statusInfo = statusColors[tx.status];
              
              return (
                <div
                  key={tx.id}
                  className="bg-[#1A1A2E] border border-[#C9A84C]/20 rounded-lg p-3 cursor-pointer hover:border-[#C9A84C]/50 transition"
                  onClick={() => setExpandedId(isExpanded ? null : tx.id)}
                >
                  {/* Collapsed View */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center">
                        {getTransactionIcon(tx.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">{tx.description}</p>
                        <p className="text-xs text-white/50">{tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right ml-2">
                      <p className={`text-sm font-bold ${getTransactionColor(tx.type)}`}>
                        {getTransactionSign(tx.type)}{Math.abs(tx.amount).toLocaleString("vi-VN")} ₫
                      </p>
                      <div className={`inline-block px-2 py-1 rounded text-xs font-bold mt-1 ${statusInfo.bg} ${statusInfo.text}`}>
                        {statusInfo.label}
                      </div>
                    </div>
                  </div>

                  {/* Expanded View */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-[#C9A84C]/10 space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-white/50">ID giao dịch</p>
                          <p className="text-white font-mono">{tx.id}</p>
                        </div>
                        <div>
                          <p className="text-white/50">Loại</p>
                          <p className="text-white capitalize">{
                            tx.type === "deposit" ? "Nạp tiền" :
                            tx.type === "withdrawal" ? "Rút tiền" :
                            tx.type === "bet" ? "Cược" : "Thắng"
                          }</p>
                        </div>
                        <div>
                          <p className="text-white/50">Số tiền</p>
                          <p className={`font-bold ${getTransactionColor(tx.type)}`}>
                            {getTransactionSign(tx.type)}{Math.abs(tx.amount).toLocaleString("vi-VN")} ₫
                          </p>
                        </div>
                        <div>
                          <p className="text-white/50">Trạng thái</p>
                          <p className={`${statusInfo.text} font-bold`}>{statusInfo.label}</p>
                        </div>
                      </div>
                      {tx.method && (
                        <div>
                          <p className="text-xs text-white/50 mb-1">Phương thức</p>
                          <p className="text-xs text-white bg-[#0D0D1A] rounded p-2">{tx.method}</p>
                        </div>
                      )}
                      <Button
                        className="w-full h-8 text-xs font-bold bg-[#0D0D1A] border border-[#C9A84C]/30 text-[#C9A84C] hover:border-[#C9A84C] mt-2"
                        onClick={() => setExpandedId(null)}
                      >
                        ĐÓNG
                      </Button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Statistics Summary */}
        <div className="mt-8 pt-4 border-t border-[#C9A84C]/10">
          <p className="text-sm font-bold text-white mb-3">Thống kê</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#1A1A2E] border border-[#2EC97C]/30 rounded-lg p-3">
              <p className="text-xs text-[#2EC97C] mb-1">Tổng nạp tiền</p>
              <p className="text-lg font-bold text-[#2EC97C]">
                {mockTransactions
                  .filter(tx => tx.type === "deposit")
                  .reduce((sum, tx) => sum + tx.amount, 0)
                  .toLocaleString("vi-VN")} ₫
              </p>
            </div>
            <div className="bg-[#1A1A2E] border border-[#E85D5D]/30 rounded-lg p-3">
              <p className="text-xs text-[#E85D5D] mb-1">Tổng rút tiền</p>
              <p className="text-lg font-bold text-[#E85D5D]">
                {Math.abs(mockTransactions
                  .filter(tx => tx.type === "withdrawal")
                  .reduce((sum, tx) => sum + tx.amount, 0))
                  .toLocaleString("vi-VN")} ₫
              </p>
            </div>
            <div className="bg-[#1A1A2E] border border-[#C9A84C]/30 rounded-lg p-3">
              <p className="text-xs text-[#C9A84C] mb-1">Tổng thắng</p>
              <p className="text-lg font-bold text-[#C9A84C]">
                {mockTransactions
                  .filter(tx => tx.type === "win")
                  .reduce((sum, tx) => sum + tx.amount, 0)
                  .toLocaleString("vi-VN")} ₫
              </p>
            </div>
            <div className="bg-[#1A1A2E] border border-[#F5A623]/30 rounded-lg p-3">
              <p className="text-xs text-[#F5A623] mb-1">Tổng cược</p>
              <p className="text-lg font-bold text-[#F5A623]">
                {Math.abs(mockTransactions
                  .filter(tx => tx.type === "bet")
                  .reduce((sum, tx) => sum + tx.amount, 0))
                  .toLocaleString("vi-VN")} ₫
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
