const { IgApiClient } = require('instagram-private-api');
const { exec } = require('child_process');
const fs = require('fs');
var cron = require('node-cron');
const { config } = require('./config/config');

function dayToKorean(day) {
    switch (day) {
        case 0:
            return '일요일'
        case 1:
            return '월요일'
        case 2:
            return '화요일'
        case 3:
            return '수요일'
        case 4:
            return '목요일'
        case 5:
            return '금요일'
        case 6:
            return '토요일'
    }
}

// 코드 이게 끝임

const postToInstagram = async () => {
    const date = new Date();
    console.log('🐍 Python 실행 요청됨')
    exec('python scripts/image_maker.py', async (err, stdout, stderr) => {
        console.log('🐍 Python 실행 됨')
        if (err) {
            console.log(err)
            return
        }
        const instagram = new IgApiClient();

        instagram.state.generateDevice(config.instagram.username);
    
        await instagram.account.login(config.instagram.username, config.instagram.password);
    
        const food = fs.readFileSync('build/meal.jpeg');

        // await instagram.publish.album({
        //     items: [
        //         { width: 1024, height: 1024, file: food}
        //     ],
        //     caption: 'Test Image', // nice caption (optional)
        // });
        
        console.log('📷 인스타그램에 게시물 올리는 중')

        const todayDate = `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월 ${String(date.getDate()).padStart(2, '0')}일 ${dayToKorean(date.getDay())}`;

        await instagram.publish.photo({
            file: food,
            caption: `${config.schoolName} 오늘의 정보\n\n${todayDate}\n\n#${config.schoolName} #급식표 #밥밥밥`, // nice caption (optional)
        }).then(() => {
            if(config.discord.on) {
                fetch(config.discord.webhook, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        content: `✅ 인스타그램에 게시물이 성공적으로 업로드 되었습니다! (**${todayDate}**)`
                    })
                });
            }
            console.log('✅ 인스타그램에 게시물 성공적으로 업로드 됨')
        }).catch((err) => {
            console.error(err)
        });
    })
}

cron.schedule(config.interval, () => {
    console.log('⏰ Cron job 실행됨');
    postToInstagram();
});