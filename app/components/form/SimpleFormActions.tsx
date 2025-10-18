export default function SimpleFormActions({
    children
}: {
    children: React.ReactNode;
}) {
    return <div className="flex justify-end space-x-5 mt-5">{children}</div>;
}
