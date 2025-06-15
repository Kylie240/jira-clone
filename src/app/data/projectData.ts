import { ProjectDto } from "../dtos/projectDto";

export const projects: ProjectDto[] = [
    {
        projectId: '7c6102b0-ad6e-46de-92a2-a7b39ce9607e',
        name: '(Welcome) To My Jira Clone',
        icon: {icon: 'fa-solid fa-people-line', color: 'red'},
        taskTypes: [
            {
                taskId: 1,
                name: 'General',
                icon: 'fa-regular fa-square-check',
                color: 'red',
                description: '',
            },
            {
                taskId: 2,
                name: 'Household',
                icon: 'fa-solid fa-house',
                color: 'green',
                description: '',
            },
            {
                taskId: 3,
                name: 'Chore',
                icon: 'fa-solid fa-broom',
                color: 'yellow',
                description: 'Tasks for the kids',
            },
            {
                taskId: 4,
                name: 'Appointment',
                icon: 'fa-regular fa-calendar-check',
                color: 'purple',
                description: '',
            },
            {
                taskId: 5,
                name: 'Planning',
                icon: 'fa-regular fa-paper-plane',
                color: 'blue',
                description: '',
            },
            {
                taskId: 6,
                name: 'Social',
                icon: 'fa-regular fa-comment',
                color: 'gray',
                description: '',
            },
            {
                taskId: 7,
                name: 'Meal',
                icon: 'fa-solid fa-utensils',
                color: 'orange',
                description: '',
            },
        ],
        columns: [
            {
            title: 'TO DO',
            items: [
                {
                itemId: '1',
                image: 'https://www.shutterstock.com/image-vector/elearning-banner-online-education-home-260nw-1694176021.jpg',
                title: 'Testing',
                assignee: '1',
                taskType: 5,
                dateCreated: new Date(),
                priority: 1,
                },
                ]
            },
            {
            title: 'IN PROGRESS',
            items: [
                {
                itemId: '2',
                image: '',
                title: 'Testing',
                assignee: '2',
                taskType: 2,
                dateCreated: new Date(),
                priority: 4,
                },{
                itemId: '3',
                image: '',
                title: 'Testing',
                assignee: '4',
                taskType: 1,
                dateCreated: new Date(),
                priority: 2,
                },
            ],
            },
            {
            title: 'DONE',
            items: [
                {
                itemId: '2',
                image: '',
                title: 'Testing',
                assignee: '4',
                taskType: 6,
                dateCreated: new Date(),
                priority: 0,
                },{
                itemId: '3',
                image: '',
                title: 'Testing',
                assignee: '1',
                taskType: 3,
                dateCreated: new Date(),
                priority: 3,
                },
            ],
            },
        ],
    }
]