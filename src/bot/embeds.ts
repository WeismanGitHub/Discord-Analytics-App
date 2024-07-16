import { EmbedBuilder } from 'discord.js';

class CustomEmbed extends EmbedBuilder {
    constructor() {
        super();

        this.setColor('#ffffff'); // White
    }
}

class ErrorEmbed extends CustomEmbed {
    constructor(description: string | null = null, statusCode: number | null = null) {
        super();

        this.setTitle("An error occurred!")
            .setDescription(description)
            .setColor('#FF0000') // Red
            .setFooter({ text: `Status Code: ${statusCode ?? 'Unknown'}` });
    }
}

class InfoEmbed extends CustomEmbed {
    constructor(title: string | null, description: null | string = null, footer: null | string = null) {
        super();

        this.setTitle(title)
            .setDescription(description)
            .setFooter(footer ? { text: footer } : null);
    }
}

export { ErrorEmbed, InfoEmbed };
