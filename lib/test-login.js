import { IgApiClient } from 'instagram-private-api';
import yaml from 'js-yaml';
import fs from 'fs';
import chalk from 'chalk';
import logging from './logging.js';

async function testLogin() {
    const config = yaml.load(fs.readFileSync('./config/config.yaml', 'utf8')).project;

    const instagram = new IgApiClient();

    instagram.state.generateDevice(config.instagram.username);

    await instagram.account.login(config.instagram.username, config.instagram.password).then(() => {
        logging.success(`로그인 테스트에 성공했습니다 ${chalk.blue(config.instagram.username)}`)
    }).catch((err) => {
        logging.error(`로그인 테스트에 실패했습니다 ${chalk.blue(config.instagram.username)}`)
    })
}

testLogin();