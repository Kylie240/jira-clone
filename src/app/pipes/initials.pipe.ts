import { Pipe, PipeTransform } from '@angular/core';
import { UserDto } from '../dtos/userDto';

@Pipe({ 
    name: 'initials',
    standalone: true,
})
    export class InitialsPipe implements PipeTransform {
        transform(user: UserDto): any {
        return user.firstName[0].concat(user.lastName[0]);
    }
}