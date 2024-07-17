import zod from 'zod';

const envSchema = zod.object({
    TOKEN: zod.string(),
    BOT_ID: zod.string(),

    DATABASE: zod.string(),
    HOST: zod.string(),
    USER: zod.string(),
    PORT: zod.number(),
});

export default envSchema.parse({
    TOKEN: process.env.TOKEN,
    BOT_ID: process.env.BOT_ID,

    DATABASE: process.env.DATABASE,
    HOST: process.env.HOST,
    USER: process.env.USER,
    PORT: process.env.POST,
});
