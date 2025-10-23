import { ILoadingState } from '@/types/loadingState';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

export default function useNofifier({
    loading,
    success,
    error
}: ILoadingState) {
    const currentToastId = useRef<string | null>(null);

    useEffect(() => {
      
        if (loading) {
            currentToastId.current = toast.loading('Loading ...');
            return; // Prevent multiple triggers
        }

         // When success occurs, remove loading toast first
        if (success) {
            if (currentToastId.current) {
                toast.dismiss(currentToastId.current);
                currentToastId.current = null;
            }
            toast.success(success);
        }

        // When error occurs, remove loading toast first
        if (error) {
            if (currentToastId.current) {
                toast.dismiss(currentToastId.current);
                currentToastId.current = null;
            }
            toast.error(error);
        }
        
    }, [loading, success, error]);
}
