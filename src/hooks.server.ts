import { CryptoProvider } from '@azure/msal-node';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === '/auth/signin') {
		// generate challenge and verifier and store it in locals object

		// challenge is passed in the signIn request
		// and verifier is used to verify the code challenge after redirect
		// source: https://github.com/Azure-Samples/ms-identity-node/blob/main/App/routes/auth.js

		const cryptoProvider = new CryptoProvider();
		const { verifier, challenge } = await cryptoProvider.generatePkceCodes();

		event.locals.pkceCodes = {
			verifier,
			challenge
		};
	}

	return resolve(event);
};

export const getSession = () => {};
