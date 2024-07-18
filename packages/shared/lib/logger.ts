import chalk from "chalk";

/**
 * Logger 클래스는 다양한 수준의 로그 메시지를 콘솔에 출력합니다.
 */
export default class Logger {
    /**
     * 로그 메시지를 포맷팅하여 출력합니다.
     * @param level 로그 레벨 (DEBUG, ERROR, WARN, INFO)
     * @param message 로그 메시지
     * @param color 로그 레벨에 따른 색상 함수
     */
    private log(level: string, message: string | Error, color: (text: string) => string): void {
        const prefix = `[${level}]`;
        const timestamp = chalk.gray(new Date().toLocaleTimeString());
        console.log(`${color(prefix)} ${message} ${timestamp}`);
    }

    /**
     * 디버그 수준의 로그 메시지를 출력합니다.
     * @param message 로그 메시지
     */
    debug(message: string | Error): void {
        this.log('DEBUG', message, chalk.blueBright);
    }

    /**
     * 에러 수준의 로그 메시지를 출력합니다.
     * @param message 로그 메시지
     */
    error(message: string | Error): void {
        this.log('ERROR', message, chalk.redBright);
    }

    /**
     * 경고 수준의 로그 메시지를 출력합니다.
     * @param message 로그 메시지
     */
    warn(message: string | Error): void {
        this.log('WARN', message, chalk.yellowBright);
    }

    /**
     * 정보 수준의 로그 메시지를 출력합니다.
     * @param message 로그 메시지
     */
    info(message: string | Error): void {
        this.log('INFO', message, chalk.greenBright);
    }
}