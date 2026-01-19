"use client";

import { useState } from "react";
import { Network, RefreshCw } from "lucide-react";

export default function SubnetCalculator() {
    const [ip, setIp] = useState("192.168.1.1");
    const [mask, setMask] = useState("24");
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        try {
            // Basic calculation logic
            const ipParts = ip.split('.').map(Number);
            const cidr = parseInt(mask);

            if (ipParts.length !== 4 || ipParts.some(p => isNaN(p) || p < 0 || p > 255) || isNaN(cidr) || cidr < 0 || cidr > 32) {
                setResult({ error: "Invalid IP or CIDR" });
                return;
            }

            const ipNum = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
            const maskNum = -1 << (32 - cidr);
            const networkNum = ipNum & maskNum;
            const broadcastNum = networkNum | ~maskNum;

            const numHosts = Math.pow(2, 32 - cidr) - 2;

            const toIp = (num: number) => {
                return [
                    (num >>> 24) & 255,
                    (num >>> 16) & 255,
                    (num >>> 8) & 255,
                    num & 255
                ].join('.');
            };

            setResult({
                network: toIp(networkNum),
                broadcast: toIp(broadcastNum),
                netmask: toIp(maskNum),
                firstHost: toIp(networkNum + 1),
                lastHost: toIp(broadcastNum - 1),
                hosts: numHosts > 0 ? numHosts : 0,
                class: getIpClass(ipParts[0])
            });
        } catch (e) {
            setResult({ error: "Calculation failed" });
        }
    };

    const getIpClass = (firstOctet: number) => {
        if (firstOctet < 128) return "A";
        if (firstOctet < 192) return "B";
        if (firstOctet < 224) return "C";
        if (firstOctet < 240) return "D (Multicast)";
        return "E (Experimental)";
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Subnet <span className="text-blue-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Calculate network parameters for IPv4 subnets.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="grid md:grid-cols-3 gap-6 items-end">
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-medium text-zinc-400">IP Address</label>
                        <input
                            type="text"
                            value={ip}
                            onChange={(e) => setIp(e.target.value)}
                            placeholder="192.168.1.1"
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 outline-none font-mono"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">CIDR / Mask</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">/</span>
                            <input
                                type="number"
                                min="0"
                                max="32"
                                value={mask}
                                onChange={(e) => setMask(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 outline-none font-mono"
                            />
                        </div>
                    </div>
                </div>

                <button
                    onClick={calculate}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
                >
                    <Network size={20} />
                    Calculate
                </button>

                {result && !result.error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <ResultCard label="Network Address" value={result.network} />
                        <ResultCard label="Broadcast Address" value={result.broadcast} />
                        <ResultCard label="Netmask" value={result.netmask} />
                        <ResultCard label="First Host" value={result.firstHost} />
                        <ResultCard label="Last Host" value={result.lastHost} />
                        <ResultCard label="Total Hosts" value={result.hosts.toLocaleString()} />
                        <ResultCard label="IP Class" value={result.class} />
                        <ResultCard label="CIDR Notation" value={`/${mask}`} />
                    </div>
                )}
            </div>
        </div>
    );
}

function ResultCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-zinc-950 border border-white/5 rounded-xl p-4 space-y-1">
            <div className="text-xs text-zinc-500 uppercase tracking-wider">{label}</div>
            <div className="text-lg font-mono font-semibold text-white truncate" title={value}>{value}</div>
        </div>
    );
}
