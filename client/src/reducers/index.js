import { 

  //fetching users 
  LOADING_USERS, 
  FETCHING_USERS_SUCCESS, 
  FETCHING_USERS_FAILURE, 
  
  //fetching calander
  SET_DAY, SET_MONTH, 

  //fetching single contractor
  SINGLE_CONTRACTOR_LOADING, 
  FETCH_SINGLE_CONTRACTOR_SUCCESS, 
  FETCH_SINGLE_CONTRACTOR_FAIL,

  //fetching current user written feedback
  // USER_WRITTEN_FEEDBACK_LOADING,
  // USER_WRITTEN_FEEDBACK_SUCCESS,
  // USER_WRITTEN_FEEDBACK_FAIL

} from '../actions';



const initialState = {
  accounts: {
    users: [],
    contractors: [],
    feedback: []
  },
  loading: false,
  error: null,
  thisContractor: {}, 
  thisMonth: new Date(),
  thisDay: new Date(),
  schedule: [
    new Date(2019, 4, 5, 4, 0),
    new Date(2019, 4, 5, 6, 0),
    new Date(2019, 4, 19, 12, 0),
    new Date(2019, 4, 20, 3, 0)
  ]
};

export default (state = initialState, action) => {
  switch(action.type) {

    case LOADING_USERS:
      return { ...state, accounts: {users: [], contractors: []}, loading: true, error: null };
    case FETCHING_USERS_SUCCESS:
      return { ...state, accounts: action.payload, loading: false, error: null };
    case FETCHING_USERS_FAILURE:
      return { ...state, accounts: {users: [], contractors: []}, loading: false, error: action.error };

    case SET_DAY:
      return { ...state, thisDay: action.payload }
    case SET_MONTH:
      return { ...state, thisMonth: action.payload }
          
    //fetching single contractor
    case SINGLE_CONTRACTOR_LOADING: 
      return { ...state, loading: true, error: null };
    case FETCH_SINGLE_CONTRACTOR_SUCCESS:
      return { ...state, thisContractor: action.payload }
    case FETCH_SINGLE_CONTRACTOR_FAIL:
          return { ...state, loading: false, error: action.error };

    //fetching current user written feedback
    // case USER_WRITTEN_FEEDBACK_LOADING: 
    //   return { ...state, loading: true, error: null };
    // case USER_WRITTEN_FEEDBACK_SUCCESS:
    //   return { ...state, accounts: action.payload }
    // case USER_WRITTEN_FEEDBACK_FAIL:
    //     return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
}