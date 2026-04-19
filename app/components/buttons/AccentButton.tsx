import { cn } from "@/app/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    className?: string;
    type?: 'submit' | 'reset' | 'button';
}

export default function AccentButton({
    title,
    className,
    type = 'button',
    ...rest
}: ButtonProps) {
    return (
        <button
            type={type}
            className={cn(
                        'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-text)] px-2 py-1 rounded-md cursor-pointer',
                        className
                    )}
            {...rest} // pass all other props like onClick, type, disabled, etc.
        >
            {title}
        </button>
    );
}
