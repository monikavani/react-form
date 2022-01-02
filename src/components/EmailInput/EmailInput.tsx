import { useState } from "react"

type Props = { label: string, defaultValue?: string, isOptional: boolean, isHidden: boolean, onChange: Function };
export const EmailInput = ({ label, defaultValue = '', isHidden, isOptional, onChange }: Props) => {
    const [fieldValue, setFieldValue] = useState(defaultValue);
    return (
        !isHidden ?
            <div className="field">
                <label htmlFor="email">{label}</label>
                <input
                    id="email"
                    type="email"
                    required={isOptional}
                    value={fieldValue}
                    onChange={(e) => {
                        onChange(e.target.value);
                        setFieldValue(e.target.value);
                    }}
                />
            </div>
            : null
    )
};
