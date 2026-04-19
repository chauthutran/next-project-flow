import { cn } from '@/app/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    className?: string;
    type?: 'submit' | 'reset' | 'button';
}

export default function PrimaryButton({
    title,
    className,
    type = 'submit',
    ...rest
}: ButtonProps) {
    return (
        <button
            type={type}
            className={cn(
                'bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-text)] px-2 py-1 rounded-md cursor-pointer',
                className
            )}
            {...rest} // pass all other props like onClick, type, disabled, etc.
        >
            {title}
        </button>
    );
}
