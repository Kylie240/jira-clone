export class sideNavDto {
    id: string | number;
    name: string;
    icon: string;
    color: string;

    constructor(id: string | number = null, name: string = null, icon: string = null, color: string = null) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.color = color;
    }
}