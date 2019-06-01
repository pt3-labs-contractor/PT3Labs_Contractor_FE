import axios from 'axios';

//exports for fetching all users
export const LOADING_USERS = 'LOADING';
export const FETCHING_USERS_SUCCESS = 'SUCCESS';
export const FETCHING_USERS_FAILURE = 'FAILURE'; 

//exports for calander
export const SET_MONTH = 'SET_MONTH';
export const SET_DAY = 'SET_DAY';

//exports for finding single contractor
export const SINGLE_CONTRACTOR_LOADING = 'SINGLE_CONTRACTOR_LOADING'
export const FETCH_SINGLE_CONTRACTOR_SUCCESS = 'FETCH_SINGLE_CONTRACTOR_SUCCESS'
export const FETCH_SINGLE_CONTRACTOR_FAIL = 'FETCH_SINGLE_CONTRACTOR_FAIL'

//exports for retreiving feedback written by current user
export const USER_WRITTEN_FEEDBACK_LOADING = 'USER_WRITTEN_FEEDBACK_LOADING'
export const USER_WRITTEN_FEEDBACK_SUCCESS = 'USER_WRITTEN_FEEDBACK_SUCCESS'
export const USER_WRITTEN_FEEDBACK_FAIL = 'USER_WRITTEN_FEEDBACK_FAIL'

//exports for retrieving single contractor feedback
export const CONTRACTOR_FEEDBACK_LOADING = 'CONTRACTOR_FEEDBACK_LOADING'
export const FETCH_CONTRACTOR_FEEDBACK_SUCCESS = 'FETCH_CONTRACTOR_FEEDBACK_SUCCESS'
export const CONTRACTOR_FEEDBACK_FAIL = 'CONTRACTOR_FEEDBACK_FAIL'

//exports for retrieving current contractor user appointments
export const CONTRACTOR_APP_LOADING  = 'CONTRACTOR_APP_LOADING'
export const RET_CONTRACTOR_APP_SUCC = 'RET_CONTRACTOR_APP_SUCC'
export const CONTRACTOR_APP_FAIL = 'CONTRACTOR_APP_FAIL'


// ---------------------------------------------------------------

//axios get all accounts
export const fetchAccts = () => dispatch => {
  dispatch({ type: LOADING_USERS });
  const bearer = 'Bearer ' + localStorage.getItem('jwt');
  console.log(bearer)
  const headers = { authorization: bearer }

  axios.all([
    axios.get('https://fierce-plains-47590.herokuapp.com/api/users', { headers }),
    axios.get('https://fierce-plains-47590.herokuapp.com/api/contractors', { headers })
  ])
    .then(axios.spread((userRes, contRes) => {
      const accounts = {
        users: userRes.data.users,
        contractors: contRes.data.contractors
      };
      dispatch({ type: FETCHING_USERS_SUCCESS, payload: accounts });
    }))
    .catch(() => {
      dispatch({ type: FETCHING_USERS_FAILURE, error: "Something went wrong."});
    });
}

//axios get single contractor
export const selectSingleContractorSetting = (id) => dispatch => {
  dispatch({ type: SINGLE_CONTRACTOR_LOADING })
  
  axios.get(`https://fierce-plains-47590.herokuapp.com/api/contractors/${id}`)
  .then( res => {
    dispatch({ type: FETCH_SINGLE_CONTRACTOR_SUCCESS, payload: res.data})
  })
  .catch(err => dispatch({ type: FETCH_SINGLE_CONTRACTOR_FAIL, payload: err}))
}

// axios get feedback written by the current user
export const getUserWrittenFeedback = (id) => dispatch => {
  dispatch({ type: USER_WRITTEN_FEEDBACK_LOADING })

  axios.get('')
  .then( res=> {
    dispatch({ type: USER_WRITTEN_FEEDBACK_SUCCESS, payload: res.data })
  })
  .catch(err => dispatch({ type: USER_WRITTEN_FEEDBACK_FAIL, payload: err}))
}


//axios get feedback targeting a contractor
export const getContractorFeedback = (id) => dispatch => {
  dispatch({ type: CONTRACTOR_FEEDBACK_LOADING })

  axios.get('')
  .then( res => {
    dispatch({ type: FETCH_CONTRACTOR_FEEDBACK_SUCCESS, payload: res.data })
  })
  .catch(err => dispatch({ type: CONTRACTOR_FEEDBACK_FAIL, payload: err}))
}

//axios post feedback about a contractor
export const postFeedback = event => dispatch => {
  axios.post('', event)
  .then(res => {
    dispatch({ type: POST_FEEDBACK_SUCCESS, payload: res.data});
  })
  .catch(err => dispatch({type: POST_FEEDBACK_FAIL, payload: err}))
}

//axios get appointments when current user is contractor
export const seeMyAppointments = (id) = dispatch => {
  dispatch({ type: CONTRACTOR_APP_LOADING })

  axios.get('')
  .then( res => {
    dispatch({ type: RET_CONTRACTOR_APP_SUCC, payload: res.data })
  })
  .catch(err => dispatch({ type: CONTRACTOR_APP_FAIL, payload:err }))
}

export const setDay = day => dispatch => {
  dispatch({ type: SET_DAY, payload: day })
}

export const setMonth = day => dispatch => {
  dispatch({ type: SET_MONTH, payload: day })
}


// export const selectContractor = (id, list) => dispatch => {
//   const selected = list.filter(item => item.id === id);
//   dispatch({ type: SELECTED, payload: selected[0]})
// }