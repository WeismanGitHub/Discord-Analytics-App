import NodeCache from 'node-cache';

const guildCache = new NodeCache({ stdTTL: 1800, deleteOnExpire: true });

export default guildCache;
