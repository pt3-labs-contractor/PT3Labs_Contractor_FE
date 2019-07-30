import {
  SEND_SCHED,
  SEND_SCHED_COMP,
  GET_SCHED,
  DEL_SCHED,
  DEL_SCHED_COMP,
  UP_SCHED,
  UP_SCHED_COMP,
  // GET_APP,
  CONFIRMING_APP,
  CONFIRMED_APP,
  GETTING_USER,
  GETTING_USER_SUCC,
  LOGOUTUSER,
  REFS,
  DELETE_APP,
  // fetching users
  LOADING,
  END_LOAD,
  FETCHING_USERS_SUCCESS,
  FAILURE,

  // fetching calander
  SET_DAY,
  SET_MONTH,

  // Window position of specific contractor in list
  SET_CONTRACTOR_POSITION,

  // fetching schedule
  SET_SCHEDULE,
  LOAD_SCHEDULE,
  FAIL_SCHEDULE,
  SET_SORTED_CONTRACTORS,
  SET_SERVICE_SORT,

  // CRUD services
  SEND_SERV,
  SEND_SERV_COMP,
  SET_SERVICES,
  DELETE_SERV_SUCC,

  // fetching single contractor
  FETCH_SINGLE_CONTRACTOR_SUCCESS,

  // fetching feedback by or about user
  FEEDBACK_SUCCESS,

  // fetching single contractor feedback
  // FETCH_CONTRACTOR_FEEDBACK_SUCCESS,

  // Clear temp feedback for initial load
  CLEAR_TEMP_FEEDBACK,

  // POST feedback by user
  POST_FEEDBACK_SUCCESS,

  // DELETE feedback by user
  DELETE_FEEDBACK_SUCCESS,

  // fetching current contractor appointments
  RET_CONTRACTOR_APP_SUCC,

  // fetching user appointments
  APPOINTMENT_SUCCESS,

  // edit the user information
  EDIT_USER_SUCCESS,
  SELECTED,
  SUBSCRIBE_SUCCESS,
  SUBSCRIBE_FAILURE,
  RETRIEVE_SUBSCRIPTION_SUCCESS,
  RETRIEVE_SUBSCRIPTION_FAILURE,
  CANCEL_DEFAULT_SUCCESS,
  CANCEL_DEFAULT_FAILURE,
  CANCEL_IMMEDIATE_SUCCESS,
  CANCEL_IMMEDIATE_FAILURE,
  SET_ERROR,
} from '../actions';

const initialState = {
  user: {},
  contractors: [],
  feedback: [],
  tempFeedback: [],
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
  refs: [],
  positionContractor: {},
  subscription: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // loading all users
    case LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case END_LOAD:
      return { ...state, loading: false };
    case FETCHING_USERS_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        contractors: action.payload.contractors,
        sortedContractors: action.payload.contractors,
        appointments: action.payload.appointments,
        services: action.payload.services,
        loading: false,
        error: null,
      };
    case FAILURE:
      return {
        ...state,
        // user: {},
        contractors: [],
        loading: false,
        error: action.error,
      };

    // calander
    case SET_DAY:
      return { ...state, thisDay: action.payload, tempFeedback: [] };
    case SET_MONTH:
      return { ...state, thisMonth: action.payload };
    case SET_SCHEDULE:
      return {
        ...state,
        schedule: action.payload,
        error: null,
        loading: false,
      };
    case SET_SORTED_CONTRACTORS:
      return {
        ...state,
        sortedContractors: action.payload,
        thisContractor: {},
        schedule: [],
        loading: false,
      };
    case SET_SERVICE_SORT:
      return {
        ...state,
        serviceFilter: action.payload,
        tempFeedback: [],
        loading: false,
      };
    case SET_CONTRACTOR_POSITION:
      return { ...state, positionContractor: action.payload, loading: false };
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
        loading: false,
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

    case DELETE_SERV_SUCC:
      return {
        ...state,
        service: action.payload,
        loading: false,
        error: null,
      };

    // fetching current user written feedback
    case FEEDBACK_SUCCESS:
      return {
        ...state,
        feedback: action.payload.feedback,
        tempFeedback: action.payload.feedback,
        loading: false,
      }; // Look for a possible need for separate temp feedback reducer
    // case TEMP_FEEDBACK_SUCCESS:
    //   return { ...state, tempFeedback: action.payload.feedback };
    case POST_FEEDBACK_SUCCESS:
      return {
        ...state,
        feedback: [...state.feedback, action.payload.feedback],
        loading: false,
      };
    case CLEAR_TEMP_FEEDBACK:
      return { ...state, tempFeedback: [] };

    case DELETE_FEEDBACK_SUCCESS:
      return { ...state, feedback: action.payload.feedback, loading: false };
    // fetching current contractor appointments
    // case RET_CONTRACTOR_APP_SUCC:
    //   return {...state, accounts:{appointments: action.payload }}
    // case CONTRACTOR_APP_FAIL:
    //   return {...state, loading: false, error: action.error}
    case SEND_SERV:
      return {
        ...state,
        loading: true,
      };
    case SEND_SERV_COMP:
      return {
        ...state,
        loading: false,
        services: [...state.services, action.payload],
      };

    case SEND_SCHED:
      return { ...state, loading: true };
    case SEND_SCHED_COMP:
      return {
        ...state,
        loading: false,
        schedule: [...state.schedule, action.payload],
      };
    case GET_SCHED:
      return { ...state, loading: true };
    // case SET_SCHEDULE:
    //   return { ...state, schedule: [action.payload] };
    case DEL_SCHED:
      return { ...state, loading: true };
    case DEL_SCHED_COMP:
      return {
        ...state,
        loading: false,
        schedule: state.schedule.filter(sch => {
          return sch.id !== action.payload;
        }),
      };
    case UP_SCHED:
      return { ...state, loading: true };
    case UP_SCHED_COMP:
      return {
        ...state,
        loading: false,
        schedule: [
          ...state.schedule.filter(s => {
            return s.id !== action.payload.id;
          }),
          action.payload,
        ],
      };
    case CONFIRMING_APP:
      return { ...state, loading: true, error: null };
    case CONFIRMED_APP:
      return {
        ...state,
        appointments: [
          ...state.appointments.filter(a => {
            return a.id !== action.payload.updated.id;
          }),
          action.payload.updated,
        ],
        loading: false,
      };
    case GETTING_USER:
      return { ...state, loading: true };
    case GETTING_USER_SUCC:
      return { ...state, queryUser: [action.payload.user], loading: false };
    case REFS:
      return {
        ...state,
        refs: action.payload,
        loading: false,
      };

    // delete app by user
    case DELETE_APP:
      return {
        ...state,
        appointments: action.payload,
        loading: false,
      };

    // fetching appointments for a contractor
    case RET_CONTRACTOR_APP_SUCC:
      return { ...state, appointments: action.payload, loading: false };

    case APPOINTMENT_SUCCESS:
      return { ...state, appointments: action.payload, loading: false };

    // edit user settigns
    case EDIT_USER_SUCCESS:
      return { ...state, user: action.payload, loading: false };
    case LOGOUTUSER:
      return initialState;
    case SELECTED:
      return { ...state, thisContractor: action.payload };
    case SUBSCRIBE_SUCCESS:
      return {
        ...state,
        user: { ...state.user, subscriptionId: action.payload.subscriptionId },
        error: null,
        loading: false,
      };
    case SUBSCRIBE_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case RETRIEVE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        subscription: action.payload,
        error: null,
        loading: false,
      };
    case RETRIEVE_SUBSCRIPTION_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case CANCEL_DEFAULT_SUCCESS:
      return {
        ...state,
        subscription: { ...state.subscription, cancel_at_period_end: true },
        loading: false,
      };
    case CANCEL_DEFAULT_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case CANCEL_IMMEDIATE_SUCCESS:
      return {
        ...state,
        subscription: null,
        user: { ...state.user, subscriptionId: null },
        error: null,
        loading: false,
      };
    case CANCEL_IMMEDIATE_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
