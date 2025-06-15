import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from '../dtos/userDto';
import { users } from '../data/userData';
import { teams } from '../data/teamData';
import { TeamDto } from '../dtos/teamDto';
import { projects } from '../data/projectData';
import { sideNavDto } from '../dtos/sideNavDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    readonly userData = users;
    readonly teamsData = teams;
  private userSource = new BehaviorSubject<UserDto>({
    userId: '1',
    firstName: 'Kylie', 
    lastName: 'Oliver', 
    title: 'Head Hancho', 
    email: 'olivkylie@gmail.com',
    password: '1234',
    teams: ['8a1f2149-0ee9-4c2d-b982-5c814defa813'], 
    projects: ['7c6102b0-ad6e-46de-92a2-a7b39ce9607e'],
    starred: ['7c6102b0-ad6e-46de-92a2-a7b39ce9607e'],
  });
  user$ = this.userSource.asObservable();

  getUserById(userId: string): UserDto {
    const user = users.find(user => user.userId === userId);
    return user;
  }

  userLogIn(user: UserDto) {
    this.userSource.next(user);
  }

  userLogOut(user: UserDto) {
    this.userSource.next(new UserDto);
  }

  userGetTeam(teamId: string): UserDto[] {
    const team = this.teamsData.find(t => t.teamId === teamId);
    if (!team) { return []; }

    const teamMembers = users.filter(user => team.members.includes(user.userId));
    return teamMembers;
  }

  getStarredProjects(userId: string) {
    const user = users.find(u => userId === userId);
    if (user) {
      const starredList = user.starred;
      const projectArr = projects.filter(p => starredList.includes(p.projectId));
      return projectArr.map(p => new sideNavDto(p.projectId, p.name, p.icon.icon, p.icon.color));
    }
    return [];
  }

  getUserProjects(userId: string) {
    const user = users.find(u => userId === userId);
    if (user) {
      const projectArr = projects.filter(p => user.projects.includes(p.projectId));
      return projectArr.map(p => new sideNavDto(p.projectId, p.name, p.icon.icon, p.icon.color));
    }
    return [];
  }

  getRecentItems(userId: string) {
    const user = users.find(u => userId === userId);
    if (user) {
      const projectArr = projects.filter(p => user.starred.includes(p.projectId));
      return projectArr.map(p => new sideNavDto(p.projectId, p.name, p.icon.icon, p.icon.color));
    }
    return [];
  }
}
