import withFormHandler from '@/app/hoc/formHandler/withFormHandler';
import useAuth from '@/app/hooks/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChangePasswordForm from './ChangePasswordForm';
import { changePasswordSchema } from './changePassword.schema';

interface ChangePasswordFormValues {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export default function ChangePasswordPage() {
    const { user, changePassword, loading } = useAuth();
    // const router = useRouter();

    const ChangePasswordFormBasic = withFormHandler<ChangePasswordFormValues>(ChangePasswordForm, {
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        },
        getLoading: () => !!loading,
        validationSchema: changePasswordSchema,
        onSubmit: async (values) => {
            await changePassword({email: user!.email, oldPassword: values.currentPassword, newPassword: values.newPassword });
        },
    });

    // useEffect(() => {
    //     if (user) {
    //         router.push('/');
    //     }
    // }, [user, router]);

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Right section */}
            <div className="flex-1 bg-slate-50 flex items-center justify-center p-10">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                        Change Password
                    </h2>
                    <ChangePasswordFormBasic />
                </div>
            </div>
        </div>
    );
}
