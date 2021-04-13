type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value) => {
    return value ? undefined : "Field is required";
}

export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value) => {
    return value.length > maxLength ? `Max length is ${maxLength} symbols` : undefined;
}

export const validEmail: FieldValidatorType = (value) => {
    return /\S+@\S+\.\S+/.test(value) ? undefined : 'Invalid Email Address';
}

export const composeValidators = (...vadlidators: any[]): FieldValidatorType => (value) => {
    return vadlidators.reduce((error, validator) => error || validator(value), undefined);
}