import PrimaryButton from '@/app/components/buttons/PrimaryButton';
import { SimpleForm } from '@/app/components/form/SimpleForm';
import SimpleFormActions from '@/app/components/form/SimpleFormActions';
import SimpleFormFieldSet from '@/app/components/form/SimpleFormFieldSet';
import SimpleFormInput from '@/app/components/form/SimpleFormInput';
import useAuth from '@/app/hooks/useAuth';

interface ChangePasswordFormProps {
    loading: boolean;
}

export default function ChangePasswordForm({
    loading
}: ChangePasswordFormProps) {
    const { error } = useAuth();

    return (
        <SimpleForm aria-label="login form">
            <SimpleFormFieldSet>
                <SimpleFormInput
                    label="Current Password"
                    type="password"
                    name="currentPassword"
                    aria-required="true"
                    helpText="Enter your current password (at least 4 characters)"
                />
                <SimpleFormInput
                    label="New Password"
                    type="password"
                    name="newPassword"
                    aria-required="true"
                    helpText="Enter your new password (at least 4 characters)"
                />
                <SimpleFormInput
                    label="Confirm New Password"
                    type="password"
                    name="confirmNewPassword"
                    aria-required="true"
                    helpText="Enter your new password again"
                />
            </SimpleFormFieldSet>   
            
            {/* Button */}
            <SimpleFormActions>
                <PrimaryButton
                    disabled={loading}
                    title={loading ? 'Changing password...' : 'Update Password'}
                    className="w-full"
                />
            </SimpleFormActions>
            
            {error && (
                <p className="text-[var(--error)] text-sm mt-2 px-2 py-1 bg-[var(--error-light)] rounded">
                    {error}
                </p>
            )}
        </SimpleForm>
    );
}
