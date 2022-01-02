import { useState } from "react";

type Props = { label: string, value: any[], defaultValue: any, isOptional?: boolean, isHidden?: boolean, onChange: Function };
export const Select = ({ label, value, defaultValue, isOptional = false, isHidden = false, onChange }: Props) => {
    const [fieldValue, setFieldValue] = useState(defaultValue);
    return (
        !isHidden ?
            <div className="field">
                <label>{label}</label>
                <select
                    value={fieldValue}
                    onChange={(e) => {
                        setFieldValue(e.target.value)
                        onChange(e.target.value);
                    }}
                    required={isOptional}>
                    {value.map(val =>
                        <option key={val} value={val} >{val}</option>
                    )}
                </select>
            </div>
            : null
    )
}