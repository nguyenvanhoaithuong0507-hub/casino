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

const withdrawalSchema = z.object({
  amount: z.string()
    .refine(val => !isNaN(Number(val)) && Number(val) > 0, "Số tiền phải lớn hơn 0")
    .refine(val => Number(val) >= 50000, "Số tiền tối thiểu 50,000 VND"),
  withdrawalMethod: z.enum(["bank", "ewallet"], { errorMap: () => ({ message: "Vui lòng chọn phương thức rút tiền" }) }),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  accountHolder: z.string().optional(),
  ewalletType: z.string().optional(),
  ewalletPhone: z.string().optional(),
});

const bankOptions = [
  { id: "vcb", name: "Vietcombank", shortName: "VCB" },
  { id: "acb", name: "ACB", shortName: "ACB" },
  { id: "vpb", name: "VPBank", shortName: "VPB" },
  { id: "mb", name: "MB Bank", shortName: "MB" },
  { id: "tpb", name: "TPB", shortName: "TPB" },
  { id: "tech", name: "Techcombank", shortName: "TCB" },
];

const ewalletMethods = [
  { id: "momo", name: "Momo", icon: "🟠", color: "#FF6B35" },
  { id: "zalopay", name: "ZaloPay", icon: "💚", color: "#009FFF" },
];

export default function Withdrawal() {
  const [step, setStep] = useState<"select" | "confirm">("select");
  const [selectedMethod, setSelectedMethod] = useState<"bank" | "ewallet" | null>(null);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedEwallet, setSelectedEwallet] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const form = useForm<z.infer<typeof withdrawalSchema>>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      amount: "",
      withdrawalMethod: undefined,
      bankName: undefined,
      accountNumber: "",
      accountHolder: "",
      ewalletType: undefined,
      ewalletPhone: "",
    },
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Đã sao chép!");
  };

  function onSubmit(values: z.infer<typeof withdrawalSchema>) {
    if (values.withdrawalMethod === "bank" && (!values.accountNumber || !values.accountHolder)) {
      toast.error("Vui lòng điền đầy đủ thông tin tài khoản ngân hàng");
      return;
    }
    if (values.withdrawalMethod === "ewallet" && !values.ewalletPhone) {
      toast.error("Vui lòng nhập số điện thoại");
      return;
    }
    
    toast.success(`Yêu cầu rút ${Number(values.amount).toLocaleString("vi-VN")} VND thành công!`);
    form.reset();
    setStep("select");
    setSelectedMethod(null);
    setSelectedBank(null);
    setSelectedEwallet(null);
  }

  return (
    <Layout>
      <div className="p-4 pb-24">
        {/* Header */}
        <div className="text-center mb-6 mt-4">
          <h1 className="text-2xl font-black mb-2" style={{ fontFamily: "'Oswald', sans-serif", background: "linear-gradient(135deg, #C9A84C, #F5D787)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            RÚT TIỀN
          </h1>
          <p className="text-xs text-white/50">Tối thiểu 50,000 VND</p>
        </div>

        {/* Current Balance */}
        <div className="bg-[#1A1A2E] border border-[#C9A84C]/20 rounded-lg p-4 mb-4 text-center">
          <p className="text-xs text-white/50 mb-1">Số dư hiện tại</p>
          <p className="text-2xl font-black text-[#C9A84C]">5,234,550 ₫</p>
        </div>

        {step === "select" ? (
          <>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Amount Input */}
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
                  {["500000", "1000000", "2000000", "3000000"].map(amount => (
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

                {/* Withdrawal Method Selection */}
                <div className="mt-6">
                  <p className="text-sm font-bold text-white mb-3">Phương thức rút tiền</p>

                  {/* Bank Withdrawal */}
                  <div
                    onClick={() => {
                      setSelectedMethod("bank");
                      form.setValue("withdrawalMethod", "bank");
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
                        <p className="font-bold text-white">Rút về tài khoản ngân hàng</p>
                        <p className="text-xs text-white/50">1-24 giờ</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${selectedMethod === "bank" ? "bg-[#C9A84C] border-[#C9A84C]" : "border-[#C9A84C]/30"}`} />
                    </div>
                  </div>

                  {/* Bank Selection */}
                  {selectedMethod === "bank" && (
                    <div className="mb-4 space-y-2 bg-[#1A1A2E] border border-[#C9A84C]/10 rounded-lg p-3">
                      <p className="text-xs font-bold text-white/60">Chọn ngân hàng</p>
                      <div className="grid grid-cols-3 gap-2">
                        {bankOptions.map(bank => (
                          <button
                            key={bank.id}
                            type="button"
                            onClick={() => {
                              setSelectedBank(bank.id);
                              form.setValue("bankName", bank.name);
                            }}
                            className={`py-2 px-2 text-xs font-bold rounded border transition ${
                              selectedBank === bank.id
                                ? "bg-[#C9A84C]/20 border-[#C9A84C]"
                                : "bg-[#0D0D1A] border-[#C9A84C]/20 hover:border-[#C9A84C]/50"
                            }`}
                          >
                            {bank.shortName}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bank Details */}
                  {selectedMethod === "bank" && selectedBank && (
                    <div className="space-y-3 mb-4 bg-[#1A1A2E] border border-[#C9A84C]/10 rounded-lg p-3">
                      <FormField
                        control={form.control}
                        name="accountNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Số tài khoản"
                                className="h-10 bg-[#0D0D1A] border border-[#C9A84C]/30 text-white placeholder:text-white/30 focus:border-[#C9A84C]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-[#C0272D]" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="accountHolder"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Tên chủ tài khoản"
                                className="h-10 bg-[#0D0D1A] border border-[#C9A84C]/30 text-white placeholder:text-white/30 focus:border-[#C9A84C]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-[#C0272D]" />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* E-wallet Withdrawal */}
                  <div
                    onClick={() => {
                      setSelectedMethod("ewallet");
                      form.setValue("withdrawalMethod", "ewallet");
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
                        <p className="font-bold text-white">Rút về ví điện tử</p>
                        <p className="text-xs text-white/50">Momo, ZaloPay</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${selectedMethod === "ewallet" ? "bg-[#C9A84C] border-[#C9A84C]" : "border-[#C9A84C]/30"}`} />
                    </div>
                  </div>

                  {/* E-wallet Selection */}
                  {selectedMethod === "ewallet" && (
                    <div className="mt-3 grid grid-cols-2 gap-2 mb-4">
                      {ewalletMethods.map(method => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => {
                            setSelectedEwallet(method.id);
                            form.setValue("ewalletType", method.id);
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

                  {/* E-wallet Phone */}
                  {selectedMethod === "ewallet" && selectedEwallet && (
                    <div className="mb-4">
                      <FormField
                        control={form.control}
                        name="ewalletPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Số điện thoại"
                                className="h-10 bg-[#1A1A2E] border border-[#C9A84C]/30 text-white placeholder:text-white/30 focus:border-[#C9A84C]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-[#C0272D]" />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-md font-bold bg-gradient-to-br from-[#C9A84C] to-[#E8C96A] text-[#0D0D1A] hover:opacity-90 border-none mt-6"
                  disabled={!form.watch("withdrawalMethod") || !form.watch("amount")}
                >
                  TIẾP TỤC
                </Button>
              </form>
            </Form>
          </>
        ) : (
          <>
            {/* Confirmation Summary */}
            <div className="bg-[#1A1A2E] border border-[#C9A84C]/20 rounded-xl p-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">Số tiền rút</span>
                  <span className="text-xl font-bold text-[#C9A84C]">{Number(form.watch("amount")).toLocaleString("vi-VN")} ₫</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#C9A84C]/10">
                  <span className="text-sm text-white/60">Phí xử lý</span>
                  <span className="text-sm font-bold text-white">Miễn phí</span>
                </div>
              </div>
            </div>

            {/* Bank Details Display */}
            {selectedMethod === "bank" && (
              <div className="bg-[#1A1A2E] border border-[#C9A84C]/20 rounded-lg p-4 mb-4 space-y-2">
                <p className="text-xs font-bold text-white/60">Thông tin tài khoản</p>
                <div>
                  <p className="text-xs text-white/50">Ngân hàng</p>
                  <p className="font-bold text-white">{form.watch("bankName")}</p>
                </div>
                <div>
                  <p className="text-xs text-white/50">Số tài khoản</p>
                  <p className="font-bold text-white">{form.watch("accountNumber")}</p>
                </div>
                <div>
                  <p className="text-xs text-white/50">Chủ tài khoản</p>
                  <p className="font-bold text-white">{form.watch("accountHolder")}</p>
                </div>
              </div>
            )}

            {/* E-wallet Details Display */}
            {selectedMethod === "ewallet" && (
              <div className="bg-[#1A1A2E] border border-[#C9A84C]/20 rounded-lg p-4 mb-4 space-y-2 text-center">
                <p className="text-2xl mb-2">{ewalletMethods.find(m => m.id === selectedEwallet)?.icon}</p>
                <p className="font-bold text-white mb-3">{ewalletMethods.find(m => m.id === selectedEwallet)?.name}</p>
                <div>
                  <p className="text-xs text-white/50">Số điện thoại</p>
                  <p className="font-bold text-white">{form.watch("ewalletPhone")}</p>
                </div>
              </div>
            )}

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-4">
              <p className="text-xs text-blue-100">
                <span className="font-bold">Lưu ý:</span> Yêu cầu rút tiền sẽ được xử lý trong 1-24 giờ. Vui lòng không đóng ứng dụng cho đến khi quá trình hoàn tất.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => {
                  setStep("select");
                  setSelectedMethod(null);
                  setSelectedBank(null);
                  setSelectedEwallet(null);
                }}
                className="flex-1 h-12 text-md font-bold bg-[#1A1A2E] border border-[#C9A84C]/30 text-[#C9A84C] hover:border-[#C9A84C]"
              >
                QUAY LẠI
              </Button>
              <Button
                type="button"
                onClick={() => {
                  toast.success("Yêu cầu rút tiền đã được gửi!");
                  setStep("select");
                  setSelectedMethod(null);
                  setSelectedBank(null);
                  setSelectedEwallet(null);
                  form.reset();
                }}
                className="flex-1 h-12 text-md font-bold bg-gradient-to-br from-[#C9A84C] to-[#E8C96A] text-[#0D0D1A] hover:opacity-90 border-none"
              >
                XÁC NHẬN RÚT TIỀN
              </Button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
