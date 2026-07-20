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
                    // Headings
                    h1({ children }) {
                        return <h1 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#f5f0eb", marginTop: "1.25em", marginBottom: "0.5em" }}>{children}</h1>;
                    },
                    h2({ children }) {
                        return <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#f5f0eb", marginTop: "1.25em", marginBottom: "0.5em" }}>{children}</h2>;
                    },
                    h3({ children }) {
                        return <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#f5f0eb", marginTop: "1em", marginBottom: "0.4em" }}>{children}</h3>;
                    },

                    // Paragraphs
                    p({ children }) {
                        return <p style={{ marginBottom: "0.75em", lineHeight: 1.7 }}>{children}</p>;
                    },

                    // Bullet lists
                    ul({ children }) {
                        return (
                            <ul style={{
                                listStyleType: "disc",
                                paddingLeft: "1.5em",
                                marginBottom: "0.75em",
                                lineHeight: 1.7,
                            }}>
                                {children}
                            </ul>
                        );
                    },

                    // Numbered lists
                    ol({ children }) {
                        return (
                            <ol style={{
                                listStyleType: "decimal",
                                paddingLeft: "1.5em",
                                marginBottom: "0.75em",
                                lineHeight: 1.7,
                            }}>
                                {children}
                            </ol>
                        );
                    },

                    // List items
                    li({ children }) {
                        return (
                            <li style={{
                                marginBottom: "0.3em",
                                paddingLeft: "0.25em",
                            }}>
                                {children}
                            </li>
                        );
                    },

                    // Strong / Bold
                    strong({ children }) {
                        return <strong style={{ color: "#f5f0eb", fontWeight: 600 }}>{children}</strong>;
                    },

                    // Emphasis / Italic
                    em({ children }) {
                        return <em style={{ color: "#c4b8ab" }}>{children}</em>;
                    },

                    // Blockquote
                    blockquote({ children }) {
                        return (
                            <blockquote style={{
                                borderLeft: "3px solid #c4956a",
                                paddingLeft: "1em",
                                margin: "1em 0",
                                color: "#b0a89e",
                                fontStyle: "italic",
                            }}>
                                {children}
                            </blockquote>
                        );
                    },

                    // Horizontal rule
                    hr() {
                        return <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.08)", margin: "1.5em 0" }} />;
                    },

                    // Code blocks
                    pre({ children }) {
                        return (
                            <pre style={{
                                background: "#1e1e1e",
                                border: "1px solid rgba(255,255,255,0.06)",
                                borderRadius: "0.75rem",
                                padding: "1rem 1.25rem",
                                overflowX: "auto",
                                margin: "1em 0",
                                fontSize: "0.875rem",
                                lineHeight: 1.6,
                            }}>
                                {children}
                            </pre>
                        );
                    },

                    // Inline + block code
                    code({ className, children, ...props }) {
                        const isBlock = !!className;
                        if (isBlock) {
                            return (
                                <code style={{ background: "transparent", padding: 0, color: "#d4d0cb", fontSize: "inherit" }} className={className} {...props}>
                                    {children}
                                </code>
                            );
                        }
                        return (
                            <code style={{
                                background: "rgba(255,255,255,0.08)",
                                padding: "0.15em 0.4em",
                                borderRadius: "0.25rem",
                                fontSize: "0.875em",
                                fontFamily: "var(--font-mono), ui-monospace, monospace",
                                color: "#c4956a",
                            }} {...props}>
                                {children}
                            </code>
                        );
                    },

                    // Tables
                    table({ children }) {
                        return (
                            <div style={{ overflowX: "auto", margin: "1em 0" }}>
                                <table style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                    fontSize: "0.9rem",
                                }}>
                                    {children}
                                </table>
                            </div>
                        );
                    },
                    thead({ children }) {
                        return <thead>{children}</thead>;
                    },
                    th({ children }) {
                        return (
                            <th style={{
                                background: "rgba(255,255,255,0.05)",
                                padding: "0.5rem 0.75rem",
                                textAlign: "left",
                                fontWeight: 600,
                                borderBottom: "1px solid rgba(255,255,255,0.1)",
                                color: "#f5f0eb",
                            }}>
                                {children}
                            </th>
                        );
                    },
                    td({ children }) {
                        return (
                            <td style={{
                                padding: "0.5rem 0.75rem",
                                borderBottom: "1px solid rgba(255,255,255,0.05)",
                            }}>
                                {children}
                            </td>
                        );
                    },

                    // Links
                    a({ href, children, ...props }) {
                        return (
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: "#c4956a",
                                    textDecoration: "underline",
                                    textUnderlineOffset: "2px",
                                }}
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
