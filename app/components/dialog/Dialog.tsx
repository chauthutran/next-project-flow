import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type DialogContextType = {
    onClose: () => void;
    onConfirm: () => void;
};

const DialogContext = React.createContext<DialogContextType | undefined>(
    undefined
);

function useDialogContext() {
    const context = React.useContext(DialogContext);
    if (!context) {
        throw new Error(
            'useDialogContext must be used within a DialogProvider'
        );
    }

    return context;
}

type DialogProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    children: React.ReactNode;
};

function Dialog({ open, onClose, onConfirm, children }: DialogProps) {
    if (!open) return null;

    // Use createPortal to render the dialog at the top level (document.body)
    return createPortal(
        <DialogContext.Provider value={{ onClose, onConfirm }}>
            <div className="fixed inset-0 flex items-center justify-center bg-[var(--bg-dialog)] bg-opacity-25 z-50">
                <div className="bg-[var(--card)] rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
                    {children}
                </div>
            </div>
        </DialogContext.Provider>,
        document.body
    );
}

const Header = ({ children }: { children: ReactNode }) => {
    return (
        <header className="border-b border-[var(--card-border)] px-6 py-4">
            <h2 className="text-lg font-semibold text-[var(--card-text)]">{children}</h2>
        </header>
    );
};

const Body = ({ children }: { children: ReactNode }) => {
    return (
        <div className="px-6 py-4">
            <p className="text-sm text-[var(--card-text)]">{children}</p>
        </div>
    );
};

const Actions = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex justify-end gap-3 px-6 py-4 bg-[var(--card)]">
            {children}
        </div>
    );
};

// Example button using context
const CloseButton = ({ children }: { children: ReactNode }) => {
    const { onClose } = useDialogContext();
    return (
        <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[var(--secondary)] text-[var(--secondary-text)] hover:bg-[var(--secondary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--secondary-border)]"
        >
            {children}
        </button>
    );
};

const ConfirmButton = ({ children }: { children: ReactNode }) => {
    const { onConfirm, onClose } = useDialogContext();
    return (
        <button
            onClick={() => {
                onConfirm?.();
                onClose();
            }}
            className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-border)]"
        >
            {children}
        </button>
    );
};

// Attach compound components
Dialog.Header = Header;
Dialog.Body = Body;
Dialog.Actions = Actions;
Dialog.CloseButton = CloseButton;
Dialog.ConfirmButton = ConfirmButton;

export default Dialog;
