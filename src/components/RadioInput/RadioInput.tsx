import { useState } from "react"

type Props = { label: string, value: any[], defaultValue?: string, isOptional: boolean, isHidden?: boolean, onChange: Function };
export const RadioInput = ({ label, value, defaultValue, isOptional, isHidden = false, onChange }: Props) => {
    const [fieldValue, setFieldValue] = useState(defaultValue);
    return (
        !isHidden ?
            <div className="field">
                <label>{label}</label>
                {value.map((val, i) => (
                    <div key={val}>
                        <input
                            type="radio"
                            id={String(i)}
                            name="gender"
                            value={val}
                            checked={fieldValue === val}
                            required={isOptional}
                            onChange={(e) => {
                                onChange(e.target.value);
                                setFieldValue(e.target.value);
                            }}
                        />
                        <label htmlFor={String(i)}>{val}</label>
                    </div>
                ))}
            </div>
            : null
    )
}