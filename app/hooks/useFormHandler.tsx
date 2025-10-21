import { FormikValues, useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

interface Props<T> {
    initialValues: T;
    validationSchema: yup.ObjectSchema<any>;
    onSubmit: (formValues: T) => Promise<void> | void;
}

export function useFormHandler<T extends FormikValues>({
    initialValues,
    validationSchema,
    onSubmit,
}: Props<T>) {

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
