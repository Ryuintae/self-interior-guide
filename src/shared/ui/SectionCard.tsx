import type { ReactNode } from "react";

type SectionCardProps = {
    children?: ReactNode;
    className?: string;
};

export default function SectionCard({
                                        children,
                                        className = "",
                                    }: SectionCardProps) {
    return (
        <section
            className={`rounded-[28px] bg-[#fbfcfe] p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)] ring-1 ring-slate-200 ${className}`}
        >
            {children}
        </section>
    );
}