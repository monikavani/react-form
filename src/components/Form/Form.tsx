import { useEffect, useRef, useState } from 'react';
import { EmailInput } from '../EmailInput/EmailInput';
import { RadioInput } from '../RadioInput/RadioInput';
import { Select } from '../SelectInput/SelectInput';
import { TelInput } from '../TelInput/TelInput';
import { HiddenInput } from '../HiddenInput/HiddenInput';
import { useAppDispatch } from '../../app/hooks';
import { connect } from "react-redux";
import type { RootState } from '../../app/store';

type EmailType = {
    label: string,
    type: "email",
    default?: string,
    isOptional: boolean,
    isHidden: boolean,
    value?: string,
}

type RadioType = {
    label: string,
    type: "radio",
    value: string[],
    default?: string,
    isOptional: boolean,
    isHidden?: boolean
}

type SelectType = {
    label: string,
    type: "select",
    value: string[],
    default: string,
    isOptional?: boolean,
    isHidden?: boolean
}

type TelType = {
    label: string,
    type: "telephone",
    default?: string,
    isOptional?: boolean,
    isHidden?: boolean
}

type HiddenType = {
    type: "hidden",
    value: string | number,
    isHidden: true
}

type ResponseItem = EmailType | RadioType | SelectType | TelType | HiddenType;

function getAPIResponse(): Promise<ResponseItem[]> {
    const cachedData: ResponseItem[] = [
        {
            "label": "Email address",
            "type": "email",
            "isOptional": false,
            "isHidden": false
        },
        {
            "label": "Gender",
            "type": "radio",
            "value": [
                "M (Male)",
                "F (Female)",
                "X (Indeterminate/Intersex/Unspecified)"
            ],
            "isOptional": true
        },
        {
            "label": "State",
            "type": "select",
            "value": [
                "NSW",
                "QLD",
                "SA",
                "TAS",
                "VIC",
                "WA",
                "NT",
                "ACT"
            ],
            "default": "ACT"
        },
        {
            "label": "Contact number",
            "type": "telephone"
        },
        {
            "type": "hidden",
            "value": 1639982026413,
            "isHidden": true
        }
    ];

    return fetch('https://ansible-template-engine.herokuapp.com/form')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw response;
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            return cachedData;
        });
}

const _Form = (props: any) => {
    const [data, setData] = useState<ResponseItem[]>([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();

    const formValueRef = useRef<{label: string, value: string | number}[]>([]);

    const resultData = (data: ResponseItem[]) => {
        let array = data.map(item => {
            return item.type === 'hidden' ? 
                {label: 'hidden', value: item.value} : 
                {label: item.label, value: item.default ?? ''};
        });
        return array;
    }

    useEffect(() => {
        const promiseWithData = getAPIResponse();
        promiseWithData.then((data: ResponseItem[]) => {
            setData(data);
            formValueRef.current = resultData(data);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch({ type: 'SUBMIT_CLICKED', formData: JSON.parse(JSON.stringify(formValueRef.current)) });
    }

    return (
        <>
            {loading ?
                // Loading 
                <div>Loading...</div> :
                // Form fields
                <form onSubmit={(e) => handleSubmit(e)}>
                    {data.map((field: ResponseItem, i) => (
                        <div key={field.type}>
                            {
                                (() => {
                                    switch (field.type) {
                                        case "email":
                                            return <EmailInput label={field.label} isOptional={field.isOptional} isHidden={field.isHidden} defaultValue={field.default} onChange={(value: any) => formValueRef.current[i].value=value} />;
                                        case "radio":
                                            return <RadioInput label={field.label} value={field.value} isOptional={field.isOptional} onChange={(value: any) =>formValueRef.current[i].value=value }/>;
                                        case "select":
                                            return <Select label={field.label} value={field.value} defaultValue={field.default} onChange={(value: any) =>formValueRef.current[i].value=value }/>;
                                        case "telephone":
                                            return <TelInput label={field.label} onChange={(value: any) =>formValueRef.current[i].value=value }/>;
                                        case "hidden":
                                            return <HiddenInput value={field.value} />;
                                        default:
                                            break;
                                    }
                                })()
                            }
                        </div>
                    ))}
                    <button type="submit">Submit</button>
                </form>
            }
            {props.formData.length !== 0 && <div>{JSON.stringify(props.formData)}</div>}
            
        </>
    );
}

const mapStateToProps = (state: RootState) => {
    return {
        formData: state.form.formData
    }
}

export const Form = connect(mapStateToProps)(_Form);