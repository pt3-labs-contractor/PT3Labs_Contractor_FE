import {
  // fetching users
  LOADING,
  FETCHING_USERS_SUCCESS,
  FAILURE,

  // fetching calander
  SET_DAY,
  SET_MONTH,

  // fetching schedule
  SET_SCHEDULE,

  // fetching services
  SET_SERVICES,

  // fetching single contractor
  FETCH_SINGLE_CONTRACTOR_SUCCESS,

  // fetching current user written feedback
  USER_WRITTEN_FEEDBACK_SUCCESS,

  // fetching single contractor feedback
  // FETCH_CONTRACTOR_FEEDBACK_SUCCESS,

  // fetching current contractor appointments
  RET_CONTRACTOR_APP_SUCC,

} from '../actions';

const initialState = {
  user: {},
  contractors: [],
  feedback: [],
  appointments: [],
  services: [],
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
    case LOADING:
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
        appointments: action.payload.appointments,
        loading: false,
        error: null,
      };
    case FAILURE:
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
  

    // fetching single contractor
    case FETCH_SINGLE_CONTRACTOR_SUCCESS:
      return {
        ...state,
        thisContractor: action.payload,
        loading: false,
        error: null,
      };

    // fetching services
    case SET_SERVICES:
      return {
        ...state,
        services: action.payload,
        loading: false,
        error: null,
      };

    // fetching current user written feedback
    case USER_WRITTEN_FEEDBACK_SUCCESS:
      return { ...state, feedback: action.payload }

    // fetching single contractors feedback
    // case FETCH_CONTRACTOR_FEEDBACK_SUCCESS:
    //   return {...state, accounts: { feedback: action.payload }}


    // fetching current contractor appointments
    // case RET_CONTRACTOR_APP_SUCC:
    //   return {...state, accounts:{appointments: action.payload }}

    //fetching appointments for a contractor
    case RET_CONTRACTOR_APP_SUCC:
      return {...state, appointments: action.payload}
    
    default:
      return state;
  }
};
