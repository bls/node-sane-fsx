import promisify = require('es6-promisify');
import rimraf_ = require('rimraf');
import mkdirp_ = require('mkdirp');

export let rm_rf: (path: string) => Promise<void> = promisify(rimraf_);
export interface MkdirpLongOptions {
    mode: any;
    fs: any;
}
export type MkdirpOptions = MkdirpLongOptions | string | number;
export let mkdirp: (dir: string, opts?: MkdirpOptions) => Promise<string> = promisify(mkdirp_);
