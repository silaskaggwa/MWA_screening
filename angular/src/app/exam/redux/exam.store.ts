import { SET_INVITATION_ID, INCREMENT_TIME_USED, INCREMENT_TIME_AWAY } from './exam.actions';

export interface IAppState {
  invitation_id: string,
  time_used: number,
  time_away: number,
}

export const INITIAL_STATE: IAppState = {
  invitation_id: null,
  time_used: 0,
  time_away: 0,
};

export function rootReducer(lastState: IAppState, action): IAppState {
  switch(action.type) {
    case SET_INVITATION_ID: 
      return Object.assign({}, lastState, {
        invitation_id: action.invitation_id,
        time_used: lastState.time_used,
        time_away: lastState.time_away
      });
    case INCREMENT_TIME_USED:
      return Object.assign({}, lastState, {
        invitation_id: lastState.invitation_id,
        time_used: lastState.time_used + action.increment,
        time_away: lastState.time_away 
      });
    case INCREMENT_TIME_AWAY: 
      return Object.assign({}, lastState, {
        invitation_id: lastState.invitation_id,
        time_used: lastState.time_used,
        time_away: lastState.time_away + action.increment
      });
  }

  return lastState;
}