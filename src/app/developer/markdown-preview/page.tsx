"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, FileCode2, Eye, Edit3 } from "lucide-react";
import Link from "next/link";
import { marked } from "marked";

export default function MarkdownPreviewPage() {
    const [markdown, setMarkdown] = useState("# Welcome to ToolNest\n\nEdit this text to see the **live preview**.\n\n- Feature 1\n- Feature 2\n\n```javascript\nconsole.log('Hello World');\n```");
    const [html, setHtml] = useState("");

    useEffect(() => {
        // Configure marked renderer for images
        const renderer = new marked.Renderer();
        const originalImageRenderer = renderer.image.bind(renderer);

        renderer.image = (href, title, text) => {
            // Add crossorigin attribute to images
            const img = originalImageRenderer(href, title, text);
            return img.replace('<img', '<img crossorigin="anonymous" loading="lazy"');
        };

        marked.setOptions({
            renderer: renderer,
            breaks: true,
            gfm: true,
        });

        const renderMarkdown = async () => {
            try {
                const result = await marked.parse(markdown);
                setHtml(result);
            } catch (error) {
                console.error('Markdown parsing error:', error);
                setHtml('<p class="text-red-400">Error rendering markdown</p>');
            }
        };
        renderMarkdown();
    }, [markdown]);

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/developer" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">Markdown Previewer</h1>
                    <p className="text-zinc-400">Write Markdown and see the rendered HTML in real-time.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                            <Edit3 size={16} />
                            Markdown Editor
                        </label>
                    </div>
                    <div className="glass-card p-4 h-[600px]">
                        <textarea
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                            className="w-full h-full bg-transparent border-none focus:outline-none text-zinc-200 font-mono text-sm resize-none placeholder:text-zinc-600"
                            placeholder="# Enter markdown here..."
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                            <Eye size={16} />
                            Live Preview
                        </label>
                    </div>
                    <div className="glass-card p-6 h-[600px] overflow-auto prose prose-invert max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: html }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
