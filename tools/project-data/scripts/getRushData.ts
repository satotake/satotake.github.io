
import {JsonFile} from '@microsoft/node-core-library';

const rushData = JsonFile.load('../../rush.json');

interface ProjectData {
    packageName: string
    projectFolder: string
    reviewCategory?: string
};

const projects: ProjectData[] = rushData.projects;

const noteProjects = projects.filter(p => p.projectFolder.startsWith('notes/'))

JsonFile.save({updatedAt: Date.now(), data: noteProjects}, './dist/notes.json');