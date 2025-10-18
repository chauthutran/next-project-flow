import { RiBubbleChartFill } from 'react-icons/ri';
import LoginForm from './LoginForm';
import { loginSchema } from './loginForm.schema';
import { LoginFormValues } from '@/lib/definations';
import withFormHandler from '@/hoc/withFormHandler';
import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const { user, login } = useAuth();
    const router = useRouter();

    const LoginFormBasic = withFormHandler<LoginFormValues>(LoginForm, {
        initialValues: {
            email: 'manager1@example.com',
            password: '1234'
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            await login(values);
        }
    });

    useEffect(() => {
        if (user) {
            router.push('/pages/dashboard');
        }
    }, [user]);

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left section */}
            <div className="flex-1 bg-gradient-to-br from-[var(--primary)] via-[var(--gradient-via)] to-[var(--gradient-to)] p-10 flex flex-col justify-center relative overflow-hidden">
                {/* Subtle background icons */}
                <RiBubbleChartFill className="absolute right-10 top-10 text-[var(--gradient-text)] opacity-10 size-64" />
                <div className="relative z-10 space-y-4 text-[var(--gradient-text)]">
                    <h1 className="text-4xl font-bold">Project FlowMaster</h1>
                    <p className="text-lg max-w-md">
                        Streamline your projects — visualize timelines, track
                        milestones, and empower your team with smart task
                        management.
                    </p>
                </div>
            </div>

            {/* Right section */}
            <div className="flex-1 bg-slate-50 flex items-center justify-center p-10">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                        Welcome Back 👋
                    </h2>
                    <LoginFormBasic />
                    <div className="mt-6 text-center text-sm text-slate-500">
                        Don’t have an account?{' '}
                        <a
                            href="/register"
                            className="text-blue-600 hover:underline"
                        >
                            Sign up
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
