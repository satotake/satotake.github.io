import {JsonFile, FileSystem} from '@microsoft/node-core-library';
import stringifyObject from 'stringify-object';

const rushData = JsonFile.load('../../rush.json');

interface ProjectData {
    packageName: string
    projectFolder: string
    reviewCategory?: string
};

const projects: ProjectData[] = rushData.projects;

const noteProjects = projects.filter(p => p.projectFolder.startsWith('notes/'))

const objString = stringifyObject({updatedAt: Date.now(), data: noteProjects}, {indent: '  '})

const dest = './data/notes.ts';
FileSystem.ensureFolder('./data');
FileSystem.writeFile(dest, `export const noteData = ${objString}`);
console.log(`-- Saved: ${dest}`);
