import { useReducer, useState } from 'react';
import useConfirmDialog from '@/app/components/dialog/useConfirmDialog';
import useNotifier from '@/app/hooks/useNotifier';
import { ILoadingState } from '@/app/types/loadingState';
import { IBasicDTO } from '../types/basic';

interface IState<T> {
    showForm: boolean;
    selected?: T | null;
    pendingDelete?: string | null;
}

type IAction<T> =
    | { type: 'OPEN_ADD' }
    | { type: 'OPEN_EDIT'; payload: T }
    | { type: 'CLOSE_FORM' }
    | { type: 'REQUEST_DELETE'; payload: string }
    | { type: 'CANCEL_DELETE' }
    | { type: 'CLEAR_SELECTED' };

function reducer<T>(state: IState<T>, action: IAction<T>): IState<T> {
    switch (action.type) {
        case 'OPEN_ADD':
            return { ...state, showForm: true, selected: null };
        case 'OPEN_EDIT':
            return { ...state, showForm: true, selected: action.payload };
        case 'CLOSE_FORM':
            return { ...state, showForm: false };
        case 'REQUEST_DELETE':
            return { ...state, pendingDelete: action.payload };
        case 'CANCEL_DELETE':
            return { ...state, pendingDelete: undefined };
        case 'CLEAR_SELECTED':
            return { ...state, selected: null };
        default:
            return state;
    }
}

interface IOptions<T> {
    deleteFn: (id: string) => Promise<any>;
    deleteStatus: ILoadingState;
    selectFn: (item: T | null) => void;
    onAfterDelete?: () => void;
}

export default function useResourcePage<T extends IBasicDTO>({
    deleteFn,
    deleteStatus,
    selectFn,
    onAfterDelete
}: IOptions<T>) {
    const [state, dispatch] = useReducer(reducer, {
        showForm: false,
        selected: null,
        pendingDelete: null
    } as IState<T>);

    const { openDialog, ConfirmDialogComponent } = useConfirmDialog({
        title: 'Warning'
    });

    useNotifier(deleteStatus);

    const handleAddNew = () => {
        selectFn(null);
        dispatch({ type: 'OPEN_ADD' });
    };

    const handleEdit = (item: T) => {
        selectFn(item);
        dispatch({ type: 'OPEN_EDIT', payload: item });
    };

    const handleDelete = (item: T) => {
        dispatch({ type: 'REQUEST_DELETE', payload: item._id! });
        
        openDialog(async () => {
            await deleteFn(item._id!);
            dispatch({ type: 'CANCEL_DELETE' });
            onAfterDelete?.();
        }, `Are you sure you want to delete "${item.name}"?`);
    };

    const handleCloseForm = () => {
        dispatch({ type: 'CLOSE_FORM' });
        selectFn(null);
    };

    return {
        showForm: state.showForm,
        selected: state.selected,
        pendingDelete: state.pendingDelete,
        handleAddNew,
        handleEdit,
        handleDelete,
        handleCloseForm,
        ConfirmDialogComponent
    };
}
