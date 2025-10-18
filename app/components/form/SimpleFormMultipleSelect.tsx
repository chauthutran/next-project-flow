import Select, { Props as SelectProps, StylesConfig } from 'react-select';
import { FormSelectOption } from './types/FormSelectOption';
import { getIn, useFormikContext } from 'formik';

const customStyles: StylesConfig<FormSelectOption, true> = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: 'var(--input-bg)',
        borderColor: state.isFocused
            ? 'var(--input-focus-border)' // when focused
            : 'var(--input-border)', // normal border
        boxShadow: state.isFocused
            ? `0 0 0 1px var(--input-focus-ring)` // focus ring
            : 'none',
        '&:hover': {
            borderColor: 'var(--input-focus-border)' // hover border
        }
    }),
    // menu: (provided) => ({
    //     ...provided,
    //     backgroundColor: 'var(--input-bg)'
    // }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? 'var(--select-option-selected-bg)' // selected option background
            : state.isFocused
            ? 'var(--select-option-hover-bg)' // hovered/focused option background
            : 'var(--select-menu-bg)', // normal option background
        color: state.isSelected
            ? 'var(--select-option-selected-text)' // selected text color
            : 'var(--select-option-text)', // normal text color
        cursor: 'pointer'
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: 'var(--select-multi-bg)',
        color: 'var(--select-multi-text)'
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: 'var(--select-multi-text)'
    })
};

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
    name: string; // Required to bind to Formik
    options: FormSelectOption[];
    helpText?: string;
};

export default function SimpleFormMultipleSelect<T extends FormSelectOption>({
    label,
    name,
    options,
    helpText,
    ...inputProps
}: Props & Omit<SelectProps<FormSelectOption, true>, 'options'>) {
    const { values, errors, touched, setFieldValue } = useFormikContext<any>();
    // Formik helpers
    const fieldValue = getIn(values, name);
    const error = getIn(errors, name);
    const isTouched = getIn(touched, name);

    const inputId =
        inputProps.id || `input-${name.replace(/\s+/g, '-').toLowerCase()}`;
    const helpId = helpText ? `${inputId}-help` : undefined;

    // Normalize value for react-select
    const selectValue: FormSelectOption[] = fieldValue
        ? fieldValue.map((v: string | FormSelectOption) =>
              typeof v === 'string' ? { label: v, value: v } : v
          )
        : [];

    return (
        <div className="space-y-1">
            <label className="block font-medium" htmlFor={inputId}>
                {label}
            </label>
            <Select<FormSelectOption, true>
                isMulti
                closeMenuOnSelect={false} // <-- keep menu open after selection
                hideSelectedOptions={false} // shows selected options in the list
                isClearable // allow clearing all selections
                options={options}
                // onChange={(selected) => setFieldValue(name, selected || [])}
                onChange={(selected) => {
                    // Store only string values in Formik
                    const stringValues = selected
                        ? selected.map((s) => s.value)
                        : [];
                    setFieldValue(name, stringValues);
                }}
                styles={customStyles}
                value={selectValue}
                {...inputProps}
            />

            {helpText && (
                <small id={helpId} className="sr-only">
                    {helpText}
                </small>
            )}
            {isTouched && error && (
                <p className="text-[var(--error-text)] text-sm">{error}</p>
            )}
        </div>
    );
}
