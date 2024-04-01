require("dotenv").config();
const { IgApiClient } = require('instagram-private-api');
const { exec } = require('child_process');
const fs = require('fs');
var cron = require('node-cron');

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
    exec('python image_maker.py', async (err, stdout, stderr) => {
        if (err) {
            console.error(err)
            return
        }
        const instagram = new IgApiClient();

        instagram.state.generateDevice(process.env.IG_USERNAME);
    
        await instagram.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    
        const food = fs.readFileSync('build/meal.jpeg');

        // await instagram.publish.album({
        //     items: [
        //         { width: 1024, height: 1024, file: food}
        //     ],
        //     caption: 'Test Image', // nice caption (optional)
        // });
        
        console.log('📷 Upload photo to instagram')

        const todayDate = `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월 ${String(date.getDate()).padStart(2, '0')}일 ${dayToKorean(date.getDay())}`;

        await instagram.publish.photo({
            file: food,
            caption: `선린인터넷고등학교 오늘의 정보\n\n${todayDate}\n\n#선린고 #급식표 #선린투데이`, // nice caption (optional)
        }).then((media) => {
            fetch('https://discord.com/api/webhooks/1223979097923780710/6JaMjmzwt7JUFuGHFcvcPUrTInQuo7zIcezgKZhsaZdqsTwHoBtprORw5hWCjrfsW5zq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: `✅ 급식 사진이 성공적으로 업로드 되었습니다! (**${todayDate}**)`
                })
            })
        }).catch((err) => {
            console.error(err)
        });
    })
}

cron.schedule('* * * * *', () => {
    console.log('⏰ Running a task every minute');
    postToInstagram();
});