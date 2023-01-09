import { auth } from '$lib/auth';
import { env } from '$env/dynamic/public';
import type { RequestHandler } from '@sveltejs/kit';

const { PUBLIC_AZUREB2C_DOMAIN, PUBLIC_AZUREB2C_USERFLOW_SIGNIN } = env;

export const GET: RequestHandler = async (event) => {
	// pkceCodes are added in locals obj in the handle hook (check hooks.server.ts)
	const pkceCodes = event.locals.pkceCodes;

	const response = await auth.getAuthCodeUrl({
		authority: `https://${PUBLIC_AZUREB2C_DOMAIN}.b2clogin.com/${PUBLIC_AZUREB2C_DOMAIN}.onmicrosoft.com/${PUBLIC_AZUREB2C_USERFLOW_SIGNIN}`,
		redirectUri: 'https://localhost:3000/auth/redirect',
		scopes: ['openid'],
		// code challenge is needed to load the sign in page
		codeChallenge: pkceCodes.challenge,
		codeChallengeMethod: 'S256'
	});

	console.log(response);
	return new Response(null, {
		status: 302,
		headers: new Headers({ Location: response })
	});
};
