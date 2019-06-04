import axios from 'axios';

export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';
export const SELECTED = 'SELECTED';

// exports for fetching all users
export const LOADING_USERS = 'LOADING';
export const FETCHING_USERS_SUCCESS = 'SUCCESS';
export const FETCHING_USERS_FAILURE = 'FAILURE';

// exports for calander
export const SET_MONTH = 'SET_MONTH';
export const SET_DAY = 'SET_DAY';
export const SET_SCHEDULE = 'SET_SCHEDULE';
export const FAIL_SCHEDULE = 'FAIL_SCHEDULE';

// exports for finding single contractor
export const SINGLE_CONTRACTOR_LOADING = 'SINGLE_CONTRACTOR_LOADING';
export const FETCH_SINGLE_CONTRACTOR_SUCCESS =
  'FETCH_SINGLE_CONTRACTOR_SUCCESS';
export const FETCH_SINGLE_CONTRACTOR_FAIL = 'FETCH_SINGLE_CONTRACTOR_FAIL';

// exports for retreiving feedback written by current user
export const USER_WRITTEN_FEEDBACK_LOADING = 'USER_WRITTEN_FEEDBACK_LOADING';
export const USER_WRITTEN_FEEDBACK_SUCCESS = 'USER_WRITTEN_FEEDBACK_SUCCESS';
export const USER_WRITTEN_FEEDBACK_FAIL = 'USER_WRITTEN_FEEDBACK_FAIL';

// exports for retrieving single contractor feedback
export const CONTRACTOR_FEEDBACK_LOADING = 'CONTRACTOR_FEEDBACK_LOADING';
export const FETCH_CONTRACTOR_FEEDBACK_SUCCESS =
  'FETCH_CONTRACTOR_FEEDBACK_SUCCESS';
export const CONTRACTOR_FEEDBACK_FAIL = 'CONTRACTOR_FEEDBACK_FAIL';

// exports for retrieving current contractor user appointments
export const CONTRACTOR_APP_LOADING = 'CONTRACTOR_APP_LOADING';
export const RET_CONTRACTOR_APP_SUCC = 'RET_CONTRACTOR_APP_SUCC';
export const RET_EDIT_CONTRACTOR_APP_SUCC = 'RET_EDIT_CONTRACTOR_APP_SUCC';
export const SENDING_PUT_REQ = 'SENDING_PUT_REQ';
export const CONTRACTOR_APP_FAIL = 'CONTRACTOR_APP_FAIL';
export const SENDING_DELETE_REQ = 'SENDING_DELETE_REQ';
export const RET_DELETE_APP_SUCC = 'RET_DELETE_APP_SUCC';

// exports for user appointments
export const SENDING_POST_REQ = 'SENDING_POST_REQ';
export const RET_POST_USER_APP_SUCC = 'RET_POST_USER_APP_SUCC';
export const USER_APP_FAIL = 'USER_APP_FAIL';

// ---------------------------------------------------------------

// axios get all accounts
export const fetchAccts = () => dispatch => {
  dispatch({ type: LOADING_USERS });
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
        const accounts = {
          users: userRes.data.users,
          contractors: contRes.data.contractors,
        };
        dispatch({ type: FETCHING_USERS_SUCCESS, payload: accounts });
      })
    )
    .catch(() => {
      dispatch({
        type: FETCHING_USERS_FAILURE,
        error: 'Something went wrong.',
      });
    });
};

export const fetchSchedule = id => dispatch => {
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
      dispatch({ type: FAIL_SCHEDULE, error: 'Somethig went wrong' });
    });
};

// axios get single contractor
export const selectSingleContractorSetting = id => dispatch => {
  dispatch({ type: SINGLE_CONTRACTOR_LOADING });
  const headers = setHeaders();

  axios
    .get(`https://fierce-plains-47590.herokuapp.com/api/contractors/${id}`, {
      headers,
    })
    .then(res => {
      dispatch({ type: FETCH_SINGLE_CONTRACTOR_SUCCESS, payload: res.data });
    })
    .catch(err =>
      dispatch({ type: FETCH_SINGLE_CONTRACTOR_FAIL, payload: err })
    );
};

// axios get feedback written by the current user
export const getUserWrittenFeedback = id => dispatch => {
  dispatch({ type: USER_WRITTEN_FEEDBACK_LOADING });

  axios
    .get('')
    .then(res => {
      dispatch({ type: USER_WRITTEN_FEEDBACK_SUCCESS, payload: res.data });
    })
    .catch(err => dispatch({ type: USER_WRITTEN_FEEDBACK_FAIL, payload: err }));
};

// axios get feedback targeting a contractor
export const getContractorFeedback = id => dispatch => {
  dispatch({ type: CONTRACTOR_FEEDBACK_LOADING });

  axios
    .get('')
    .then(res => {
      dispatch({ type: FETCH_CONTRACTOR_FEEDBACK_SUCCESS, payload: res.data });
    })
    .catch(err => dispatch({ type: CONTRACTOR_FEEDBACK_FAIL, payload: err }));
};

// axios post feedback about a contractor
// export const postFeedback = event => dispatch => {
//   axios
//     .post('', event)
//     .then(res => {
//       dispatch({ type: POST_FEEDBACK_SUCCESS, payload: res.data });
//     })
//     .catch(err => dispatch({ type: POST_FEEDBACK_FAIL, payload: err }));
// };

// axios get appointments when current user is contractor
export const seeMyAppointments = id => {
  return dispatch => {
    dispatch({ type: CONTRACTOR_APP_LOADING });
    axios
      .get(`http://www.localhost:5000/api/appointments/contractor/${id}`)
      .then(res => {
        const newAppointments = res.data.appointments.map(a => {
          const start = new Date(a.appointment_datetime);
          const end = new Date(a.appointment_datetime_end);
          const calendarId = '0';
          const title = 'Testing';
          const dueDateClass = '';
          const category = 'time';
          const borderColor = '#9e5fff';
          const bgColor = '#9e5fff';
          const color = '#000';
          const isReadOnly = false;
          return {
            ...a,
            start,
            end,
            calendarId,
            title,
            dueDateClass,
            category,
            borderColor,
            bgColor,
            color,
            isReadOnly,
          };
        });
        dispatch({
          type: RET_CONTRACTOR_APP_SUCC,
          payload: newAppointments,
        });
      })
      .catch(err => {
        dispatch({ type: CONTRACTOR_APP_FAIL, payload: err });
      });
  };
};

export const editMyAppointments = (id, editedApp) => {
  return dispatch => {
    dispatch({ type: SENDING_PUT_REQ });
    axios
      .put(`http://localhost:5000/api/appointments/${id}`, editedApp)
      .then(res => {
        console.log(res.data);
        dispatch({ type: RET_EDIT_CONTRACTOR_APP_SUCC, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: CONTRACTOR_APP_FAIL, payload: err });
      });
  };
};

export const createNewAppointment = appoint => {
  return dispatch => {
    dispatch({ type: SENDING_POST_REQ });
    axios
      .post('http://localhost:5000/api/appointments', appoint)
      .then(res => {
        dispatch({ type: RET_POST_USER_APP_SUCC, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: USER_APP_FAIL, payload: err });
      });
  };
};

export const deleteAppointment = id => {
  const theId = id;
  console.log(id);
  return dispatch => {
    dispatch({ type: SENDING_DELETE_REQ });
    axios
      .delete(`http://localhost:5000/api/appointments/${id}`)
      .then(res => {
        console.log('test');
        dispatch({ type: RET_DELETE_APP_SUCC, payload: theId });
      })
      .catch(err => {
        dispatch({ type: CONTRACTOR_APP_FAIL, payload: err });
      });
  };
};

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

export const selectContractor = (id, list) => dispatch => {
  const selected = list.filter(item => item.id === id);
  dispatch({ type: SELECTED, payload: selected[0] });
};
