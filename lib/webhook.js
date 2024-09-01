import { config } from '../config/config.js';

export const notificationInstagramPost = () => {
    fetch(config.discord.webhook, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: `✅ The post has been successfully uploaded to Instagram. (**${todayDate}**)`
        })
    });
}