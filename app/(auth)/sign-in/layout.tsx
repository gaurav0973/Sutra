import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="auth-shell">
            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Sutra branding above auth card */}
                <div className="flex flex-col items-center gap-3">
                    <div className="relative inline-flex items-center justify-center">
                        <span className="text-3xl" style={{ color: "var(--rope-tan, #C4956A)" }}>✦</span>
                    </div>
                    <span className="font-semibold text-lg tracking-wide" style={{ color: "var(--foreground)" }}>
                        Sutra
                    </span>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                        A thread connecting ideas
                    </p>
                    {/* Small rope divider */}
                    <div
                        className="h-[3px] w-16 rounded-full mt-1"
                        style={{
                            background: "repeating-linear-gradient(90deg, var(--rope-tan, #C4956A), var(--rope-tan, #C4956A) 3px, var(--rope-brown, #A0764A) 3px, var(--rope-brown, #A0764A) 6px)",
                            opacity: 0.5,
                        }}
                    />
                </div>

                {/* Clerk auth component */}
                {children}
            </div>
        </div>
    );
}

export default AuthLayout;
