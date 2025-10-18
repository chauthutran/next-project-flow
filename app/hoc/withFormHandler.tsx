import useAuth from '@/hooks/useAuth';
import { useFormHandler } from '@/hooks/useFormHandler';
import { FormikProvider, FormikValues } from 'formik';
import * as yup from 'yup';

interface WithFormHandlerOptions<T extends FormikValues> {
    initialValues: T;
    validationSchema: yup.ObjectSchema<any>;
    onSubmit: (formValues: T) => Promise<void> | void;
    onCancel?: () => void;
}

export default function withFormHandler<T extends FormikValues>(
    WrapperComponent: React.ComponentType<{
        formik: ReturnType<typeof useFormHandler<T>>['formik'];
        loading: boolean;
        handleCancel: () => void;
    }>,
    options: WithFormHandlerOptions<T>
) {
    return function FormHandlerHOC() {
        const { formik, handleCancel } = useFormHandler<T>(options);
        const { loading } = useAuth(); // use Redux loading

        return (
            <FormikProvider value={formik}>
                <WrapperComponent
                    formik={formik}
                    loading={loading}
                    handleCancel={handleCancel}
                />
            </FormikProvider>
        );
    };
}
