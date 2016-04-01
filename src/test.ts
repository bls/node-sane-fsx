import * as assert from 'assert';
import * as fs from '@sane/fs';
import * as fsx from './index';

describe('fsx', function() {
    describe('rm_rf', function() {
        const TEST_DIR = '/tmp/rimraf';
        const DOES_NOT_EXIST = '/tmp/doesnotexist_really';

        it('should delete things', async () => {
            let testFiles = ['/test1', '/test2', '/test3'].map(x => TEST_DIR + x);
            await fs.mkdirAsync(TEST_DIR);
            for(let tf of testFiles) {
                await fs.writeFileAsync(tf, 'Hello World');
                assert.equal(await fs.readFileAsync(tf), 'Hello World'); /* Paranoia */
            }
            await fsx.rm_rf(TEST_DIR);
            try {
                await fs.statAsync(TEST_DIR);  /* Should throw if rimraf worked */
            } catch (e) {
                assert.equal(e.code, 'ENOENT');
                return;
            }
            assert.equal(1, 0); /* NOT REACHED */
        });
        it('should succeed even when dir does not exist', async () => {
            await fsx.rm_rf(DOES_NOT_EXIST);
        });
    });
    describe('mkdirp', function() {
        let UNLIKELY_PREFIX = '/tmp/unlikely_prefix',
            TEST_DIR = `${UNLIKELY_PREFIX}/b/c/d/e`;

        it('should create dirs recursively', async () => {
            await fsx.mkdirp(TEST_DIR);
            await fs.statAsync(TEST_DIR); /* Should succeed if mkdirp worked */
            await fsx.rm_rf(UNLIKELY_PREFIX);
        });
    });
});
