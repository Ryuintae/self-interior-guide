import type { ReactNode } from "react";

type PageShellProps = {
    eyebrow?: string;
    title: string;
    description?: string;
    headerAction?: ReactNode;
    children?: ReactNode;
};

export default function PageShell({
                                      eyebrow,
                                      title,
                                      description,
                                      headerAction,
                                      children,
                                  }: PageShellProps) {
    return (
        <main className="min-h-screen bg-[#eef2f7] px-4 py-6 sm:px-6 sm:py-8">
            <div className="mx-auto max-w-7xl">
                <div className="rounded-[36px] bg-white p-4 shadow-[0_24px_60px_rgba(15,23,42,0.08)] ring-1 ring-black/5 sm:p-6 lg:p-7">
                    <div className="rounded-[28px] bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.05)] ring-1 ring-black/5">
                        <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                                {eyebrow ? (
                                    <p className="text-xs font-semibold tracking-[0.18em] text-slate-500">
                                        {eyebrow}
                                    </p>
                                ) : null}

                                <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-slate-950">
                                    {title}
                                </h1>

                                {description ? (
                                    <p className="mt-3 text-[15px] leading-7 text-slate-600">
                                        {description}
                                    </p>
                                ) : null}
                            </div>

                            {headerAction ? <div className="shrink-0">{headerAction}</div> : null}
                        </div>
                    </div>

                    {children ? <div className="mt-6">{children}</div> : null}
                </div>
            </div>
        </main>
    );
}