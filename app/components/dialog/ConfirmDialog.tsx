import Dialog from './Dialog';

export default function ConfirmDialog({
    title,
    message,
    open,
    onClose,
    onConfirm
}: {
    title?: string;
    message: string;
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}) {
    if (!open) return null;

    return (
        <Dialog open={open} onClose={onClose} onConfirm={onConfirm}>
            {/* Header */}
            {title && <Dialog.Header>{title}</Dialog.Header>}

            {/* Body */}
            <Dialog.Body>{message}</Dialog.Body>

            {/* Footer */}
            <Dialog.Actions>
                <Dialog.ConfirmButton>Confirm</Dialog.ConfirmButton>
                <Dialog.CloseButton>Cancel</Dialog.CloseButton>
            </Dialog.Actions>
        </Dialog>
    );
}
