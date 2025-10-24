import { useState } from 'react';
import useConfirmDialog from '@/components/dialog/useConfirmDialog';
import useNotifier from '@/hooks/useNotifier';
import { ILoadingState } from '@/types/loadingState';

interface IOptions<T> {
    deleteFn: (id: string) => Promise<any>,
    deleteStatus: ILoadingState,
    selectFn: (item: T | null) => void,
}

export default function useListPage<T>({
    deleteFn,
    deleteStatus,
    selectFn
}: IOptions<T>) {
    const [showForm, setShowForm] = useState(false);
    const { openDialog, ConfirmDialogComponent } = useConfirmDialog({
        title: 'Warning'
    });

    useNotifier(deleteStatus);

    const handleAddNew = () => {
        selectFn(null);
        setShowForm(true);
    };

    const handleEdit = (item: T) => {
        selectFn(item);
        setShowForm(true);
    };

    const handleDelete = (item: T & { _id?: string; name?: string }) => {
        openDialog(
            () => deleteFn(item._id!),
            `Are you sure you want to delete "${item.name}"?`
        );
    };

    return {
        showForm,
        setShowForm,
        handleAddNew,
        handleEdit,
        handleDelete,
        ConfirmDialogComponent
    };
}
