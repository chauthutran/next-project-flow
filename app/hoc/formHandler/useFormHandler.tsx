import { FormikValues, useFormik } from 'formik';
import * as yup from 'yup';

export interface IUseFormHandler<T> {
    initialValues: T;
    validationSchema: yup.ObjectSchema<any>;
    onSubmit: (formValues: T) => Promise<void> | void;
}

export function useFormHandler<T extends FormikValues>({
    initialValues,
    validationSchema,
    onSubmit,
}: IUseFormHandler<T>) {

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    const handleReset = () => {
        formik.resetForm();
    };

    return { formik, handleReset };
}
