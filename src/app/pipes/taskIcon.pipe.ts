import { Pipe, PipeTransform } from '@angular/core';
import { projects } from '../data/projectData';

@Pipe({ 
    name: 'taskIcon',
    standalone: true,
})
    export class TaskIconPipe implements PipeTransform {
        transform(taskId: number, projectId?: string): string {
            projectId = '7c6102b0-ad6e-46de-92a2-a7b39ce9607e';
        const project = projects.find(p => p.projectId === projectId) 
        if (project) {
            const tasks = project.taskTypes;
            try {
                const task = tasks.find(t => t.taskId === taskId);
                return task.icon;
            } catch (error) {
                return '';
            }
        }
        return '';
    }
}