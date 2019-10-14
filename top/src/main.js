import App from './App.svelte';
import "./main.css";
import {projectData} from 'project-data';

const app = new App({
	target: document.body,
	props: {
		notes: projectData.notes,
	}
});

export default app;
