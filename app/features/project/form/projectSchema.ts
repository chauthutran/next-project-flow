import { STATUSES } from '@/models/Project';
import * as yup from 'yup';

export const projectSchema = yup.object({
    name: yup.string().required('Name is required'),
    description: yup.string().required('Description is required'),
    startDate: yup
        .string()
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
        .required('Start Date is required'),
    endDate: yup
        .string()
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
        .required('End Date is required'),
    status: yup
        .string()
        .oneOf(STATUSES, 'Invalid status')
        .required('Status is required'),
    managedBy: yup.string().required('Managed By is required'),
    teamMembers: yup
        .array()
        .of(
            yup
                .string()
                .email('Each team member must be a valid email')
                .required('Email is required')
        )
        .min(1, 'At least one team member is required')
        .required('Team members are required')
});
