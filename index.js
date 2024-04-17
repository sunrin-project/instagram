import { IgApiClient } from 'instagram-private-api';
import { exec } from 'child_process';
import fs from 'fs';
import cron from 'node-cron';
import { config } from './config/config.js';
import yaml from 'js-yaml';
import chalk from 'chalk';
import DiscordLogging from './lib/webhook.js';
import logging from './lib/logging.js';

function dayToKorean(day) {
    const day = ['일', '월', '화', '수', '목', '금', '토'];
    return day[day];
}

const postToInstagram = async () => {
    const date = new Date();
    logging.info('Python 실행 요청 됨')
    exec('python scripts/image_maker.py', async (err, stdout, stderr) => {
        logging.info('Python 실행 됨')
        console.log(chalk.gray('[Info] Python 실행 됨'))
        if (err) {
            console.log(err)
            return
        }

        const config = yaml.load(fs.readFileSync('./config/config.yaml', 'utf8')).project;
        
        const instagram = new IgApiClient();

        instagram.state.generateDevice(config.instagram.username);
    
        await instagram.account.login(config.instagram.username, config.instagram.password).catch((err) => {
            logging.error('인스타그램 로그인에 실패했습니다.')
            return;
        }).then(async () => {
            logging.error('인스타그램 로그인 성공했습니다.')

            const food = fs.readFileSync('build/meal.jpeg');

            // 다중 이미지 업로드
            // await instagram.publish.album({
            //     items: [
            //         { width: 1024, height: 1024, file: food}
            //     ],
            //     caption: 'Test Image', // nice caption (optional)
            // });

            logging.info('인스타그램에 게시물 올리는 중')
    
            const todayDate = `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월 ${String(date.getDate()).padStart(2, '0')}일 ${dayToKorean(date.getDay())}`;
    
            await instagram.publish.photo({
                file: food,
                caption: `${config.school.name} 오늘의 정보\n\n${todayDate}\n\n#${config.school.name} #급식표 #밥밥밥`, // nice caption (optional)
            }).then(() => {
                if(config.discord.webhook !== '') {
                    Logging('discord')
                }
                logging.success('인스타그램에 게시물 성공적으로 업로드 됨')
            }).catch((err) => {
                console.error(err)
            });
        });
    })
}

cron.schedule(config.interval, () => {
    logging.warn('스케줄러 실행됨')
    postToInstagram();
});