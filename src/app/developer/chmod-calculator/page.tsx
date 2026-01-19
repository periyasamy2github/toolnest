"use client";

import { useState, useEffect } from "react";
import { m } from "framer-motion";
import {
    Terminal,
    Copy,
    Check,
    Shield,
    Users,
    User,
    Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

type Permission = {
    read: boolean;
    write: boolean;
    execute: boolean;
};

export default function ChmodCalculator() {
    const [owner, setOwner] = useState<Permission>({ read: true, write: true, execute: false });
    const [group, setGroup] = useState<Permission>({ read: true, write: false, execute: false });
    const [public_, setPublic] = useState<Permission>({ read: true, write: false, execute: false });
    const [octal, setOctal] = useState("644");
    const [symbolic, setSymbolic] = useState("-rw-r--r--");
    const [copied, setCopied] = useState<string | null>(null);

    useEffect(() => {
        calculatePermissions();
    }, [owner, group, public_]);

    const calculatePermissions = () => {
        const getOctal = (p: Permission) => {
            return (p.read ? 4 : 0) + (p.write ? 2 : 0) + (p.execute ? 1 : 0);
        };

        const getSymbolic = (p: Permission) => {
            return (p.read ? "r" : "-") + (p.write ? "w" : "-") + (p.execute ? "x" : "-");
        };

        const octalStr = `${getOctal(owner)}${getOctal(group)}${getOctal(public_)}`;
        const symbolicStr = `-${getSymbolic(owner)}${getSymbolic(group)}${getSymbolic(public_)}`;

        setOctal(octalStr);
        setSymbolic(symbolicStr);
    };

    const updatePermission = (
        type: "owner" | "group" | "public",
        field: keyof Permission
    ) => {
        const setter = type === "owner" ? setOwner : type === "group" ? setGroup : setPublic;
        setter((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const copyToClipboard = (text: string, key: string) => {
        navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(null), 2000);
    };

    const PermissionBlock = ({
        title,
        icon: Icon,
        state,
        type
    }: {
        title: string;
        icon: any;
        state: Permission;
        type: "owner" | "group" | "public"
    }) => (
        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <Icon size={20} />
                </div>
                <h3 className="font-bold text-white">{title}</h3>
            </div>

            <div className="space-y-3">
                {[
                    { key: "read", label: "Read (4)", letter: "r" },
                    { key: "write", label: "Write (2)", letter: "w" },
                    { key: "execute", label: "Execute (1)", letter: "x" },
                ].map((perm) => (
                    <label
                        key={perm.key}
                        className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-white/5 cursor-pointer hover:bg-zinc-900 transition-colors group"
                    >
                        <div className="flex items-center gap-3">
                            <div className={cn(
                                "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                                state[perm.key as keyof Permission]
                                    ? "bg-blue-500 border-blue-500"
                                    : "border-zinc-600 group-hover:border-zinc-500"
                            )}>
                                {state[perm.key as keyof Permission] && <Check size={12} className="text-white" />}
                            </div>
                            <span className="text-sm text-zinc-300">{perm.label}</span>
                        </div>
                        <span className={cn(
                            "font-mono text-sm font-bold",
                            state[perm.key as keyof Permission] ? "text-blue-400" : "text-zinc-700"
                        )}>
                            {perm.letter}
                        </span>
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={state[perm.key as keyof Permission]}
                            onChange={() => updatePermission(type, perm.key as keyof Permission)}
                        />
                    </label>
                ))}
            </div>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Chmod <span className="text-blue-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Calculate Linux file permissions in octal and symbolic formats.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PermissionBlock title="Owner" icon={User} state={owner} type="owner" />
                <PermissionBlock title="Group" icon={Users} state={group} type="group" />
                <PermissionBlock title="Public" icon={Globe} state={public_} type="public" />
            </div>

            {/* Output Section */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Octal Output */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Octal (Numeric)</label>
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity blur" />
                            <div className="relative bg-zinc-950 border border-white/10 rounded-xl p-6 flex items-center justify-between gap-4">
                                <div className="font-mono text-4xl font-bold text-white tracking-widest">
                                    {octal}
                                </div>
                                <button
                                    onClick={() => copyToClipboard(octal, "octal")}
                                    className="p-2 text-zinc-400 hover:text-blue-400 transition-colors"
                                >
                                    {copied === "octal" ? <Check size={24} className="text-emerald-400" /> : <Copy size={24} />}
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={() => copyToClipboard(`chmod ${octal} filename`, "cmd-octal")}
                                className="text-xs text-zinc-500 hover:text-white flex items-center gap-1 transition-colors"
                            >
                                <Terminal size={12} />
                                Copy command: chmod {octal} filename
                                {copied === "cmd-octal" && <Check size={12} className="text-emerald-400" />}
                            </button>
                        </div>
                    </div>

                    {/* Symbolic Output */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Symbolic (Text)</label>
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity blur" />
                            <div className="relative bg-zinc-950 border border-white/10 rounded-xl p-6 flex items-center justify-between gap-4">
                                <div className="font-mono text-2xl font-bold text-white tracking-widest">
                                    {symbolic}
                                </div>
                                <button
                                    onClick={() => copyToClipboard(symbolic, "symbolic")}
                                    className="p-2 text-zinc-400 hover:text-purple-400 transition-colors"
                                >
                                    {copied === "symbolic" ? <Check size={24} className="text-emerald-400" /> : <Copy size={24} />}
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={() => copyToClipboard(`chmod ${symbolic} filename`, "cmd-symbolic")}
                                className="text-xs text-zinc-500 hover:text-white flex items-center gap-1 transition-colors"
                            >
                                <Terminal size={12} />
                                Copy command: chmod {symbolic} filename
                                {copied === "cmd-symbolic" && <Check size={12} className="text-emerald-400" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
