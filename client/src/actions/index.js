import axios from 'axios';

// exports for fetching all users
export const LOADING = 'LOADING';
export const FETCHING_USERS_SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

// exports for calander
export const SET_MONTH = 'SET_MONTH';
export const SET_DAY = 'SET_DAY';
export const SET_SCHEDULE = 'SET_SCHEDULE';

// export for services
export const SET_SERVICES = 'SET_SERVICES';

// exports for finding single contractor
export const FETCH_SINGLE_CONTRACTOR_SUCCESS =
  'FETCH_SINGLE_CONTRACTOR_SUCCESS';

// exports for retreiving feedback written by current user
export const USER_WRITTEN_FEEDBACK_SUCCESS = 'USER_WRITTEN_FEEDBACK_SUCCESS';

// exports for retrieving single contractor feedback
export const FETCH_CONTRACTOR_FEEDBACK_SUCCESS =
  'FETCH_CONTRACTOR_FEEDBACK_SUCCESS';

// exports for retrieving current contractor user appointments
export const RET_CONTRACTOR_APP_SUCC = 'RET_CONTRACTOR_APP_SUCC';

// ---------------------------------------------------------------

// axios get all accounts
export const fetchAccts = () => dispatch => {
  dispatch({ type: LOADING });
  const headers = setHeaders();

  axios
    .all([
      axios.get('https://fierce-plains-47590.herokuapp.com/api/users', {
        headers,
      }),
      axios.get('https://fierce-plains-47590.herokuapp.com/api/contractors', {
        headers,
      }),
    ])
    .then(
      axios.spread((userRes, contRes) => {
        let { user } = userRes.data;
        // console.log('user: ', user);
        if (user.contractorId) {
          axios
            .get(
              `https://fierce-plains-47590.herokuapp.com/api/contractors/${
                user.contractorId
              }`,
              { headers }
            )
            .then(res => {
              user = Object.assign(user, res.data.contractor[0]);
            });
        }
        dispatch({
          type: FETCHING_USERS_SUCCESS,
          payload: { user, contractors: contRes.data.contractors },
        });
      })
    )
    .catch(() => {
      dispatch({
        type: FAILURE,
        error: 'Something went wrong.',
      });
    });
};

export const fetchSchedule = id => dispatch => {
  dispatch({ type: LOADING });
  const headers = setHeaders();
  axios
    .get(
      `https://fierce-plains-47590.herokuapp.com/api/schedules/contractor/${id}`,
      { headers }
    )
    .then(res => {
      dispatch({ type: SET_SCHEDULE, payload: res.data.schedule });
    })
    .catch(() => {
      dispatch({ type: FAILURE, error: 'Something went wrong' });
    });
};

export const fetchServices = id => dispatch => {
  dispatch({ type: LOADING });
  const headers = setHeaders();

  axios
    .get(
      `https://fierce-plains-47590.herokuapp.com/api/services/contractor/${id}`,
      { headers }
    )
    .then(res => {
      dispatch({ type: SET_SERVICES, payload: res.data.services });
    })
    .catch(() => {
      dispatch({ type: FAILURE, error: 'Something went wrong.' });
    });
};

// axios get single contractor
export const selectSingleContractorSetting = id => dispatch => {
  dispatch({ type: LOADING });
  const headers = setHeaders();

  axios
    .get(`https://fierce-plains-47590.herokuapp.com/api/contractors/${id}`, {
      headers,
    })
    .then(res => {
      dispatch({
        type: FETCH_SINGLE_CONTRACTOR_SUCCESS,
        payload: res.data.contractor[0],
      });
    })
    .catch(err =>
      dispatch({ type: FAILURE, payload: err })
    );
};

// axios get feedback written by the current user
export const getUserWrittenFeedback = id => dispatch => {
  dispatch({ type: LOADING });
  const headers = setHeaders();

  axios
    .get('',headers)
    .then(res => {
      dispatch({ type: USER_WRITTEN_FEEDBACK_SUCCESS, payload: res.data });
    })
    .catch(err => dispatch({ type: FAILURE, payload: err }));
};

// axios get feedback targeting a contractor
export const getContractorFeedback = id => dispatch => {
  dispatch({ type: LOADING });
  const headers = setHeaders();

  axios
    .get('',headers)
    .then(res => {
      dispatch({ type: FETCH_CONTRACTOR_FEEDBACK_SUCCESS, payload: res.data });
    })
    .catch(err => dispatch({ type: FAILURE, payload: err }));
};

// axios post feedback about a contractor
// export const postFeedback = event => dispatch => {
  // const headers = setHeaders();
//   axios.post('',headers, event)
//   .then(res => {
//     dispatch({ type: POST_FEEDBACK_SUCCESS, payload: res.data});
//   })
//   .catch(err => dispatch({type: FAILURE, payload: err}))
// }

// axios get appointments when current user is contractor
// export const seeMyAppointments = (id) = dispatch => {
//   dispatch({ type: CONTRACTOR_APP_LOADING })
// const headers = setHeaders();

//   axios.get('',headers)
//   .then( res => {
//     dispatch({ type: RET_CONTRACTOR_APP_SUCC, payload: res.data })
//   })
//   .catch(err => dispatch({ type: FAILURE, payload:err }))
// }

export const setDay = day => dispatch => {
  dispatch({ type: SET_DAY, payload: day });
};

export const setMonth = day => dispatch => {
  dispatch({ type: SET_MONTH, payload: day });
};

function setHeaders() {
  const bearer = `Bearer ${localStorage.getItem('jwt')}`;
  const headers = { authorization: bearer };
  return headers;
}

// export const selectContractor = (id, list) => dispatch => {
//   const selected = list.filter(item => item.id === id);
//   dispatch({ type: SELECTED, payload: selected[0]})
// }
