import { useState } from "react";

type Props = { label: string, defaultValue?: string, isOptional?: boolean, isHidden?: boolean, onChange: Function }
export const TelInput = ({ label, defaultValue = '', isOptional = false, isHidden = false, onChange }: Props) => {
    const [fieldValue, setFieldValue] = useState(defaultValue);
    return (
        !isHidden ?
            <div className="field">
                <label htmlFor="telInput">{label}</label>
                <input
                    id="telInput"
                    type="tel"
                    value={fieldValue}
                    onChange={(e) => {
                        setFieldValue(e.target.value)
                        onChange(e.target.value);
                    }}
                    required={isOptional}
                />
            </div>
            : null
    )
};