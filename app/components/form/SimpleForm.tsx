import { Form } from 'formik';
import React from 'react';

type SimpleFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
    children: React.ReactNode;
};

export function SimpleForm({ children, ...props }: SimpleFormProps) {
    return <Form {...props}>{children}</Form>;
}
