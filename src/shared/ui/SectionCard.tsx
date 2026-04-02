import type { ReactNode } from "react";

type SectionCardProps = {
    title?: string;
    description?: ReactNode;
    children?: ReactNode;
    className?: string;
};

export default function SectionCard({
                                        title,
                                        description,
                                        children,
                                        className = "",
                                    }: SectionCardProps) {
    return (
        <section
            className={`rounded-[28px] bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] ring-1 ring-black/5 ${className}`}
        >
            {title || description ? (
                <div>
                    {title ? (
                        <h2 className="text-lg font-semibold tracking-[-0.02em] text-slate-950">
                            {title}
                        </h2>
                    ) : null}

                    {description ? (
                        <p className="mt-2 text-sm leading-6 text-slate-600 whitespace-pre-line">
                            {description}
                        </p>
                    ) : null}
                </div>
            ) : null}

            {children ? (
                <div className={title || description ? "mt-4" : ""}>
                    {children}
                </div>
            ) : null}
        </section>
    );
}