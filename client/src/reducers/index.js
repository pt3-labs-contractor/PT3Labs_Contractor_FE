import {
  LOADING,
  SUCCESS,
  FAILURE,
  SELECTED,
  SET_DAY,
  SET_MONTH,
  SET_SCHEDULE,
  FAIL_SCHEDULE,
} from '../actions';

const initialState = {
  accounts: {
    users: [],
    contractors: [],
  },
  loading: false,
  error: null,
  thisContractor: {}, // replaced when get endpoint is added maybe
  thisMonth: new Date(),
  thisDay: new Date(),
  schedule: [],
  errorSchedule: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        accounts: { users: [], contractors: [] },
        loading: true,
        error: null,
      };
    case SUCCESS:
      return {
        ...state,
        accounts: action.payload,
        loading: false,
        error: null,
      };
    case FAILURE:
      return {
        ...state,
        accounts: { users: [], contractors: [] },
        loading: false,
        error: action.error,
      };
    case SELECTED: // replaced when get endpoint is added maybe
      return { ...state, thisContractor: action.payload };
    case SET_DAY:
      return { ...state, thisDay: action.payload };
    case SET_MONTH:
      return { ...state, thisMonth: action.payload };
    case SET_SCHEDULE:
      return {
        ...state,
        schedule: action.payload,
        errorSchedule: null,
      };
    case FAIL_SCHEDULE:
      return {
        ...state,
        schedule: [],
        errorSchedule: action.error,
      };
    default:
      return state;
  }
};
