import { cn } from '/app/lib/utils';

export default function SimpleFormActions({
    children,
    className,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn('flex justify-end space-x-5 mt-5', className)}
            {...props}
        >
            {children}
        </div>
    );
}
