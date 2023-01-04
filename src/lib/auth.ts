import msal from '@azure/msal-node';
import { env } from '$env/dynamic/public';

const { PUBLIC_AZUREB2C_CLIENT_ID, PUBLIC_AZUREB2C_DOMAIN, PUBLIC_AZUREB2C_USERFLOW_SIGNIN } = env;

const auth = new msal.ConfidentialClientApplication({
	auth: {
		clientId: PUBLIC_AZUREB2C_CLIENT_ID,
		authority: `https://${PUBLIC_AZUREB2C_DOMAIN}.b2clogin.com/${PUBLIC_AZUREB2C_DOMAIN}.onmicrosoft.com/${PUBLIC_AZUREB2C_USERFLOW_SIGNIN}`,
		knownAuthorities: [`https://${PUBLIC_AZUREB2C_DOMAIN}.b2clogin.com`],
		clientSecret: 'blah'
	},
	system: {
		loggerOptions: {
			loggerCallback(loglevel, message) {
				console.log(message);
			},
			piiLoggingEnabled: false,
			logLevel: msal.LogLevel.Verbose
		}
	}
});

export { auth };
