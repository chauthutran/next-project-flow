import { getIn, useFormikContext } from 'formik';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    name: string; // Required to bind to Formik
    helpText?: string;
};

export default function SimpleFormTextArea({
    label,
    name,
    helpText,
    ...inputProps
}: Props) {
    const { values, errors, touched, handleChange, handleBlur } =
        useFormikContext<any>();
    // Formik helpers
    const value = getIn(values, name);
    const error = getIn(errors, name);
    const isTouched = getIn(touched, name);

    const inputId =
        inputProps.id || `input-${name.replace(/\s+/g, '-').toLowerCase()}`;
    const helpId = helpText ? `${inputId}-help` : undefined;

    return (
        <div className="space-y-1">
            <label className="block font-medium" htmlFor={inputId}>
                {label}
            </label>
            <textarea
                id={inputId}
                name={name}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-describedby={helpId}
                {...inputProps}
                className="bg-[var(--input-bg)] w-full rounded border border-[var(--input-border)] p-2 focus:border-[var(--input-focus-border)] focus:ring-[var(--input-focus-ring)] transition"
            />
            {helpText && (
                <small id={helpId} className="sr-only">
                    {helpText}
                </small>
            )}
            {isTouched && error && (
                <p className="text-[var(--error-text)] text-sm">{error}</p>
            )}
        </div>
    );
}
