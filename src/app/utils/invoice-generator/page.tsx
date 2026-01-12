"use client";

import { useState, useRef } from "react";
import { ArrowLeft, Plus, Trash2, Download, Upload, FileText, Building2, User, Hash, Coins, CreditCard, Percent } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    rate: number;
}

const currencies = [
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
    { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
    { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
    { code: "SAR", symbol: "﷼", name: "Saudi Riyal" },
    { code: "CHF", symbol: "Fr", name: "Swiss Franc" },
    { code: "MYR", symbol: "RM", name: "Malaysian Ringgit" },
    { code: "THB", symbol: "฿", name: "Thai Baht" },
    { code: "KRW", symbol: "₩", name: "South Korean Won" },
    { code: "BRL", symbol: "R$", name: "Brazilian Real" },
    { code: "MXN", symbol: "$", name: "Mexican Peso" },
    { code: "ZAR", symbol: "R", name: "South African Rand" },
    { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar" },
    { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar" },
];

const paymentTerms = [
    "Due on Receipt",
    "Net 7 Days",
    "Net 15 Days",
    "Net 30 Days",
    "Net 45 Days",
    "Net 60 Days",
    "Net 90 Days",
];

type Template = "modern" | "classic";
type DiscountType = "percentage" | "fixed";

export default function InvoiceGeneratorPage() {
    const invoiceRef = useRef<HTMLDivElement>(null);
    const [logo, setLogo] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [currency, setCurrency] = useState(currencies[0]);
    const [template, setTemplate] = useState<Template>("modern");
    const [discountType, setDiscountType] = useState<DiscountType>("percentage");
    const [discountValue, setDiscountValue] = useState(0);

    const [invoiceData, setInvoiceData] = useState({
        invoiceNumber: "INV-001",
        date: "",
        dueDate: "",
        paymentTerms: "Net 30 Days",
        fromName: "",
        fromEmail: "",
        fromAddress: "",
        toName: "",
        toEmail: "",
        toAddress: "",
        notes: "",
        taxRate: 0,
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        accountName: "",
    });

    const [items, setItems] = useState<InvoiceItem[]>([
        { id: "1", description: "", quantity: 1, rate: 0 }
    ]);

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setLogo(e.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const addItem = () => {
        setItems([...items, { id: Date.now().toString(), description: "", quantity: 1, rate: 0 }]);
    };

    const removeItem = (id: string) => {
        if (items.length > 1) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
    const discountAmount = discountType === "percentage"
        ? subtotal * (discountValue / 100)
        : discountValue;
    const afterDiscount = subtotal - discountAmount;
    const tax = afterDiscount * (invoiceData.taxRate / 100);
    const total = afterDiscount + tax;

    const generatePDF = async () => {
        if (!invoiceRef.current) return;
        setIsGenerating(true);

        try {
            const canvas = await html2canvas(invoiceRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff"
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`invoice-${invoiceData.invoiceNumber}.pdf`);
        } catch (error) {
            console.error("Failed to generate PDF:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="max-w-[1600px] mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/utils" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">Invoice Generator</h1>
                    <p className="text-zinc-400 text-lg">Create professional invoices with advanced features.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Editor Panel */}
                <div className="space-y-6">
                    {/* Template Selection */}
                    <div className="glass-card p-6 space-y-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <FileText size={18} className="text-purple-400" /> Template Style
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setTemplate("modern")}
                                className={cn(
                                    "px-4 py-3 rounded-lg font-bold transition-all",
                                    template === "modern"
                                        ? "bg-blue-600 text-white"
                                        : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                                )}
                            >
                                Modern
                            </button>
                            <button
                                onClick={() => setTemplate("classic")}
                                className={cn(
                                    "px-4 py-3 rounded-lg font-bold transition-all",
                                    template === "classic"
                                        ? "bg-blue-600 text-white"
                                        : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                                )}
                            >
                                Classic
                            </button>
                        </div>
                    </div>

                    {/* Logo Upload */}
                    <div className="glass-card p-6 space-y-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Upload size={18} className="text-blue-400" /> Company Logo
                        </h3>
                        <div className="flex items-center gap-4">
                            {logo ? (
                                <div className="relative">
                                    <img src={logo} alt="Logo" className="h-16 w-auto object-contain rounded-lg bg-white p-2" />
                                    <button
                                        onClick={() => setLogo(null)}
                                        className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            ) : (
                                <label className="flex-1 h-20 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center cursor-pointer hover:border-blue-500/50 transition-colors">
                                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                                    <span className="text-zinc-400 text-sm">Click to upload logo</span>
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Invoice Details */}
                    <div className="glass-card p-6 space-y-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Hash size={18} className="text-purple-400" /> Invoice Details
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-zinc-400 uppercase tracking-wider">Invoice #</label>
                                <input
                                    type="text"
                                    value={invoiceData.invoiceNumber}
                                    onChange={(e) => setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })}
                                    className="w-full mt-1 px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-zinc-400 uppercase tracking-wider">Currency</label>
                                <select
                                    value={currency.code}
                                    onChange={(e) => setCurrency(currencies.find(c => c.code === e.target.value) || currencies[0])}
                                    className="w-full mt-1 px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                >
                                    {currencies.map((curr) => (
                                        <option key={curr.code} value={curr.code}>
                                            {curr.symbol} {curr.code}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs text-zinc-400 uppercase tracking-wider">Date</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="e.g., Jan 12, 2026"
                                        value={invoiceData.date}
                                        onChange={(e) => setInvoiceData({ ...invoiceData, date: e.target.value })}
                                        className="w-full mt-1 px-3 py-2 pr-10 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                    />
                                    <input
                                        type="date"
                                        onChange={(e) => {
                                            if (e.target.value) {
                                                const date = new Date(e.target.value);
                                                const formatted = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                                                setInvoiceData({ ...invoiceData, date: formatted });
                                            }
                                        }}
                                        className="absolute right-0 top-1 mt-1 w-10 h-[38px] opacity-0 cursor-pointer"
                                        style={{ colorScheme: 'dark' }}
                                    />
                                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 w-4 h-4 text-zinc-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-zinc-400 uppercase tracking-wider">Due Date</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="e.g., Feb 11, 2026"
                                        value={invoiceData.dueDate}
                                        onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
                                        className="w-full mt-1 px-3 py-2 pr-10 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                    />
                                    <input
                                        type="date"
                                        onChange={(e) => {
                                            if (e.target.value) {
                                                const date = new Date(e.target.value);
                                                const formatted = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                                                setInvoiceData({ ...invoiceData, dueDate: formatted });
                                            }
                                        }}
                                        className="absolute right-0 top-1 mt-1 w-10 h-[38px] opacity-0 cursor-pointer"
                                        style={{ colorScheme: 'dark' }}
                                    />
                                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 w-4 h-4 text-zinc-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <label className="text-xs text-zinc-400 uppercase tracking-wider">Payment Terms</label>
                                <select
                                    value={invoiceData.paymentTerms}
                                    onChange={(e) => setInvoiceData({ ...invoiceData, paymentTerms: e.target.value })}
                                    className="w-full mt-1 px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                >
                                    {paymentTerms.map((term) => (
                                        <option key={term} value={term}>{term}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* From / To */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="glass-card p-6 space-y-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Building2 size={18} className="text-green-400" /> From
                            </h3>
                            <input
                                type="text"
                                placeholder="Your Name / Company"
                                value={invoiceData.fromName}
                                onChange={(e) => setInvoiceData({ ...invoiceData, fromName: e.target.value })}
                                className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={invoiceData.fromEmail}
                                onChange={(e) => setInvoiceData({ ...invoiceData, fromEmail: e.target.value })}
                                className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                            />
                            <textarea
                                placeholder="Address"
                                value={invoiceData.fromAddress}
                                onChange={(e) => setInvoiceData({ ...invoiceData, fromAddress: e.target.value })}
                                className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 resize-none h-20"
                            />
                        </div>
                        <div className="glass-card p-6 space-y-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <User size={18} className="text-orange-400" /> Bill To
                            </h3>
                            <input
                                type="text"
                                placeholder="Client Name / Company"
                                value={invoiceData.toName}
                                onChange={(e) => setInvoiceData({ ...invoiceData, toName: e.target.value })}
                                className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={invoiceData.toEmail}
                                onChange={(e) => setInvoiceData({ ...invoiceData, toEmail: e.target.value })}
                                className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                            />
                            <textarea
                                placeholder="Address"
                                value={invoiceData.toAddress}
                                onChange={(e) => setInvoiceData({ ...invoiceData, toAddress: e.target.value })}
                                className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 resize-none h-20"
                            />
                        </div>
                    </div>

                    {/* Line Items */}
                    <div className="glass-card p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <FileText size={18} className="text-cyan-400" /> Items
                            </h3>
                            <button
                                onClick={addItem}
                                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg flex items-center gap-1"
                            >
                                <Plus size={14} /> Add Item
                            </button>
                        </div>
                        <div className="space-y-3">
                            {items.map((item, index) => (
                                <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                                    <input
                                        type="text"
                                        placeholder="Description"
                                        value={item.description}
                                        onChange={(e) => updateItem(item.id, "description", e.target.value)}
                                        className="col-span-6 px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Qty"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 0)}
                                        className="col-span-2 px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Rate"
                                        min="0"
                                        step="0.01"
                                        value={item.rate}
                                        onChange={(e) => updateItem(item.id, "rate", parseFloat(e.target.value) || 0)}
                                        className="col-span-3 px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                    />
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="col-span-1 p-2 text-zinc-500 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Discount, Tax & Bank Details */}
                    <div className="glass-card p-6 space-y-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Percent size={18} className="text-yellow-400" /> Discount & Tax
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="text-xs text-zinc-400 uppercase tracking-wider">Discount Type</label>
                                <select
                                    value={discountType}
                                    onChange={(e) => setDiscountType(e.target.value as DiscountType)}
                                    className="w-full mt-1 px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                >
                                    <option value="percentage">Percentage</option>
                                    <option value="fixed">Fixed Amount</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs text-zinc-400 uppercase tracking-wider">
                                    Discount {discountType === "percentage" ? "(%)" : `(${currency.symbol})`}
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={discountValue}
                                    onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                                    className="w-full mt-1 px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-zinc-400 uppercase tracking-wider">Tax Rate (%)</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={invoiceData.taxRate}
                                    onChange={(e) => setInvoiceData({ ...invoiceData, taxRate: parseFloat(e.target.value) || 0 })}
                                    className="w-full mt-1 px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bank Details */}
                    <div className="glass-card p-6 space-y-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <CreditCard size={18} className="text-green-400" /> Bank Details (Optional)
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Bank Name"
                                value={invoiceData.bankName}
                                onChange={(e) => setInvoiceData({ ...invoiceData, bankName: e.target.value })}
                                className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Account Name"
                                value={invoiceData.accountName}
                                onChange={(e) => setInvoiceData({ ...invoiceData, accountName: e.target.value })}
                                className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Account Number"
                                value={invoiceData.accountNumber}
                                onChange={(e) => setInvoiceData({ ...invoiceData, accountNumber: e.target.value })}
                                className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="IFSC / SWIFT Code"
                                value={invoiceData.ifscCode}
                                onChange={(e) => setInvoiceData({ ...invoiceData, ifscCode: e.target.value })}
                                className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="glass-card p-6 space-y-4">
                        <label className="text-xs text-zinc-400 uppercase tracking-wider">Notes</label>
                        <textarea
                            placeholder="Additional notes or payment terms..."
                            value={invoiceData.notes}
                            onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
                            className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 resize-none h-20"
                        />
                    </div>

                    {/* Download Button */}
                    <button
                        onClick={generatePDF}
                        disabled={isGenerating}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-blue-500/20 disabled:opacity-50"
                    >
                        <Download size={20} />
                        {isGenerating ? "Generating..." : "Download PDF"}
                    </button>
                </div>

                {/* Preview Panel */}
                <div className="glass-card p-4 overflow-auto max-h-[1200px]">
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Live Preview</h3>
                    <div
                        ref={invoiceRef}
                        className={cn(
                            "bg-white text-black p-8 rounded-lg shadow-2xl",
                            template === "classic" && "font-serif"
                        )}
                        style={{ minHeight: "900px" }}
                    >
                        {/* Invoice Header */}
                        <div className={cn(
                            "flex justify-between items-start mb-8",
                            template === "modern" && "pb-6 border-b-4 border-blue-600"
                        )}>
                            <div>
                                {logo && <img src={logo} alt="Logo" className="h-16 w-auto object-contain mb-4" />}
                                <h1 className={cn(
                                    "text-3xl font-black",
                                    template === "modern" ? "text-blue-600" : "text-gray-800"
                                )}>INVOICE</h1>
                            </div>
                            <div className="text-right text-sm text-gray-600">
                                <p className="font-bold text-gray-800 text-lg">{invoiceData.invoiceNumber}</p>
                                <p>Date: {invoiceData.date || "—"}</p>
                                <p>Due: {invoiceData.dueDate || "—"}</p>
                                <p className="text-xs mt-1 text-blue-600 font-semibold">{invoiceData.paymentTerms}</p>
                            </div>
                        </div>

                        {/* From / To */}
                        <div className="grid grid-cols-2 gap-8 mb-8">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase mb-2">From</p>
                                <p className="font-bold text-gray-800">{invoiceData.fromName || "Your Company"}</p>
                                <p className="text-sm text-gray-600">{invoiceData.fromEmail}</p>
                                <p className="text-sm text-gray-600 whitespace-pre-line">{invoiceData.fromAddress}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Bill To</p>
                                <p className="font-bold text-gray-800">{invoiceData.toName || "Client Name"}</p>
                                <p className="text-sm text-gray-600">{invoiceData.toEmail}</p>
                                <p className="text-sm text-gray-600 whitespace-pre-line">{invoiceData.toAddress}</p>
                            </div>
                        </div>

                        {/* Items Table */}
                        <table className="w-full mb-8">
                            <thead>
                                <tr className={cn(
                                    "border-b-2",
                                    template === "modern" ? "bg-blue-50 border-blue-200" : "border-gray-200"
                                )}>
                                    <th className="text-left py-3 px-2 text-xs font-bold text-gray-600 uppercase">Description</th>
                                    <th className="text-center py-3 px-2 text-xs font-bold text-gray-600 uppercase">Qty</th>
                                    <th className="text-right py-3 px-2 text-xs font-bold text-gray-600 uppercase">Rate</th>
                                    <th className="text-right py-3 px-2 text-xs font-bold text-gray-600 uppercase">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-100">
                                        <td className="py-3 px-2 text-gray-800">{item.description || "—"}</td>
                                        <td className="py-3 px-2 text-center text-gray-600">{item.quantity}</td>
                                        <td className="py-3 px-2 text-right text-gray-600">{currency.symbol}{item.rate.toFixed(2)}</td>
                                        <td className="py-3 px-2 text-right font-semibold text-gray-800">{currency.symbol}{(item.quantity * item.rate).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Totals */}
                        <div className="flex justify-end">
                            <div className="w-72 space-y-2">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>{currency.symbol}{subtotal.toFixed(2)}</span>
                                </div>
                                {discountValue > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount ({discountType === "percentage" ? `${discountValue}%` : "Fixed"})</span>
                                        <span>-{currency.symbol}{discountAmount.toFixed(2)}</span>
                                    </div>
                                )}
                                {invoiceData.taxRate > 0 && (
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax ({invoiceData.taxRate}%)</span>
                                        <span>{currency.symbol}{tax.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className={cn(
                                    "flex justify-between text-xl font-bold border-t-2 pt-2",
                                    template === "modern" ? "text-blue-600 border-blue-600" : "text-gray-800 border-gray-800"
                                )}>
                                    <span>Total</span>
                                    <span>{currency.symbol}{total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Bank Details */}
                        {invoiceData.bankName && (
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <p className="text-xs font-bold text-gray-400 uppercase mb-3">Bank Details</p>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-500">Bank Name</p>
                                        <p className="font-semibold text-gray-800">{invoiceData.bankName}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Account Name</p>
                                        <p className="font-semibold text-gray-800">{invoiceData.accountName}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Account Number</p>
                                        <p className="font-semibold text-gray-800">{invoiceData.accountNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">IFSC/SWIFT Code</p>
                                        <p className="font-semibold text-gray-800">{invoiceData.ifscCode}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Notes */}
                        {invoiceData.notes && (
                            <div className="mt-8 pt-4 border-t border-gray-200">
                                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Notes</p>
                                <p className="text-sm text-gray-600 whitespace-pre-line">{invoiceData.notes}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="glass-card p-4 bg-blue-500/10 border-blue-500/20">
                <p className="text-xs text-blue-200 text-center">
                    All data stays in your browser. Nothing is uploaded to any server.
                </p>
            </div>
        </div>
    );
}
