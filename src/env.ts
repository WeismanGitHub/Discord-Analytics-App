import zod from 'zod';

const envSchema = zod.object({
    TOKEN: zod.string(),
});

export default envSchema.parse({
    TOKEN: process.env.TOKEN,
});
