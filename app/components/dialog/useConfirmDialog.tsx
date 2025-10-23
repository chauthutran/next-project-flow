import { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';

export default function useConfirmDialog({
    title = 'Confirm'
}: {
    title: string;
}) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [onConfirmCallback, setOnConfirmCallback] = useState<() => void>(
        () => {}
    );

    const openDialog = (callback: () => void, message: string) => {
        setMessage(message);
        setOnConfirmCallback(() => callback);
        setOpen(true);
    };

    const ConfirmDialogComponent = (
        <ConfirmDialog
            open={open}
            title={title}
            message={message}
            onClose={() => setOpen(false)}
            onConfirm={() => {
                onConfirmCallback();
                setOpen(false);
            }}
        />
    );

    return { openDialog, ConfirmDialogComponent };
}
