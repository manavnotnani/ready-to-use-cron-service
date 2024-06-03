import pino from 'pino';
import CONFIG from '../config/env';

const l = pino({
    name: CONFIG.project.name,
    level: CONFIG.project.logLevel,
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            singleLine: true,
            colorizeObjects: true,
            minimumLevel: CONFIG.project.logLevel,
            // levelFirst: true,
            // levelKey: 'level', // --levelKey
            translateTime: 'SYS:yyyy-dd-mm, h:MM:ss TT'
            // translateTime: 'SYS:standard',
            // Following are hindering with color codes and not showing logLevel
            // customColors: 'err:red,info:blue', // --customColors
            // customLevels: 'err:99,info:1', // --customLevels
        }
    },
});

export default l;
