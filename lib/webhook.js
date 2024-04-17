import chalk from 'chalk';

export const DiscordLogging = (type) => {
    const todayDate = `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월 ${String(date.getDate()).padStart(2, '0')}일 ${dayToKorean(date.getDay())}`;
    const config = yaml.load(fs.readFileSync('./config/config.yaml', 'utf8')).project;

    switch(type) {
        case 'discord':
            fetch(config.logger.discord.webhook, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: `✅ 인스타그램에 게시물이 성공적으로 업로드 되었습니다! (**${todayDate}**)`
                })
            });
        default:
            console.log(chalk.red('Logging type not supported.'))
    }
}