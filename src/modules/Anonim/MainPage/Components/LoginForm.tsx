import GeneratorForm, {FormFieldData} from "../../../../Components/Tools/GeneratorForm";
import {useCallback, useEffect, useState} from "react";
import {MainOptionsResponse, stringIndex} from "../../../../Interfaces";
import Service from "../../../../Tools/Service";
import {getFingerprint} from "../../../../Tools/Other";
import {useNavigate} from "react-router-dom";
import {useAuthorizedStore} from "../../../AuthorizedUser/AccountPage/store.ts";

const LoginFields: FormFieldData[] = [
    {
        name: 'login',
        required: true,
        label: 'Логин',
        type: 'text',
        order: 10
    },
    {
        name: 'password',
        required: true,
        label: 'Пароль',
        type: 'password',
        order: 20
    }
];

interface LoginFormResponse extends MainOptionsResponse{
    token?: string
}

const LoginForm = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
    const navigation = useNavigate();
    const {setToken} = useAuthorizedStore();

    const submitHandler = useCallback(async (value: stringIndex<any>) => {
        try {
            const fingerprint = await getFingerprint();
			const service = Service({
				hostName: import.meta.env.VITE_SERVICE_HOST as string,
                fingerprint: fingerprint
			})

            const resolveValue: LoginFormResponse = await service.post('/api/authorization/token', {
                login: value.login as string,
                password: value.password as string
            });

            if (resolveValue.token) {
                setToken(resolveValue.token);
                navigation('/');
            }

        } catch (e) {

            if (typeof e === 'object') {
                const error = e as stringIndex<any>;

				console.error(error);

                if (error.errorMessage === 'login or password incorrect') {
					setErrorMessage('Неверный логин или пароль');
                }
            } else {
                setErrorMessage('Произошла ошибка, просьба обратиться к администратору');
            }

		} finally {
            setIsSubmitting(false);
		}
    }, []);

	useEffect(() => {
        setErrorMessage('');
	}, [isValid]);

    return (
        <>
            <GeneratorForm
                formFieldsData={LoginFields}
                onSubmit={submitHandler}
                formName={"login-form"}
                submittingStateCallback={setIsSubmitting}
                validStateCallback={setIsValid}
            />
			{errorMessage && <div className="info info-error">
				{errorMessage}
            </div>}
            <button
                type={"submit"}
                form={"login-form"}
                className="btn-primary full-width"
                disabled={!isValid || isSubmitting}
            >
                Войти
            </button>

        </>
    )
}

export default LoginForm;