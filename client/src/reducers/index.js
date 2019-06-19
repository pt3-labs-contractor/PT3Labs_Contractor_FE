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
  LOAD_SCHEDULE,
  FAIL_SCHEDULE,
  SET_SORTED_CONTRACTORS,
  SET_SERVICE_SORT,

  // fetching services
  SET_SERVICES,

  // fetching single contractor
  FETCH_SINGLE_CONTRACTOR_SUCCESS,

  // fetching feedback by or about user
  FEEDBACK_SUCCESS,

  // fetching single contractor feedback
  // FETCH_CONTRACTOR_FEEDBACK_SUCCESS,

  //POST feedback by user
  POST_FEEDBACK_SUCCESS,

  // fetching current contractor appointments
  RET_CONTRACTOR_APP_SUCC,

  // edit the user information
  EDIT_USER_SUCCESS,
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
  sortedContractors: [],
  thisMonth: new Date(),
  thisDay: new Date(),
  schedule: [],
  errorSchedule: null,
  serviceFilter: '',
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
        sortedContractors: action.payload.contractors,
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
    case SET_SORTED_CONTRACTORS:
      return { ...state, sortedContractors: action.payload };
    case SET_SERVICE_SORT:
      return { ...state, serviceFilter: action.payload };
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
    case FEEDBACK_SUCCESS:
      return { ...state, feedback: action.payload.feedback };

    
    case POST_FEEDBACK_SUCCESS: 
      return {...state, feedback: [...state.feedback, action.payload.feedback] }

    // fetching current contractor appointments
    // case RET_CONTRACTOR_APP_SUCC:
    //   return {...state, accounts:{appointments: action.payload }}

    // fetching appointments for a contractor
    case RET_CONTRACTOR_APP_SUCC:
      return { ...state, appointments: action.payload };

    // edit user settigns
    case EDIT_USER_SUCCESS:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};
