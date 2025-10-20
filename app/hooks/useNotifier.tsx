import { ILoadingState } from '@/types/loadingState';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

export default function useNofifier({
    loading,
    success,
    error
}: ILoadingState) {
    const currrentToastId = useRef<string | number | null>(null);

    useEffect(() => {
        if (loading) {
            currrentToastId.current = toast.loading('Loading ...');
        }

        if (success) {
            toast.success(success);
        }

        if (error) {
            toast.error(error);
        }
    }, [loading, success, error]);
}
