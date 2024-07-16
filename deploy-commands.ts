require('dotenv').config({ path: '.env.local' });
import { readdirSync, statSync } from 'fs';
import { REST, Routes } from 'discord.js';
import { join, resolve } from 'path';
import zod from 'zod';

if (!process.env.TOKEN || !process.env.BOT_ID) {
    throw new Error('Missing Token or Bot ID');
}

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

(async () => {
    const rest = new REST().setToken(process.env.TOKEN!);

    const commandsPaths: string[] = getPaths(join(__dirname, './dist/src/bot/commands'), []);
    const commands: any[] = [];

    for (const path of commandsPaths) {
        const fileURL = 'file:///' + resolve(path).replace(/\\/g, '/');

        const command = commandSchema.parse((await import(fileURL)).default.default);
        commands.push(command.data.toJSON());
    }

    await rest.put(Routes.applicationCommands(process.env.BOT_ID!), { body: commands });

    console.log(`> Deploy ${Object.entries(commands).length} commands to Discord`);
})();
