"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
    content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <div className="assistant-prose">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    code({ className, children, ...props }) {
                        const isBlock = !!className;
                        if (isBlock) {
                            return (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        }
                        return <code {...props}>{children}</code>;
                    },

                    table({ children }) {
                        return (
                            <div className="overflow-x-auto">
                                <table>{children}</table>
                            </div>
                        );
                    },

                    a({ href, children, ...props }) {
                        return (
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                {...props}
                            >
                                {children}
                            </a>
                        );
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
