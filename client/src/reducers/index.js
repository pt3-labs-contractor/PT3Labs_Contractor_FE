import {
  // fetching users
  LOADING_USERS,
  FETCHING_USERS_SUCCESS,
  FETCHING_USERS_FAILURE,

  // fetching calander
  SET_DAY,
  SET_MONTH,

  // fetching schedule
  SET_SCHEDULE,
  FAIL_SCHEDULE,

  // fetching single contractor
  SINGLE_CONTRACTOR_LOADING,
  FETCH_SINGLE_CONTRACTOR_SUCCESS,
  FETCH_SINGLE_CONTRACTOR_FAIL,

  // fetching current user written feedback
  // USER_WRITTEN_FEEDBACK_LOADING,
  // USER_WRITTEN_FEEDBACK_SUCCESS,
  // USER_WRITTEN_FEEDBACK_FAIL,

  // fetching single contractor feedback
  // CONTRACTOR_FEEDBACK_LOADING,
  // FETCH_CONTRACTOR_FEEDBACK_SUCCESS,
  // CONTRACTOR_FEEDBACK_FAIL,

  // fetching current contractor appointments
  CONTRACTOR_APP_LOADING,
  RET_CONTRACTOR_APP_SUCC,
  RET_EDIT_CONTRACTOR_APP_SUCC,
  SENDING_PUT_REQ,
  CONTRACTOR_APP_FAIL,
  RET_DELETE_APP_SUCC,
  SENDING_DELETE_REQ,

  // user appointments
  SENDING_POST_REQ,
  RET_POST_USER_APP_SUCC,
  USER_APP_FAIL,
} from '../actions';

const initialState = {
  accounts: {
    users: [],
    contractors: [],
    // feedback: []
    appointments: [],
  },
  loading: false,
  error: null,
  thisContractor: {},
  thisMonth: new Date(),
  thisDay: new Date(),
  schedule: [],
  errorSchedule: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // loading all users
    case LOADING_USERS:
      return {
        ...state,
        accounts: { users: [], contractors: [] },
        loading: true,
        error: null,
      };
    case FETCHING_USERS_SUCCESS:
      return {
        ...state,
        accounts: action.payload,
        loading: false,
        error: null,
      };
    case FETCHING_USERS_FAILURE:
      return {
        ...state,
        accounts: { users: [], contractors: [] },
        loading: false,
        error: action.error,
      };

    // calander
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

    // fetching single contractor
    case SINGLE_CONTRACTOR_LOADING:
      return { ...state, loading: true, error: null };
    case FETCH_SINGLE_CONTRACTOR_SUCCESS:
      return { ...state, thisContractor: action.payload };
    case FETCH_SINGLE_CONTRACTOR_FAIL:
      return { ...state, loading: false, error: action.error };

    // fetching current user written feedback
    // case USER_WRITTEN_FEEDBACK_LOADING:
    //   return { ...state, loading: true, error: null };
    // case USER_WRITTEN_FEEDBACK_SUCCESS:
    //   return { ...state, accounts: { feedback: action.payload }}
    // case USER_WRITTEN_FEEDBACK_FAIL:
    //     return { ...state, loading: false, error: action.error };

    // fetching single contractors feedback
    // case CONTRACTOR_FEEDBACK_LOADING:
    //   return {...state, loading: true, error: null };
    // case FETCH_CONTRACTOR_FEEDBACK_SUCCESS:
    //   return {...state, accounts: { feedback: action.payload }}
    // case CONTRACTOR_FEEDBACK_FAIL:
    //   return {...state, loading: false, error: action.error}

    // fetching current contractor appointments
    case CONTRACTOR_APP_LOADING:
      return { ...state, loading: true, error: null };
    case RET_CONTRACTOR_APP_SUCC:
      return {
        ...state,
        loading: false,
        accounts: { appointments: action.payload },
      };
    case SENDING_PUT_REQ:
      return { ...state, loading: true, error: null };
    case RET_EDIT_CONTRACTOR_APP_SUCC:
      const toBeEdit = state.accounts.appointments.map(a => {
        if (a.id === action.payload.id) {
          const mod = action.payload;
          const retMod = {
            ...a,
            appointment_datetime: mod.appointment_datetime,
            appointment_datetime_end: mod.appointment_datetime_end,
          };
          a = retMod;
          return a;
        }
        return a;
      });
      return {
        ...state,
        loading: false,
        accounts: { appointments: toBeEdit },
      };
    case CONTRACTOR_APP_FAIL:
      return { ...state, loading: false, error: action.error };

    // User appointments
    case SENDING_POST_REQ:
      return { ...state, loading: true, error: null };
    case RET_DELETE_APP_SUCC:
      console.log('hello');
      const app = state.accounts.appointments.filter(a => {
        return a.id !== action.payload;
      });
      return { ...state, loading: false, accounts: { appointments: app } };
    case RET_POST_USER_APP_SUCC:
      console.log('hello');
      const newApp = action.payload;
      const appoints = state.accounts.appointments.slice();
      return {
        ...state,
        loading: false,
        accounts: { appointments: [...appoints, newApp] },
      };
    case USER_APP_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
