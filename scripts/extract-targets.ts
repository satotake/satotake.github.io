import { JsonFile, FileSystem } from '@microsoft/node-core-library';
import path from 'path';

const DIST_EXPRESSION = '--dist='
const DEFUALT_DIST_VALUE = 'dist';

const args = process.argv.slice(2)
const distArg = args.find(a => a.startsWith(DIST_EXPRESSION));

const findAndCopy = (dist: string) => (p: string) => {
    const packagePath = `${p}/package.json`;
    const { config } = JsonFile.load(packagePath);
    const rushTarget = (config && config.rushTarget);

    if (!rushTarget) {
        throw new Error(`Please set config.rushTarget to ${packagePath} !!!`);
    }

    const sourcePath = `${p}/${rushTarget}`;
    const destinationPath = path.join(dist, ...sourcePath.split('/').slice(sourcePath.startsWith('top/') ? 1 : 0, -1))
    FileSystem.copyFile({ sourcePath, destinationPath });
    console.log(`* ${sourcePath} => ${destinationPath}`);
}

const main = (dist: string) => {
    FileSystem.deleteFolder(dist);
    const { projects } = JsonFile.load('./rush.json');
    const projectFolders = projects.map((p) => p.projectFolder);
    console.log('======= copied =======')
    projectFolders.filter((p) => !p.startsWith('tools/')).forEach(findAndCopy(dist));
    console.log('======================')
};

const dist = distArg
    ? distArg.slice(DIST_EXPRESSION.length)
    : DEFUALT_DIST_VALUE
    ;

main(dist);
