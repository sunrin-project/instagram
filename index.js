import { IgApiClient } from 'instagram-private-api';
import { exec } from 'child_process';
import fs from 'fs';
import cron from 'node-cron';
import { config } from './config/config.js';
import { logger } from './config/winston.js';
import { notificationInstagramPost } from './lib/webhook.js';


function isFirstWeekdayOfMonth(today) {
    
    // 이번 달의 첫 번째 날을 계산 (1일)
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    // 주말(토요일=6, 일요일=0)을 제외한 첫 번째 평일(월~금) 찾기
    let firstWeekday;
    for (let i = 0; i < 7; i++) {
        const day = firstDayOfMonth.getDay();
        if (day !== 0 && day !== 6) { // 일요일이 0, 토요일이 6
            firstWeekday = firstDayOfMonth;
            break;
        }
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    // 오늘이 그 첫 번째 평일과 같은지 확인
    return today.getDate() === firstWeekday.getDate();
}

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

            const todayDate = `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월 ${String(date.getDate()).padStart(2, '0')}일 ${dayToKorean(date.getDay())}`;

            if (isFirstWeekdayOfMonth(date)) {
                exec('python3 scripts/rest_maker.py', async (err, stdout, stderr) => {
                    await instagram.publish.album({
                        items: [
                            { width: 1024, height: 1024, file: food},
                            { width: 1024, height: 1024, file: fs.readFileSync('build/rest.jpeg') }
                        ],
                        caption: `${config.schoolName} 오늘의 정보\n\n${todayDate}\n\n#${config.schoolName} #급식표 #밥밥밥 #휴일`,
                    }).then(() => {
                        if(config.discord.on) {
                            notificationInstagramPost();
                        }
                        logger.info('Successfully uploaded the post to Instagram.')
                    }).catch((err) => {
                        logger.error(err)
                    });;
                })
            } else {
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
            }
        });
    })
}


cron.schedule(config.interval, () => {
    logger.info('Cron job has been executed.');
    postToInstagram(10);
});

export { postToInstagram };

logger.info('The program has started.');
