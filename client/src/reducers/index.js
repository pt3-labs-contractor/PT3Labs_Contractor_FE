import { 
  LOADING, SUCCESS, FAILURE, 
  SELECTED, SET_DAY, SET_MONTH, 

  SINGLE_CONTRACTOR_LOADING, FETCH_SINGLE_CONTRACTOR_SUCCESS, FETCH_SINGLE_CONTRACTOR_FAIL


} from '../actions';



const initialState = {
  accounts: {
    users: [],
    contractors: [],
    singleContractor: []
  },
  loading: false,
  error: null,
  thisContractor: {}, // replaced when get endpoint is added maybe
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
    case LOADING:
      return { ...state, accounts: {users: [], contractors: []}, loading: true, error: null };
    case SUCCESS:
      return { ...state, accounts: action.payload, loading: false, error: null };
    case FAILURE:
      return { ...state, accounts: {users: [], contractors: []}, loading: false, error: action.error };
    case SELECTED: // replaced when get endpoint is added maybe
      return { ...state, thisContractor: action.payload }
    case SET_DAY:
      return { ...state, thisDay: action.payload }
    case SET_MONTH:
      return { ...state, thisMonth: action.payload }

    case SINGLE_CONTRACTOR_LOADING: 
      return { ...state, accounts: {users: [], contractors: []}, loading: true, error: null };
    case FETCH_SINGLE_CONTRACTOR_SUCCESS:
      return { ...state, accounts: {singleContractor: []}, loading: false, error: null}
      case FETCH_SINGLE_CONTRACTOR_FAIL:
          return { ...state, accounts: {users: [], contractors: []}, loading: false, error: action.error };
    default:
      return state;
  }
}