import { ProjectDto } from "../dtos/projectDto";

export const projects: ProjectDto[] = [
    {
        projectId: '7c6102b0-ad6e-46de-92a2-a7b39ce9607e',
        name: '(Welcome) To My Jira Clone',
        columns: [
            {
            title: 'TO DO',
            items: [
                {
                itemId: '1',
                image: 'https://www.shutterstock.com/image-vector/elearning-banner-online-education-home-260nw-1694176021.jpg',
                title: 'Testing',
                assignee: '4',
                type: 0,
                dateCreated: new Date(),
                priority: 0,
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
                assignee: '4',
                type: 2,
                dateCreated: new Date(),
                priority: 0,
                },{
                itemId: '3',
                image: '',
                title: 'Testing',
                assignee: '4',
                type: 2,
                dateCreated: new Date(),
                priority: 0,
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
                type: 0,
                dateCreated: new Date(),
                priority: 0,
                },{
                itemId: '3',
                image: '',
                title: 'Testing',
                assignee: '4',
                type: 3,
                dateCreated: new Date(),
                priority: 0,
                },
            ],
            },
        ],
    }
]