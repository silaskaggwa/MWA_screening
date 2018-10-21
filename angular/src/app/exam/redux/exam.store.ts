import { SET_INVITATION_ID } from './exam.actions';

export interface IAppState {
  invitation_id: string;
}

export const INITIAL_STATE: IAppState = {
  invitation_id: null,
};

export function rootReducer(lastState: IAppState, action): IAppState {
  switch(action.type) {
    case SET_INVITATION_ID: 
      return Object.assign({}, lastState, {
        invitation_id: action.invitation_id
      });
  }

  return lastState;
}