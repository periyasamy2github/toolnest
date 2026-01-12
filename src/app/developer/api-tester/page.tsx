"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Send, Copy, Check, Trash2, Clock, Globe2, Code2, FileJson, Key, Plus, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface Header {
    id: string;
    key: string;
    value: string;
    enabled: boolean;
}

interface HistoryItem {
    id: string;
    method: HttpMethod;
    url: string;
    timestamp: number;
    status?: number;
}

export default function ApiTesterPage() {
    const [method, setMethod] = useState<HttpMethod>("GET");
    const [url, setUrl] = useState("");
    const [headers, setHeaders] = useState<Header[]>([
        { id: "1", key: "Content-Type", value: "application/json", enabled: true }
    ]);
    const [body, setBody] = useState("");
    const [response, setResponse] = useState<string>("");
    const [responseStatus, setResponseStatus] = useState<number | null>(null);
    const [responseTime, setResponseTime] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [activeTab, setActiveTab] = useState<"headers" | "body">("headers");

    useEffect(() => {
        const saved = localStorage.getItem("api-tester-history");
        if (saved) setHistory(JSON.parse(saved));
    }, []);

    const saveToHistory = (item: HistoryItem) => {
        const updated = [item, ...history.slice(0, 19)];
        setHistory(updated);
        localStorage.setItem("api-tester-history", JSON.stringify(updated));
    };

    const sendRequest = async () => {
        if (!url) return;
        setLoading(true);
        setResponse("");
        setResponseStatus(null);
        setResponseTime(null);

        const startTime = performance.now();

        try {
            const headerObj: Record<string, string> = {};
            headers.filter(h => h.enabled && h.key).forEach(h => {
                headerObj[h.key] = h.value;
            });

            const options: RequestInit = {
                method,
                headers: headerObj,
            };

            if (["POST", "PUT", "PATCH"].includes(method) && body) {
                options.body = body;
            }

            const res = await fetch(url, options);
            const endTime = performance.now();
            setResponseTime(Math.round(endTime - startTime));
            setResponseStatus(res.status);

            const contentType = res.headers.get("content-type");
            let data: string;

            if (contentType?.includes("application/json")) {
                const json = await res.json();
                data = JSON.stringify(json, null, 2);
            } else {
                data = await res.text();
            }

            setResponse(data);
            saveToHistory({
                id: Date.now().toString(),
                method,
                url,
                timestamp: Date.now(),
                status: res.status
            });
        } catch (error: any) {
            const endTime = performance.now();
            setResponseTime(Math.round(endTime - startTime));
            setResponse(`Error: ${error.message}`);
            setResponseStatus(0);
        } finally {
            setLoading(false);
        }
    };

    const copyResponse = () => {
        navigator.clipboard.writeText(response);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const addHeader = () => {
        setHeaders([...headers, { id: Date.now().toString(), key: "", value: "", enabled: true }]);
    };

    const removeHeader = (id: string) => {
        setHeaders(headers.filter(h => h.id !== id));
    };

    const updateHeader = (id: string, field: keyof Header, value: string | boolean) => {
        setHeaders(headers.map(h => h.id === id ? { ...h, [field]: value } : h));
    };

    const loadFromHistory = (item: HistoryItem) => {
        setMethod(item.method);
        setUrl(item.url);
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem("api-tester-history");
    };

    const methodColors: Record<HttpMethod, string> = {
        GET: "bg-green-500/20 text-green-400 border-green-500/30",
        POST: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        PUT: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        PATCH: "bg-orange-500/20 text-orange-400 border-orange-500/30",
        DELETE: "bg-red-500/20 text-red-400 border-red-500/30"
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/developer" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">API Tester</h1>
                    <p className="text-zinc-400 text-lg">Test REST APIs directly in your browser.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                {/* Main Panel */}
                <div className="xl:col-span-3 space-y-6">
                    {/* Request Bar */}
                    <div className="glass-card p-4">
                        <div className="flex gap-3">
                            <select
                                value={method}
                                onChange={(e) => setMethod(e.target.value as HttpMethod)}
                                className={cn(
                                    "px-4 py-3 rounded-lg font-bold text-sm border focus:outline-none",
                                    methodColors[method],
                                    "bg-zinc-900"
                                )}
                            >
                                {(["GET", "POST", "PUT", "PATCH", "DELETE"] as HttpMethod[]).map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://api.example.com/endpoint"
                                className="flex-1 px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            />
                            <button
                                onClick={sendRequest}
                                disabled={loading || !url}
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg flex items-center gap-2 disabled:opacity-50 transition-colors"
                            >
                                <Send size={18} />
                                {loading ? "Sending..." : "Send"}
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="glass-card p-4">
                        <div className="flex gap-2 border-b border-white/10 pb-4 mb-4">
                            <button
                                onClick={() => setActiveTab("headers")}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2",
                                    activeTab === "headers" ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-white"
                                )}
                            >
                                <Key size={16} /> Headers
                            </button>
                            <button
                                onClick={() => setActiveTab("body")}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2",
                                    activeTab === "body" ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-white"
                                )}
                            >
                                <FileJson size={16} /> Body
                            </button>
                        </div>

                        {activeTab === "headers" && (
                            <div className="space-y-3">
                                {headers.map((header) => (
                                    <div key={header.id} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={header.enabled}
                                            onChange={(e) => updateHeader(header.id, "enabled", e.target.checked)}
                                            className="w-4 h-4 rounded"
                                        />
                                        <input
                                            type="text"
                                            value={header.key}
                                            onChange={(e) => updateHeader(header.id, "key", e.target.value)}
                                            placeholder="Key"
                                            className="flex-1 px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                        />
                                        <input
                                            type="text"
                                            value={header.value}
                                            onChange={(e) => updateHeader(header.id, "value", e.target.value)}
                                            placeholder="Value"
                                            className="flex-1 px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                        />
                                        <button
                                            onClick={() => removeHeader(header.id)}
                                            className="p-2 text-zinc-500 hover:text-red-400"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={addHeader}
                                    className="px-3 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                >
                                    <Plus size={14} /> Add Header
                                </button>
                            </div>
                        )}

                        {activeTab === "body" && (
                            <textarea
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                placeholder='{"key": "value"}'
                                className="w-full h-48 px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-blue-500 resize-none"
                            />
                        )}
                    </div>

                    {/* Response */}
                    <div className="glass-card p-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                                    <Code2 size={16} className="text-purple-400" /> Response
                                </span>
                                {responseStatus !== null && (
                                    <span className={cn(
                                        "px-2 py-1 rounded text-xs font-bold",
                                        responseStatus >= 200 && responseStatus < 300 ? "bg-green-500/20 text-green-400" :
                                            responseStatus >= 400 ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"
                                    )}>
                                        {responseStatus}
                                    </span>
                                )}
                                {responseTime !== null && (
                                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                                        <Clock size={12} /> {responseTime}ms
                                    </span>
                                )}
                            </div>
                            {response && (
                                <button
                                    onClick={copyResponse}
                                    className="text-xs font-bold text-zinc-500 hover:text-blue-400 flex items-center gap-1"
                                >
                                    {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                    {copied ? "Copied!" : "Copy"}
                                </button>
                            )}
                        </div>
                        <pre className="w-full h-80 p-4 bg-zinc-900 border border-white/10 rounded-lg text-zinc-300 font-mono text-sm overflow-auto">
                            {response || <span className="text-zinc-600 italic">Response will appear here...</span>}
                        </pre>
                    </div>
                </div>

                {/* History Sidebar */}
                <div className="xl:col-span-1">
                    <div className="glass-card p-4 sticky top-24">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                                <Clock size={14} /> History
                            </h3>
                            {history.length > 0 && (
                                <button onClick={clearHistory} className="text-xs text-zinc-500 hover:text-red-400">
                                    <Trash2 size={14} />
                                </button>
                            )}
                        </div>
                        <div className="space-y-2 max-h-96 overflow-auto">
                            {history.length === 0 ? (
                                <p className="text-xs text-zinc-600 text-center py-8">No requests yet</p>
                            ) : (
                                history.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => loadFromHistory(item)}
                                        className="w-full text-left p-3 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors"
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={cn(
                                                "px-1.5 py-0.5 rounded text-[10px] font-bold",
                                                methodColors[item.method]
                                            )}>
                                                {item.method}
                                            </span>
                                            {item.status && (
                                                <span className={cn(
                                                    "text-[10px]",
                                                    item.status >= 200 && item.status < 300 ? "text-green-400" : "text-red-400"
                                                )}>
                                                    {item.status}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-zinc-400 truncate">{item.url}</p>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-card p-4 bg-blue-500/10 border-blue-500/20">
                <p className="text-xs text-blue-200 text-center">
                    Requests are made directly from your browser. Some APIs may require CORS headers.
                </p>
            </div>
        </div>
    );
}
