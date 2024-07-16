import { Client, Collection, ClientOptions, Events, GatewayIntentBits } from 'discord.js';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import zod from 'zod';

function getPaths(path: string, filePaths: string[]): string[] {
    const fileStat = statSync(path);

    if (fileStat.isFile()) {
        filePaths.push(path);
    } else if (fileStat.isDirectory()) {
        for (const subPath of readdirSync(path)) {
            getPaths(join(path, subPath), filePaths);
        }
    }

    return filePaths;
}

const commandSchema = zod.object({
    data: zod.any(),
    execute: zod.function().args(zod.array(zod.unknown())).returns(zod.promise(zod.unknown())),
});

const eventSchema = zod.object({
    name: zod.string(),
    execute: zod.function().args(zod.array(zod.unknown())).returns(zod.promise(zod.unknown())),
});

class CustomClient extends Client {
    private readonly commands: Collection<unknown, any>;

    constructor(clientOptions: ClientOptions) {
        super(clientOptions);

        this.commands = new Collection();
    }

    public async start(token: string) {
        await this.login(token);

        this.loadCommands();
        this.loadEventListeners();
    }

    private async loadCommands() {
        const commandsPaths: string[] = getPaths(join(__dirname, 'commands'), []);
        const commands = [];

        for (const path of commandsPaths) {
            const command = commandSchema.parse(require(path).default);

            commands.push(command.data.toJSON());
            this.commands.set(command.data.name, command);
        }

        this.on(Events.InteractionCreate, async (interaction) => {
            if (!interaction.isCommand()) return;

            const command = this.commands.get(interaction.commandName);

            try {
                await command.execute(interaction);
            } catch (err) {
                console.error(err);

                if (interaction.replied || interaction.deferred) {
                    // send an error in the channel
                } else {
                    // respond with an error
                }
            }
        });

        console.log(`> Load ${commands.length} commands`);
    }

    private async loadEventListeners() {
        const eventsPaths = getPaths(join(__dirname, 'events'), []);

        for (const path of eventsPaths) {
            const event = eventSchema.parse(require(path)?.default);

            this.on(event.name, async (...args) => {
                try {
                    await event.execute(args);
                } catch (err) {
                    console.error(err);

                    if (event.name !== Events.InteractionCreate) return;
                    // send an error to the client
                }
            });
        }

        console.log(`> Load ${eventsPaths.length} event listeners`);
    }
}

const client = new CustomClient({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
});

export default client;
