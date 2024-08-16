export const config = {
    schoolName: '선린인터넷고등학교',
    instagram: {
        username: '', // 인스타그램 아이디
        password: '' // 인스타그램 비밀번호
    },
    discord: {
        on: true, // 디스코드 웹훅 사용 여부
        webhook: 'https://discord.com/api/webhooks/webhook-id' // 디스코드 웹훅 주소
    },
    interval: '0 7 * * 1-5' // cron 스케줄링
}