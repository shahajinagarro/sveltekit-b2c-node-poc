import { auth } from '$lib/auth';
import { ResponseMode } from '@azure/msal-node';
import { env } from '$env/dynamic/public';

const { PUBLIC_AZUREB2C_DOMAIN, PUBLIC_AZUREB2C_USERFLOW_SIGNIN } = env;

export const GET = async () => {
	const response = await auth.getAuthCodeUrl({
		authority: `https://${PUBLIC_AZUREB2C_DOMAIN}.b2clogin.com/${PUBLIC_AZUREB2C_DOMAIN}.onmicrosoft.com/${PUBLIC_AZUREB2C_USERFLOW_SIGNIN}`,
		redirectUri: 'https://localhost:3000',
		scopes: ['openid'],
		state: 'login',
		responseMode: ResponseMode.FRAGMENT
	});

	console.log(response);
	return Response.redirect(response);
};
