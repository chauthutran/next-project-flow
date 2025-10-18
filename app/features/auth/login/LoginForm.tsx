import SimpleFormFieldSet from '@/components/form/SimpleFormFieldSet';
import SimpleFormActions from '@/components/form/SimpleFormActions';
import SimpleFormInput from '@/components/form/SimpleFormInput';
import { SimpleForm } from '@/components/form/SimpleForm';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import useAuth from '@/hooks/useAuth';

interface LoginFormProps {
    loading: boolean;
}

export default function LoginForm({ loading }: LoginFormProps) {
    const { error } = useAuth();

    return (
        <SimpleForm aria-label="login form">
            <SimpleFormFieldSet>
                {/* Email */}
                <SimpleFormInput
                    type="email"
                    label="Email"
                    name="email"
                    aria-required="true"
                    helpText="Enter your email"
                />

                <SimpleFormInput
                    label="Password"
                    type="password"
                    name="password"
                    aria-required="true"
                    helpText="Enter your password (at least 4 characters)"
                />
            </SimpleFormFieldSet>

            {/* Button */}
            <SimpleFormActions>
                <PrimaryButton
                    disabled={loading}
                    title={loading ? 'Logging in...' : 'Login'}
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
