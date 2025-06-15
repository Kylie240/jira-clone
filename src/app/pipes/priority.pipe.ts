import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ 
    name: 'priority',
    standalone: true,
})
    export class PriorityPipe implements PipeTransform {
        transform(priority: number, item: "icon" | "color"): string {
        if (item === "icon") {
            switch (priority) {
                case 1:
                    return 'fa-solid fa-chevron-up';
                case 2:
                    return 'fa-solid fa-chevron-up';
                case 3:
                    return 'fa-solid fa-angles-up';
                case 4:
                    return 'fa-solid fa-triangle-exclamation';
                default:  return '';
            }
        } else if (item === "color") {
            switch (priority) {
                case 1:
                    return 'green';
                case 2:
                    return 'orange';
                case 3:
                    return 'red';
                case 4:
                    return 'darkred';
                default:  return '';
            }
        } else {
            return '';
        }
    }
}