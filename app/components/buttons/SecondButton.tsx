interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    type?: 'submit' | 'reset' | 'button';
}

export default function SecondButton({
    title,
    type = 'button',
    ...rest
}: ButtonProps) {
    return (
        <button
            type={type}
            className="whitespace-nowrap bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] text-[var(--secondary-text)] px-2 py-1 rounded-md cursor-pointer"
            {...rest} // pass all other props like onClick, type, disabled, etc.
        >
            {title}
        </button>
    );
}
