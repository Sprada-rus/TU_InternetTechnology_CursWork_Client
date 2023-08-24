export interface IFieldType {
    name: string,
    type: string,
    label: string,
    required: boolean,
    description?: string,
    disabled?: boolean,
    hidden?: boolean
}

export interface ITextField extends IFieldType {
    minLength?: number,
    maxLength?: number
}