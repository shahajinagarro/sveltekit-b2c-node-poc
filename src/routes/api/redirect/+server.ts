import { auth } from '$lib/auth';
import { env } from '$env/dynamic/public';

const { PUBLIC_AZUREB2C_DOMAIN, PUBLIC_AZUREB2C_USERFLOW_SIGNIN } = env;

export const GET = async ({ url }) => {
	const code = url.searchParams.get('code');

	const token = await auth.acquireTokenByCode({
		authority: `https://${PUBLIC_AZUREB2C_DOMAIN}.b2clogin.com/${PUBLIC_AZUREB2C_DOMAIN}.onmicrosoft.com/${PUBLIC_AZUREB2C_USERFLOW_SIGNIN}`,
		redirectUri: 'https://localhost:3000',
		scopes: ['openid'],
		state: 'login',
		code
	});

	// set token in session
};
