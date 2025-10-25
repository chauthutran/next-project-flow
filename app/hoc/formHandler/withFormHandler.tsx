import { IUseFormHandler, useFormHandler } from '@/app/hoc/formHandler/useFormHandler';
import { FormikHelpers, FormikProvider, FormikValues } from 'formik';
import * as yup from 'yup';

interface WithFormHandlerOptions<T extends FormikValues> {
    initialValues: T;
    validationSchema?: yup.ObjectSchema<any>;
    getLoading?: () => boolean;
    onSubmit: (formValues: T, formikHelpers: FormikHelpers<T>) => Promise<void> | void;
}

/**
 * 
 * T → describes your Formik form values (like IMeetingDTO).
 * P → describes the component’s other props (like onClose).
 * WrapperComponent → is a form UI (e.g., TaskForm, MeetingForm, ...).
 * options → includes the configuration (initial values, validation schema, onSubmit, etc).
 */
export default function withFormHandler<
    T extends FormikValues,
    P extends object = {}
>(
    WrapperComponent: React.ComponentType<
        P & {
            formik: ReturnType<typeof useFormHandler<T>>['formik'];
            loading: boolean;
            handleReset: () => void;
        }
    >,
    options: WithFormHandlerOptions<T>
) {
    return function FormHandlerHOC(props: P) {
        const { formik, handleReset } = useFormHandler<T>(options as IUseFormHandler<T>);
        const loading = options.getLoading ? options.getLoading() : false; // dynamic loading

        return (
            <FormikProvider value={formik}>
                <WrapperComponent
                    {...props}
                    formik={formik}
                    loading={loading}
                    handleReset={handleReset}
                />
            </FormikProvider>
        );
    };
}
