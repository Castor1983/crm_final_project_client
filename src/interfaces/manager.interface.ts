export interface ManagerInterface {
    id: string,
    created: string,
    updated: string,
    name: string,
    surname: string,
    email: string,
    is_active: boolean,
    role: string,
    last_login: string,
    is_banned: boolean,
    orderStats: {
        total: string,
        in_work: string,
        new: string,
        agree: string,
        disagree: string,
        dubbing: string,
        null_count: string
    }
}