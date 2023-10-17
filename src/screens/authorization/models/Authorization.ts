import { createEvent, createStore } from 'effector';
import { AuthorizationType } from '../../../app/types/authorization';

interface AuthorizationState {
  authorizationType: AuthorizationType;
  isAuthorized: boolean;
}

export const setAuthorizationType = createEvent<AuthorizationType>();
export const setIsAuthorized = createEvent<boolean>();

export const $authorization = createStore<AuthorizationState>({
  isAuthorized: false,
  authorizationType: AuthorizationType.LOGIN,
})
  .on(setAuthorizationType, (state, authorizationType) => {
    return { ...state, authorizationType: authorizationType };
  })
  .on(setIsAuthorized, (state, isAuthorized) => ({ ...state, isAuthorized: isAuthorized }));
