export const baseUrl = 'http://localhost:3001/api';
const authUrl ='/auth';
export const managersUrl = '/managers';
export const ordersUrl = '/orders';
const signIn = '/sign-in';
const signOut = '/sign-out';
const refresh = '/refresh';
const activate = '/activate';
const deactivate = '/deactivate';
const manager = '/manager';
const ban = '/ban';
const unban = '/unban';
const exportToExcel = '/export';
const groups = '/groups';
const addComment = '/addComment';
const edit = '/edit';


export const urls = {
    auth: {
        signIn: `${authUrl}${signIn}`,
        signOut: `${authUrl}${signOut}`,
        refresh: `${authUrl}${refresh}`
    },
    managers: {
        activateManager: (managerId: string) => `${managersUrl}${activate}${manager}/${managerId}`,
        activatePassword: (activateToken: string | undefined) => `${managersUrl}${activate}/${activateToken}`,
        deactivate: (managerId: string) => `${managersUrl}${deactivate}/${managerId}`,
        ban: (managerId: string) => `${managersUrl}${ban}/${managerId}`,
        unban: (managerId: string) => `${managersUrl}${unban}/${managerId}`

},
orders: {
        exportToExcel: `${ordersUrl}${exportToExcel}`,
        groups: `${ordersUrl}${groups}`,
        orderById: (orderId: number | null) => `${ordersUrl}/${orderId}`,
        addComment: (orderId: number) => `${ordersUrl}${addComment}/${orderId}`,
        editOrder: (orderId: string | undefined) => `${ordersUrl}${edit}/${orderId}`,
}
}