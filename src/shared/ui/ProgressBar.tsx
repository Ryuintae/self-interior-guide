type ProgressBarProps = {
    value: number;
};

export default function ProgressBar({ value }: ProgressBarProps) {
    const safeValue = Math.max(0, Math.min(100, value));

    return (
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
                className="h-full rounded-full bg-slate-950 transition-all"
                style={{ width: `${safeValue}%` }}
            />
        </div>
    );
}