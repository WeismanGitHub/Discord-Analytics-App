import zod from 'zod';

const envSchema = zod.object({
    BOT_ID: zod.string(),
    TOKEN: zod.string(),

    PASSWORD: zod.string(),
    DATABASE: zod.string(),
    HOST: zod.string(),
    USER: zod.string(),
    PORT: zod.number(),
});

export default envSchema.parse({
    TOKEN: process.env.TOKEN,
    BOT_ID: process.env.BOT_ID,

    DATABASE: process.env.DATABASE,
    PASSWORD: process.env.PASSWORD,
    HOST: process.env.HOST,
    USER: process.env.USER,
    PORT: process.env.POST,
});
