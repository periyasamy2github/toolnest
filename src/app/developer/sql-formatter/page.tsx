"use client";

import { useState } from "react";
import { ArrowLeft, Database, Copy, Check, RefreshCw, AlignLeft } from "lucide-react";
import Link from "next/link";
import { format } from "sql-formatter";

export default function SqlFormatterPage() {
    const [sql, setSql] = useState("");
    const [formattedSql, setFormattedSql] = useState("");
    const [copied, setCopied] = useState(false);
    const [dialect, setDialect] = useState("sql");

    const formatSql = () => {
        try {
            const result = format(sql, {
                language: dialect as any,
                uppercase: true,
            });
            setFormattedSql(result);
        } catch (e) {
            setFormattedSql("-- Error formatting SQL. Please check your syntax.");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(formattedSql);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/developer" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">SQL Formatter</h1>
                    <p className="text-zinc-400">Beautify and format your SQL queries for better readability.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                <Database size={16} />
                                SQL Input
                            </label>
                            <select
                                value={dialect}
                                onChange={(e) => setDialect(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-lg text-xs text-zinc-300 px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="sql">Standard SQL</option>
                                <option value="mysql">MySQL</option>
                                <option value="postgresql">PostgreSQL</option>
                                <option value="sqlite">SQLite</option>
                                <option value="mariadb">MariaDB</option>
                            </select>
                        </div>
                        <button
                            onClick={formatSql}
                            className="text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all flex items-center gap-2"
                        >
                            <RefreshCw size={14} />
                            Format
                        </button>
                    </div>
                    <div className="glass-card p-4 h-[500px]">
                        <textarea
                            value={sql}
                            onChange={(e) => setSql(e.target.value)}
                            className="w-full h-full bg-transparent border-none focus:outline-none text-zinc-200 font-mono text-sm resize-none placeholder:text-zinc-600"
                            placeholder="SELECT * FROM users WHERE id = 1;"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                            <AlignLeft size={16} />
                            Formatted Output
                        </label>
                        <button
                            onClick={copyToClipboard}
                            disabled={!formattedSql}
                            className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 text-zinc-300 rounded-lg transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                            {copied ? "Copied!" : "Copy SQL"}
                        </button>
                    </div>
                    <div className="glass-card p-4 h-[500px] overflow-auto">
                        <pre className="text-sm font-mono text-green-400 whitespace-pre-wrap">
                            {formattedSql || <span className="text-zinc-600">-- Formatted SQL will appear here...</span>}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
