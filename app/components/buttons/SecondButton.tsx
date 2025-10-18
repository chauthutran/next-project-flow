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
            className="bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] text-[var(--secondary-text)] px-4 py-2 rounded-md cursor-pointer"
            {...rest} // pass all other props like onClick, type, disabled, etc.
        >
            {title}
        </button>
    );
}
