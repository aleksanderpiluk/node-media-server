export interface ListGroupsResponse {
    groups: {
        id: string;
        name: string;
        variants: string[];
    }[];
}