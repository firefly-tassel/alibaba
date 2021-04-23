import { SECURITY } from '../action-types'

export const changeSecurity = (data) => {
    return { type: SECURITY, data: data }
}