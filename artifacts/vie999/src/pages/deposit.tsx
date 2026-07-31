import React, { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Copy, Check } from "lucide-react";

const depositSchema = z.object({
  amount: z.string()
    .refine(val => !isNaN(Number(val)) && Number(val) > 0, "Số tiền phải lớn hơn 0")
    .refine(val => Number(val) >= 10000, "Số tiền tối thiểu 10,000 VND"),
  paymentMethod: z.enum(["bank", "ewallet"], { errorMap: () => ({ message: "Vui lòng chọn phương thức thanh toán" }) }),
  ewalletType: z.string().optional(),
});

const bankInfo = {
  bankName: "Vietcombank",
  accountNumber: "1023456789",
  accountHolder: "HUYNH THUONG CASINO",
  qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020126450014VN.ASCB00000000123456789520400005303704506500000000000000000063047CDD",
};

const ewalletMethods = [
  { id: "momo", name: "Momo", icon: "🟠", color: "#FF6B35", phone: "0988888888" },
  { id: "zalopay", name: "ZaloPay", icon: "💚", color: "#009FFF", phone: "0988888888" },
];

export default function Deposit() {
  const [copied, setCopied] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"select" | "confirm">("select");
  const [selectedMethod, setSelectedMethod] = useState<"bank" | "ewallet" | null>(null);
  const [selectedEwallet, setSelectedEwallet] = useState<string | null>(null);

  const form = useForm<z.infer<typeof depositSchema>>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      amount: "",
      paymentMethod: undefined,
      ewalletType: undefined,
    },
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Đã sao chép!");
  };

  function onSubmit(values: z.infer<typeof depositSchema>) {
    toast.success(`Yêu cầu nạp ${Number(values.amount).toLocaleString("vi-VN")} VND thành công! Vui lòng chuyển khoản để xác nhận.`);
    form.reset();
    setPaymentStep("select");
    setSelectedMethod(null);
    setSelectedEwallet(null);
  }

  return (
    <Layout>
      <div className="p-4 pb-24">
        {/* Header */}
        <div className="text-center mb-6 mt-4">
          <h1 className="text-2xl font-black mb-2" style={{ fontFamily: "'Oswald', sans-serif", background: "linear-gradient(135deg, #C9A84C, #F5D787)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            NẠP TIỀN
          </h1>
          <p className="text-xs text-white/50">Tối thiểu 10,000 VND</p>
        </div>

        {paymentStep === "select" ? (
          <>
            {/* Amount Input */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-4 top-3.5 text-white/50 text-sm">₫</span>
                          <Input
                            type="number"
                            placeholder="Nhập số tiền"
                            className="pl-7 h-12 bg-[#1A1A2E] border border-[#C9A84C]/30 text-white placeholder:text-white/30 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-[#C0272D]" />
                    </FormItem>
                  )}
                />

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-4 gap-2">
                  {["100000", "300000", "500000", "1000000"].map(amount => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => form.setValue("amount", amount)}
                      className="py-2 px-2 text-xs font-bold bg-[#1A1A2E] border border-[#C9A84C]/20 text-[#C9A84C] rounded hover:border-[#C9A84C]/50 transition"
                    >
                      {(Number(amount) / 1000).toFixed(0)}K
                    </button>
                  ))}
                </div>

                {/* Payment Method Selection */}
                <div className="mt-6">
                  <p className="text-sm font-bold text-white mb-3">Phương thức nạp tiền</p>

                  {/* Bank Transfer Option */}
                  <div
                    onClick={() => {
                      setSelectedMethod("bank");
                      form.setValue("paymentMethod", "bank");
                      setPaymentStep("confirm");
                    }}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition mb-3 ${
                      selectedMethod === "bank"
                        ? "border-[#C9A84C] bg-[#1A1A2E]"
                        : "border-[#C9A84C]/20 bg-[#1A1A2E] hover:border-[#C9A84C]/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#C9A84C]/20 flex items-center justify-center">
                        <span className="text-lg">🏦</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-white">Chuyển khoản ngân hàng</p>
                        <p className="text-xs text-white/50">Vietcombank - Tức thì</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${selectedMethod === "bank" ? "bg-[#C9A84C] border-[#C9A84C]" : "border-[#C9A84C]/30"}`} />
                    </div>
                  </div>

                  {/* E-wallet Option */}
                  <div
                    onClick={() => {
                      setSelectedMethod("ewallet");
                      form.setValue("paymentMethod", "ewallet");
                    }}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                      selectedMethod === "ewallet"
                        ? "border-[#C9A84C] bg-[#1A1A2E]"
                        : "border-[#C9A84C]/20 bg-[#1A1A2E] hover:border-[#C9A84C]/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#C9A84C]/20 flex items-center justify-center">
                        <span className="text-lg">💳</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-white">Ví điện tử</p>
                        <p className="text-xs text-white/50">Momo, ZaloPay</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${selectedMethod === "ewallet" ? "bg-[#C9A84C] border-[#C9A84C]" : "border-[#C9A84C]/30"}`} />
                    </div>
                  </div>

                  {/* E-wallet Sub-selection */}
                  {selectedMethod === "ewallet" && (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {ewalletMethods.map(method => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => {
                            setSelectedEwallet(method.id);
                            form.setValue("ewalletType", method.id);
                            setPaymentStep("confirm");
                          }}
                          className={`p-3 rounded-lg border-2 transition ${
                            selectedEwallet === method.id
                              ? "border-[#C9A84C] bg-[#1A1A2E]"
                              : "border-[#C9A84C]/20 bg-[#1A1A2E] hover:border-[#C9A84C]/50"
                          }`}
                        >
                          <p className="text-lg mb-1">{method.icon}</p>
                          <p className="text-xs font-bold text-white">{method.name}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-md font-bold bg-gradient-to-br from-[#C9A84C] to-[#E8C96A] text-[#0D0D1A] hover:opacity-90 border-none mt-6"
                  disabled={!form.watch("paymentMethod") || !form.watch("amount")}
                >
                  TIẾP TỤC
                </Button>
              </form>
            </Form>
          </>
        ) : (
          <>
            {/* Payment Confirmation */}
            <div className="bg-[#1A1A2E] border border-[#C9A84C]/20 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-white/60">Số tiền nạp</span>
                <span className="text-2xl font-bold text-[#C9A84C]">{Number(form.watch("amount")).toLocaleString("vi-VN")} ₫</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Phương thức</span>
                <span className="text-sm font-bold text-white">
                  {selectedMethod === "bank" ? "Chuyển khoản ngân hàng" : `${ewalletMethods.find(m => m.id === selectedEwallet)?.name}`}
                </span>
              </div>
            </div>

            {/* Bank Transfer Instructions */}
            {selectedMethod === "bank" && (
              <div className="space-y-3">
                <p className="text-sm font-bold text-white mb-3">Thông tin thanh toán</p>
                
                {/* QR Code */}
                <div className="bg-[#1A1A2E] border border-[#C9A84C]/20 rounded-lg p-4 text-center">
                  <img 
                    src={bankInfo.qrCode} 
                    alt="QR Code" 
                    className="w-32 h-32 mx-auto"
                  />
                  <p className="text-xs text-white/50 mt-2">Quét mã QR để thanh toán</p>
                </div>

                {/* Bank Details */}
                <div className="bg-[#1A1A2E] border border-[#C9A84C]/20 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-xs text-white/50 mb-1">Ngân hàng</p>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-white">{bankInfo.bankName}</p>
                      <button
                        onClick={() => handleCopy(bankInfo.bankName)}
                        className="text-[#C9A84C] hover:text-[#F5D787]"
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-white/50 mb-1">Số tài khoản</p>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-white">{bankInfo.accountNumber}</p>
                      <button
                        onClick={() => handleCopy(bankInfo.accountNumber)}
                        className="text-[#C9A84C] hover:text-[#F5D787]"
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-white/50 mb-1">Chủ tài khoản</p>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-white">{bankInfo.accountHolder}</p>
                      <button
                        onClick={() => handleCopy(bankInfo.accountHolder)}
                        className="text-[#C9A84C] hover:text-[#F5D787]"
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#0D0D1A] rounded p-2 border border-[#C9A84C]/10">
                    <p className="text-xs text-white/60">
                      <span className="text-[#C9A84C] font-bold">Nội dung chuyển khoản:</span> HD_{form.watch("amount")}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* E-wallet Instructions */}
            {selectedMethod === "ewallet" && selectedEwallet && (
              <div className="space-y-3">
                <p className="text-sm font-bold text-white mb-3">Thông tin thanh toán</p>
                <div className="bg-[#1A1A2E] border border-[#C9A84C]/20 rounded-lg p-4 space-y-3">
                  <div className="text-center">
                    <p className="text-3xl mb-2">{ewalletMethods.find(m => m.id === selectedEwallet)?.icon}</p>
                    <p className="font-bold text-white mb-3">{ewalletMethods.find(m => m.id === selectedEwallet)?.name}</p>
                  </div>

                  <div>
                    <p className="text-xs text-white/50 mb-1">Số điện thoại</p>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-white">{ewalletMethods.find(m => m.id === selectedEwallet)?.phone}</p>
                      <button
                        onClick={() => handleCopy(ewalletMethods.find(m => m.id === selectedEwallet)?.phone || "")}
                        className="text-[#C9A84C] hover:text-[#F5D787]"
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#0D0D1A] rounded p-2 border border-[#C9A84C]/10">
                    <p className="text-xs text-white/60">
                      <span className="text-[#C9A84C] font-bold">Số tiền:</span> {Number(form.watch("amount")).toLocaleString("vi-VN")} VND
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <Button
                type="button"
                onClick={() => {
                  setPaymentStep("select");
                  setSelectedMethod(null);
                  setSelectedEwallet(null);
                }}
                className="flex-1 h-12 text-md font-bold bg-[#1A1A2E] border border-[#C9A84C]/30 text-[#C9A84C] hover:border-[#C9A84C]"
              >
                QUAY LẠI
              </Button>
              <Button
                type="button"
                onClick={() => {
                  toast.success("Nạp tiền thành công!");
                  setPaymentStep("select");
                  setSelectedMethod(null);
                  setSelectedEwallet(null);
                  form.reset();
                }}
                className="flex-1 h-12 text-md font-bold bg-gradient-to-br from-[#C9A84C] to-[#E8C96A] text-[#0D0D1A] hover:opacity-90 border-none"
              >
                ĐÃ CHUYỂN KHOẢN
              </Button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
