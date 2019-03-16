import {COMMENTS} from "../shared/Comments";
import {PROMOTIONS} from "../shared/Promotions";
import {LEADERS} from "../shared/Leaders";
import { DISHES } from '../shared/dishes';

export const initialState = {
    dishes: DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS
};

export const Reducer = (state = initialState, action) => {
    return state;
};