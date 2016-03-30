import promisify = require('es6-promisify');
import rimraf_ = require('rimraf');

export let rimraf: (path: string) => Promise<void> = promisify(rimraf_);

