import * as yup from 'yup';

export const changePasswordSchema = yup.object({
    currentPassword: yup
        .string()
        .min(4, 'Password must be at least 4 characters')
        .required('Current password is required'),
    newPassword: yup
        .string()
        .min(4, 'Password must be at least 4 characters')
        .required("New password is required"),
    confirmNewPassword: yup
        .string()
        // .test(
        //     'passwords-match',
        //     'Passwords must match',
        //     function (value) {
        //         return value === this.parent.newPassword;
        //     }
        // )
        .oneOf([yup.ref('newPassword')], 'Passwords must match')
        .required('Please confirm your new password')
});
