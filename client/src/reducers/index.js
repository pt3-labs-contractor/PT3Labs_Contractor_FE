import { LOADING, SUCCESS, FAILURE } from '../actions';

const initialState = {
  users: [],
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case LOADING:
      return { ...state, users: [], loading: true, error: null };
    case SUCCESS:
      return { ...state, user: action.payload, loading: false, error: null };
    case FAILURE:
      return { ...state, user: [], loading: false, error: action.error };
    default:
      return state;
  }
}