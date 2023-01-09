import { auth } from '$lib/auth';
import { env } from '$env/dynamic/public';
import type { RequestHandler } from '@sveltejs/kit';

const { PUBLIC_AZUREB2C_DOMAIN, PUBLIC_AZUREB2C_USERFLOW_SIGNIN } = env;

export const GET: RequestHandler = async (event) => {
	const code = event.url.searchParams.get('code');

	// extract the previously generated verifier in hooks.server.ts to verify the code challenge which was
	// sent along with sign in request

	// Blocker: The locals object does not persist the values in between redirects,
	// due to which we cannot verify the code challenge
	const codeVerifier = event.locals.pkceCodes?.verifier ?? '';

	if (code) {
		const token = await auth.acquireTokenByCode({
			authority: `https://${PUBLIC_AZUREB2C_DOMAIN}.b2clogin.com/${PUBLIC_AZUREB2C_DOMAIN}.onmicrosoft.com/${PUBLIC_AZUREB2C_USERFLOW_SIGNIN}`,
			redirectUri: 'https://localhost:3000/',
			scopes: ['openid'],
			code,
			codeVerifier
		});

		console.log(token.account);
		return new Response('');
	} else {
		return {};
	}

	// set token in session
};
