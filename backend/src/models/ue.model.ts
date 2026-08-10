export interface UE {
    id: string;
    title: string;
}

export type CreateUeDTO = Omit<UE, "id">;