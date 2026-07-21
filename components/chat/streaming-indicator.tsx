"use client";

export function StreamingIndicator() {
    return (
        <div className="flex items-center gap-3 py-2 px-1">
            {/* Rope weaving animation — three strands braiding */}
            <div className="thread-weave-indicator">
                <span className="thread-strand" />
                <span className="thread-strand" />
                <span className="thread-strand" />
            </div>
            <span className="text-[11px] text-muted-foreground/60 font-light italic">
                Weaving response…
            </span>
        </div>
    );
}
