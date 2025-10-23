import { STATUS_KEYS } from '@/types/status';
import * as yup from 'yup';

export const taskSchema = yup.object({
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
        .oneOf(STATUS_KEYS, 'Invalid status')
        .required('Status is required'),
    projectId: yup.string().required('Project ID is required'),
    assignedTo: yup
        .array()
        .of(
            yup
                .string()
                .email('Each assigned member must be a valid email')
                .required('Email is required')
        )
        .min(1, 'At least one assigned member is required')
        .required('Assigned members are required'),
    createdBy: yup.string().required('Created By is required'),
     submitType: yup.string().required('Created By is required')
});
