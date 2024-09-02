import { IgApiClient } from 'instagram-private-api';
import { exec } from 'child_process';
import fs from 'fs';
import cron from 'node-cron';
import { config } from './config/config.js';
import { logger } from './config/winston.js';
import { notificationInstagramPost } from './lib/webhook.js';

function dayToKorean(day) {
    const days = [ '일', '월', '화', '수', '목', '금', '토' ];
    return days[day] + '요일';
}

const postToInstagram = async (delay) => {
    const date = new Date();

    exec(`python3 scripts/image_maker.py ${delay}`, async (err, stdout, stderr) => {
	    logger.info('Python has been executed.');

        if (err) {
            console.log(err)
            return
        }

        const instagram = new IgApiClient();

        instagram.state.generateDevice(config.instagram.username);

        await instagram.account.login(config.instagram.username, config.instagram.password).catch((err) => {
 	        logger.error('Instagram login failed.');
            return;
        }).then(async () => {
            logger.info('Successfully logged into Instagram.');

            const food = fs.readFileSync('build/meal.jpeg');

            // await instagram.publish.album({
            //     items: [
            //         { width: 1024, height: 1024, file: food}
            //     ],
            //     caption: 'Test Image', // nice caption (optional)
            // });

            const todayDate = `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월 ${String(date.getDate()).padStart(2, '0')}일 ${dayToKorean(date.getDay())}`;

            await instagram.publish.photo({
                file: food,
                caption: `${config.schoolName} 오늘의 정보\n\n${todayDate}\n\n#${config.schoolName} #급식표 #밥밥밥`, // nice caption (optional)
            }).then(() => {
                if(config.discord.on) {
                    notificationInstagramPost();
                }
                logger.info('Successfully uploaded the post to Instagram.')
            }).catch((err) => {
                logger.error(err)
            });
        });
    })
}


cron.schedule(config.interval, () => {
    logger.info('Cron job has been executed.');
    postToInstagram(10);
});

export { postToInstagram };

logger.info('The program has started.');
