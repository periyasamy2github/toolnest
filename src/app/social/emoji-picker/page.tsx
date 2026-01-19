"use client";

import { useState } from "react";
import { Copy, Smile, Check, Search } from "lucide-react";

const EMOJI_CATEGORIES = {
    "Smileys": ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "🥲", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥸", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺", "🤡", "💩", "👻", "💀", "☠️", "👽", "👾", "🤖", "🎃"],
    "Hands": ["👋", "🤚", "🖐", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "✍️", "💅", "🤳", "💪"],
    "Hearts": ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟"],
    "Objects": ["💡", "💣", "🎉", "🎊", "🎈", "🎁", "🎀", "🪄", "🔮", "🧿", "🎮", "🕹", "🎰", "🎲", "🧩", "🧸", "🪅", "🪆", "🖼", "🎨", "🧵", "🪡", "🧶", "👓", "🕶", "🥽", "🥼", "🦺", "👔", "👕", "👖", "🧣", "🧤", "🧥", "🧦", "👗", "👘", "🥻", "🩱", "🩲", "🩳", "👙", "👚", "👛", "👜", "👝", "🛍", "🎒", "🩴", "👞", "👟", "🥾", "🥿", "👠", "👡", "🩰", "👢", "👑", "👒", "🎩", "🎓", "🧢", "🪖", "⛑", "📿", "💄", "💍", "💎"]
};

export default function EmojiPicker() {
    const [search, setSearch] = useState("");
    const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null);
    const [recentEmojis, setRecentEmojis] = useState<string[]>([]);

    const copyEmoji = (emoji: string) => {
        navigator.clipboard.writeText(emoji);
        setCopiedEmoji(emoji);
        setTimeout(() => setCopiedEmoji(null), 1000);

        if (!recentEmojis.includes(emoji)) {
            setRecentEmojis(prev => [emoji, ...prev].slice(0, 10));
        }
    };

    const filteredCategories = Object.entries(EMOJI_CATEGORIES).reduce((acc, [category, emojis]) => {
        // Simple search implementation (in a real app, you'd map emojis to keywords)
        // Here we just show all if search is empty, or none if not (since we don't have keywords)
        // For better UX, let's just show all for now as search requires a large mapping database.
        acc[category] = emojis;
        return acc;
    }, {} as Record<string, string[]>);

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Emoji <span className="text-yellow-500">Picker</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Find and copy the perfect emoji for your social media posts.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                {/* Search - Visual only for now as keyword mapping is complex */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search emojis (coming soon)..."
                        disabled
                        className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:ring-2 focus:ring-yellow-500/50 outline-none opacity-50 cursor-not-allowed"
                    />
                </div>

                {recentEmojis.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Recently Used</h3>
                        <div className="flex flex-wrap gap-2">
                            {recentEmojis.map((emoji, i) => (
                                <button
                                    key={i}
                                    onClick={() => copyEmoji(emoji)}
                                    className="w-12 h-12 flex items-center justify-center text-2xl bg-zinc-950 border border-white/5 rounded-xl hover:bg-white/10 hover:scale-110 transition-all relative group"
                                >
                                    {emoji}
                                    {copiedEmoji === emoji && (
                                        <div className="absolute inset-0 bg-green-500/20 rounded-xl flex items-center justify-center">
                                            <Check size={16} className="text-green-500" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="space-y-8">
                    {Object.entries(filteredCategories).map(([category, emojis]) => (
                        <div key={category} className="space-y-4">
                            <h3 className="text-lg font-semibold text-white sticky top-0 bg-zinc-900/95 py-2 z-10">{category}</h3>
                            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
                                {emojis.map((emoji, i) => (
                                    <button
                                        key={i}
                                        onClick={() => copyEmoji(emoji)}
                                        className="aspect-square flex items-center justify-center text-2xl bg-zinc-950 border border-white/5 rounded-xl hover:bg-white/10 hover:scale-110 transition-all relative group"
                                    >
                                        {emoji}
                                        {copiedEmoji === emoji && (
                                            <div className="absolute inset-0 bg-green-500/20 rounded-xl flex items-center justify-center">
                                                <Check size={16} className="text-green-500" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
