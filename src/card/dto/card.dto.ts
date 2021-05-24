export class CreateCardDto {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly date: Date;
    readonly listId: string
}