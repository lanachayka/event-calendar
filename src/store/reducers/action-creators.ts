import { AuthActionCreators } from "./auth/action-creaters";
import { EventActionCreators } from "./event/action-creators";

export const allActionCreators = {
    ...AuthActionCreators,
    ...EventActionCreators
}