export interface TypeCard {
    type: string;
    name: string;
}

export interface Response {
    _id: string;
    type_cards: TypeCard[];
}

export interface CardsInterface {
    response: Response;
}

export class RequestCard {
    userId: string;
    type: string;
    name: string;

    public constructor(data?: Partial<RequestCard>) {
        Object.assign(this, data);
    }
}