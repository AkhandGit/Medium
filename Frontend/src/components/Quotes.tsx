import React from "react";

interface QuotesProps {
    quote: string;
    author: string;
    title: string;
}

export const Quotes: React.FC<QuotesProps> = ({ quote, author, title }) => (
    <div style={{ maxWidth: 600, padding: 40 }}>
        <div style={{ fontSize: 28, fontWeight: 600, marginBottom: 32 }}>
            {`“${quote}“`}
        </div>
        <div>
            <div style={{ fontWeight: 700 }}>{author}</div>
            <div style={{ color: "#6b7280" }}>{title}</div>
        </div>
    </div>
);