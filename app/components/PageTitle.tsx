import { ReactNode } from 'react';

interface PageTitleProps {
    title: string;
    subtitle?: string;
    icon?: ReactNode;
    action?: ReactNode; // for buttons or links on the right
    className?: string;
}

export default function PageTitle({
    title,
    subtitle,
    icon,
    action,
    className = ''
}: PageTitleProps) {
    return (
        <div
            className={`px-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3 ${className}`}
        >
            {/* Left side */}
            <div className="flex items-center gap-4">
                {icon && (
                    <span className="text-[var(--feature-info)] text-3xl rounded-full border bg-[var(--card)] p-2">
                        {icon}
                    </span>
                )}
                <div>
                    <h1 className="text-2xl font-semibold text-[var(--feature-info-text)]">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-sm text-[var(--feature-info-sub-text)] mt-0.5">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>

            {/* Right side action (e.g., Add button, Filters, etc.) */}
            {action && <div>{action}</div>}
        </div>
    );
}
