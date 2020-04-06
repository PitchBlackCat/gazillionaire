import {Logger} from '../../util/Logger';

export function Manifest(options: {
    key: string,
    data: {
        id: string,
        src: string,
        type?: string
    }[]
}) {
    return function (target: Function) {
        target.prototype['manifest'] = options;
        Logger.log(Logger.MANIFEST, `Added manifest '${options.key}' to '${target.name}'`);
    };
}
