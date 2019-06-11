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
  LOAD_SCHEDULE,
  FAIL_SCHEDULE,
  SET_AVAILABILITY_BY_DAY,

  // fetching services
  SET_SERVICES,
  LOAD_SERVICES,
  FAIL_SERVICES,

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
  // CONTRACTOR_APP_LOADING,
  // RET_CONTRACTOR_APP_SUCC,
  // CONTRACTOR_APP_FAIL
} from '../actions';

const initialState = {
  user: {},
  contractors: [],
  // feedback: []
  appointments: [],
  services: [],
  loading: false,
  error: null,
  thisContractor: {},
  sortedContractors: [],
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
        user: {},
        contractors: [],
        loading: true,
        error: null,
      };
    case FETCHING_USERS_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        contractors: action.payload.contractors,
        sortedContractors: action.payload.contractors,
        appointments: action.payload.appointments,
        loading: false,
        error: null,
      };
    case FETCHING_USERS_FAILURE:
      return {
        ...state,
        user: {},
        contractors: [],
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
        loadSchedule: false,
      };
    case SET_AVAILABILITY_BY_DAY:
      return { ...state, sortedContractors: action.payload };
    case LOAD_SCHEDULE:
      return {
        ...state,
        schedule: [],
        errorSchedule: null,
        loadSchedule: true,
      };
    case FAIL_SCHEDULE:
      return {
        ...state,
        schedule: [],
        errorSchedule: action.error,
        loadSchedule: false,
      };

    // fetching single contractor
    case SINGLE_CONTRACTOR_LOADING:
      return { ...state, loading: true, error: null };
    case FETCH_SINGLE_CONTRACTOR_SUCCESS:
      return {
        ...state,
        thisContractor: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_SINGLE_CONTRACTOR_FAIL:
      return { ...state, loading: false, error: action.error };

    // fetching services
    case SET_SERVICES:
      return {
        ...state,
        services: action.payload,
        loading: false,
        error: null,
      };
    case LOAD_SERVICES:
      return { ...state, services: [], loading: true, error: null };
    case FAIL_SERVICES:
      return { ...state, services: [], loading: false, error: action.error };

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
    // case CONTRACTOR_APP_LOADING:
    //   return{...state, loading: true, eror: null};
    // case RET_CONTRACTOR_APP_SUCC:
    //   return {...state, accounts:{appointments: action.payload }}
    // case CONTRACTOR_APP_FAIL:
    //   return {...state, loading: false, error: action.error}
    default:
      return state;
  }
};
