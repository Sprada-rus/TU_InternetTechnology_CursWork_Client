import {stateCallback, stringIndex} from "../../../Interfaces";
import {lazy, Suspense, useCallback, useEffect, useMemo} from "react";
import {FormProvider, useForm} from "react-hook-form";
const TextInput = lazy(() => import('./Fields/TextInput'));
const PasswordInput = lazy(() => import('./Fields/PasswordField'));
const SelectField = lazy(() => import('./Fields/SelectField'));
import "./form.scss";
import Loading from "../../Loading";

export interface FormFieldData{
    name: string,
    label: string,
    type: string,
    order: number,
    required: boolean,
    minLength?: number,
    maxLength?: number
    description?: string,
    disabled?: boolean,
    hidden?: boolean
    source?: string
}

/**
 * Метод для формирования типа поля
 * */
const FieldWrapper = (props: FormFieldData) => {
    const {type} = props;
    switch (type) {
        case 'text':
            return <TextInput
                name={props.name}
                type={props.type}
                label={props.label}
                required={props.required}
                minLength={props.minLength}
                maxLength={props.maxLength}

            />
        case 'password':
            return <PasswordInput
                name={props.name}
                type={props.type}
                label={props.label}
                required={props.required}
                minLength={props.minLength}
                maxLength={props.maxLength}
            />
        case 'select':
            return <SelectField
                name={props.name}
                type={props.type}
                label={props.label}
                required={props.required}
                disabled={props.disabled}
                hidden={props.hidden}
                description={props.description}
                source={props.source}
            />
        default:
            return <></>;
    }
}

interface IGeneratorForm {
    formName: string,
    onSubmit: (value: stringIndex<any>) => Promise<unknown>,
    formFieldsData: FormFieldData[],
    watchCallback?: (value: stringIndex<any>) => void,
    defaultValues?: stringIndex<any>,
    validStateCallback?: stateCallback<boolean>,
    submittingStateCallback?: stateCallback<boolean>
}

/**
 * Компонент для генерации формы
 * @param props.formName наименование формы
 * @param props.onSubmit метод для обработки данных из формы, в момент "сохранения"
 * @param props.formFieldsData массив с полями формы
 * @param props.watchCallback метод для отслеживания изменения состояний полей внутри формы
 * @param props.defaultValues объект с в котором передается значения полей формы (прим. {first_name: 'Иванов'})
 * */
const GeneratorForm = (props: IGeneratorForm) => {
    const {
        onSubmit, formFieldsData, watchCallback, formName, defaultValues,
        validStateCallback, submittingStateCallback
    } = props;

    const Fields = useMemo(() => {
        return <Suspense fallback={<Loading/>}>
            {
                formFieldsData
                .sort((a, b) => a.order - b.order)
                .map((field) => <FieldWrapper {...field} key={`${formName}_${field.name}`}/>)
            }
        </Suspense>
    }, [formFieldsData]);

    const methods = useForm({
        mode: "all",
        defaultValues: defaultValues
    });

    const {
        handleSubmit,
        watch,
        formState: { isValid, isSubmitting }
    } = methods;

    useEffect(() => {
        if (watchCallback) {
            const {unsubscribe} = watch((value) => {
                watchCallback(value)
            })

            return () => {
                unsubscribe();
            }
        }
    }, [watchCallback])


    useEffect(() => {
        if (validStateCallback) {
            validStateCallback(isValid)
        }
    }, [validStateCallback, isValid]);

    useEffect(() => {
        if (submittingStateCallback) {
            submittingStateCallback(isValid)
        }
    }, [submittingStateCallback, isSubmitting]);

    const submitHandler = useCallback((value: stringIndex<any>) => {
             onSubmit(value).catch(e => {
                 console.error(e);
             });
    }, [onSubmit])

    return (
        <FormProvider {...methods}>
            <form
                id={formName}
                className={"form"}
                onSubmit={(event) => void handleSubmit(submitHandler)(event)}
            >
                {Fields}
            </form>
        </FormProvider>
    )
}

export default GeneratorForm;