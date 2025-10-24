import * as yup from 'yup';

export const meetingSchema = yup.object({
    projectId: yup.string().required('Project ID is required'),
    name: yup.string().required('Name is required'),
    description: yup.string().required('Description is required'),
    date: yup
        .string()
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
        .required('Date is required'),
    participants: yup
        .array()
        .of(
            yup
                .string()
                .email('Each assigned member must be a valid email')
                .required('Email is required')
        )
        .min(1, 'At least one assigned member is required')
        .required('Assigned members are required'),
    meetingNotes: yup.string().default(''),
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
    createdBy: yup.string().required('Created By is required')
});
