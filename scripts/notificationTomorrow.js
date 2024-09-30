import { notificationInstagramPost } from "../lib/webhook.js";

export const handleNotificationTomorrow = async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    let tomorrowMenu = '';

    (await fetch('http://127.0.0.1:8030/meal/tomorrow')).json().then((data) => {
        data.data.meals.forEach((meal) => {
            tomorrowMenu += `- ${meal.meal}\n`;
        })

        if(tomorrowMenu === '') {
            notificationTomorrowMenuError();
            return;
        }

        notificationInstagramPost(tomorrowMenu);
    });
};