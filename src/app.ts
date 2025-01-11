import 'module-alias/register.js';
import 'source-map-support/register.js';

import { BaseClient } from '@core/BaseClient.js';
import { Database } from '@database/mongoose.js';
import { CommandManager } from '@services/CommandManager.js';
import { ConfigValidator } from '@services/ConfigValidator.js';
import { Loader } from '@services/Loader.js';
import { ClientUtils } from '@utils/client-utils.js';
import { LoggerUtils } from '@utils/logger-utils.js';

/**
 * Logger utility instance for logging errors and messages
 * @type {LoggerUtils}
 */
const loggerInstance: LoggerUtils = new LoggerUtils();

/**
 * Config validator instance for validating configuration file
 * @type {ConfigValidator}
 */
const configValidatorInstance: ConfigValidator = new ConfigValidator();

/**
 * Base client instance for handling client events
 * @type {BaseClient}
 */
const clientInstance: BaseClient = new BaseClient();

/**
 * Database instance for handling database operations
 * @type {Database}
 */
const databaseInstance: Database = new Database();

/**
 * Command manager instance for handling command operations
 * @type {CommandManager}
 */
const commandManagerInstance: CommandManager = new CommandManager(clientInstance);

/**
 * Loader instance for loading commands and events
 * @type {Loader}
 */
const loaderInstance: Loader = new Loader(clientInstance);

/**
 * Client utilities instance for handling client utilities
 * @type {ClientUtils}
 */
const clientUtilsInstance: ClientUtils = new ClientUtils(clientInstance);

/**
 * Validates the configuration file and logs any errors
 * @async
 */
await configValidatorInstance
	.start()
	.catch((error: Error) => loggerInstance.error('Error while validating config file', error));

/**
 * Maps command actions to corresponding functions
 * @type {{ [key: string]: () => Promise<void | Error> }}
 */
const commandActions: { [key: string]: () => Promise<void | Error> } = {
	view: async () => await commandManagerInstance.view(),
	unregister: async () => await commandManagerInstance.unregister(),
	delete: async () => await commandManagerInstance.delete(process.argv[4]),
	register: async () => {
		await loaderInstance.loadCommands(true);
		await commandManagerInstance.register();
	},
};

// Handle command action if provided as process argument
if (process.argv[2] === 'commands' && commandActions[process.argv[3]]) {
	await commandActions[process.argv[3]]();
	process.exit(0);
} else {
	(async (): Promise<BaseClient> => await initiate())();
}

/**
 * Initiates the bot by loading commands, events, database, and logging in
 * @async
 * @returns {Promise<BaseClient>} Resolves with the client instance
 */
async function initiate(): Promise<BaseClient> {
	await loaderInstance
		.loadCommands()
		.catch((error: Error) => loggerInstance.error('Error while loading commands', error));
	await loaderInstance
		.loadEvents()
		.catch((error: Error) => loggerInstance.error('Error while loading events', error));
	await databaseInstance
		.initiate()
		.catch((error: Error) => loggerInstance.error('Error while initializing database', error));
	await loaderInstance
		.login()
		.catch((error: Error) => loggerInstance.error('Error while logging in bot', error));

	return clientInstance;
}

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error): void => {
	loggerInstance.error('An uncaught exception occurred', error);
	clientUtilsInstance.sendToErrorLog(error, 'error');
});

// Handle unhandled promise rejections.
process.on('unhandledRejection', (reason: any): void => {
	loggerInstance.error('An unhandled rejection occurred', reason);
	clientUtilsInstance.sendToErrorLog(reason, 'error');
});

// Handle process warnings.
process.on('warning', (warning: Error): void => {
	loggerInstance.warn('A warning occurred', warning);
	clientUtilsInstance.sendToErrorLog(warning, 'warning');
});

export { clientInstance as client };
