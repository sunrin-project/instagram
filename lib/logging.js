import chalk from 'chalk';

export default {
    info: (message) => {
        return console.log(`${chalk.bgBlue.bold(' INFO ')} ${message}`)
    },
    error: (message) => {
        return console.log(`${chalk.bgRed.bold(' ERROR ')} ${message}`)
    },
    warn: (message) => {
        return console.log(`${chalk.bgYellow.bold(' WARN ')} ${message}`)
    },
    success: (message) => {
        return console.log(`${chalk.bgGreen.bold(' SUCCESS ')} ${message}`)
    }
}