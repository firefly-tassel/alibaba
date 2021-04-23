import { COMMENT } from '../action-types'

export const changeComment= (data) => {
    return { type: COMMENT, data: data }
}