import { ILoadingState } from '@/types/loadingState';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

export default function useNotifier({
    loading,
    success,
    error
}: ILoadingState) {
    const currentToastId = useRef<string | null>(null);
    /**  Success and error toasts only show if there was a loading toast before.
     * There are some case that a task is deleted and the state.update at that time is "Task updated successfully"
     * Then when we move to the task list again, we will not see the state.update.success message again
     * because there was no loading state before.
     */
    const hasShownLoading = useRef(false); // Track whether loading toast has appeared

    useEffect(() => {
        if (loading) {
            // Only show loading once
            if (!hasShownLoading.current) {
                currentToastId.current = toast.loading('Loading ...');
                hasShownLoading.current = true;
            }
            return; // Prevent multiple triggers
        }

        // When success occurs, only show if loading was shown before. Also remove loading toast first
        if (success && hasShownLoading.current) {
            if (currentToastId.current) {
                toast.dismiss(currentToastId.current);
                currentToastId.current = null;
            }
            toast.success(success);
            hasShownLoading.current = false; // Reset after success
        }

        // When error occurs, only show if loading was shown before. Also remove loading toast first
        if (error && hasShownLoading.current) {
            if (currentToastId.current) {
                toast.dismiss(currentToastId.current);
                currentToastId.current = null;
            }
            toast.error(error);
            hasShownLoading.current = false; // Reset after error
        }
    }, [loading, success, error]);
}
