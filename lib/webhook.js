import { config } from '../config/config.js';

export const notificationInstagramPost = () => {
    console.log('Webhook 함수 실행 됨');
    const date = new Date();
    const todayDate = `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월 ${String(date.getDate()).padStart(2, '0')}일 ${dayToKorean(date.getDay())}`;
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
                }
            ],
        })
    });
}

export const notificationTomorrowMenuError = () => {
    fetch(config.discord.webhook, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "embeds": [
                {
                    "title": "❌ 등록된 내일 급식이 없습니다",
                    "color": 13517601,
                    "timestamp": "2024-09-08T15:00:00.000Z"
                }
            ],
        })
    });
}