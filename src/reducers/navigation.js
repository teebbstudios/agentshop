import AppNavigator from "../containers/navigator";
import { NavigationActions } from 'react-navigation'
import store from '../store'

const needLoginRouters = [

]


export default (state, action) => {
    let nextState;
    switch (action.type) {
        case 'Navigation/NAVIGATE':
            if (needLoginRouters.includes(action.routeName)) {
                const {
                    login
                } = store.getState().app.user

                if (login) {
                    nextState = AppNavigator.router.getStateForAction(action, state);
                } else {
                    nextState = AppNavigator.router.getStateForAction(
                        NavigationActions.navigate({ routeName: 'UserLogin' }),
                        state
                    )
                }
            } else {
                nextState = AppNavigator.router.getStateForAction(action, state);
            }
            break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    return nextState || state;
};
