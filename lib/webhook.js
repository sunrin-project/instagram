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

export const notificationTomorrowMenu = (tomorrowMenu) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    fetch(config.discord.webhook, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: `🍽️ **Tomorrow's menu**\n\n${tomorrowMenu}`,
            embeds: [
                {
                    title: "🍽️ 내일 급식 메뉴",
                    description: "```\n- 기장밥```",
                    color: 3132961,
                    timestamp: tomorrow.toISOString(),
                }
            ],
        })
    });
}