import {stringIndex} from "../../Interfaces";

interface ServiceOptions {
	hostName: string,
	token?: string,
	fingerprint?: string
}

export interface IService {
	get: <Type>(pathName: string) => Promise<Type>,
	post: <Type>(pathName: string, data:stringIndex<any>) => Promise<Type>,
	delete: <Type>(pathName: string) => Promise<Type>,
	fingerprint?: string
}

const Service = ( options: ServiceOptions) => {
	const hostName = options.hostName;
	const fingerPrint = options.fingerprint;
	const token = options.token;

	const get = async <Type>(pathName: string): Promise<Type> => {
		const url = hostName + (pathName.indexOf('/') >= 0 ? pathName : '/' + pathName);
		
		return (await sendMethodRequest(url, 'GET')) as Type;
	}

	const post = async <Type>(pathName: string, data: stringIndex<any>): Promise<Type> => {
		const url = hostName + (pathName.indexOf('/') >= 0 ? pathName : '/' + pathName);
		const options = {
			headers: {
				"Content-Type": "application/json",
			}
		}
		
		return (await sendMethodRequest(url, 'POST', JSON.stringify(data), options)) as Type;
	}

	const deleteMethod = async <Type>(pathName: string): Promise<Type> => {
		const url = hostName + (pathName.indexOf('/') >= 0 ? pathName : '/' + pathName);
		return (await sendMethodRequest(url, 'DELETE')) as Type;
	}

	const sendMethodRequest = async <Type>(url: string, method: string, data?: string, options?: stringIndex<any>): Promise<string|Type> => {
		const requestOptions = options ?? {headers: {}}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		requestOptions.headers.Authorization = 'Bearer ' + token;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		requestOptions.headers.fingerprint = fingerPrint;

		const response = await fetch(url, {
			method: method,
			body: data,
			mode: 'cors',
			...requestOptions
		});

		if (response.status === 400) {
			return Promise.reject({error: 'invalid request'})
		}


		if ([401].includes(response.status)) {
			return Promise.reject({error: 'incorrect data'})
		}

		if (response.status === 403) {
			window.location.replace('/logout');
			return Promise.reject({error: 'forbidden'} as Type);
		}

		if (response.status === 404) {
			return Promise.reject({error: 'not found'} as Type)
		}

		if (response.status >= 500) {
			return Promise.reject({error: 'server error'} as Type)
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const result: string|Type = await response.json();

		return result;
	}

	return {
		get: get,
		post: post,
		delete: deleteMethod,
		fingerprint: fingerPrint
	};
}

export default Service;