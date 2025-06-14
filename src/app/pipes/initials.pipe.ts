import { Pipe, PipeTransform } from '@angular/core';
import { UserDto } from '../dtos/userDto';

@Pipe({ 
    name: 'initials',
    standalone: true,
})
    export class InitialsPipe implements PipeTransform {
        transform(user: UserDto): string {
        const firstInitial = user.firstName[0];
        const lastInitial = user.lastName[0];
        return firstInitial + lastInitial;
    }
}