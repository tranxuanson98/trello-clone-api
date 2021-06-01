export enum typeActivity {
    board,
    card,
    list,
    comment
}

export class CreateObjectActivityDto {
    readonly id: string;
    typeActivity: typeActivity;
    typeId: string
}