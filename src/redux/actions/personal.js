import { PERSONAL } from '../action-types'

export const changePersonal= (data) => {
    return { type: PERSONAL, data: data }
}