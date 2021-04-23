import { TOPIC } from '../action-types'

export const changeTopic= (data) => {
    return { type: TOPIC, data: data }
}