export default function SimpleFormFieldSet({
    children,
    isLoading,
    ...props
}: React.FieldsetHTMLAttributes<HTMLFieldSetElement> & { isLoading?: boolean }) {
    return (
        <fieldset disabled={isLoading} className="space-y-4" {...props}>
            {children}
        </fieldset>
    );
}
