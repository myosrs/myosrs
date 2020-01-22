const CLEAR = "session/CLEAR";
const SET = "session/SET";

const DEFAULT_STATE = null;

// TODO: stronger typing
export const session = (state = DEFAULT_STATE, action: any = {}) => {
  switch (action.type) {
    case SET:
      return action.session;
    case CLEAR:
      return null;
  }
  return state;
};

export const setSession = (session: any) => {
  return { session, type: SET };
};

export const clearSession = () => {
  return { type: CLEAR };
};
