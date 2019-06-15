import axios from 'axios';
import dateFns from 'date-fns';
import store from '../index';

// exports for fetching all users
export const LOADING = 'LOADING';
export const FETCHING_USERS_SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

// exports for calander
export const SET_MONTH = 'SET_MONTH';
export const SET_DAY = 'SET_DAY';
export const SET_SCHEDULE = 'SET_SCHEDULE';

export const SET_SORTED_CONTRACTORS = 'SET_SORTED_CONTRACTORS';
export const SET_SERVICE_SORT = 'SET_SERVICE_SORT';

// export for services
export const SET_SERVICES = 'SET_SERVICES';

// exports for finding single contractor
export const FETCH_SINGLE_CONTRACTOR_SUCCESS =
  'FETCH_SINGLE_CONTRACTOR_SUCCESS';

// exports for retreiving feedback written by current user
export const FEEDBACK_SUCCESS = 'FEEDBACK_SUCCESS';

// exports for retrieving single contractor feedback
export const FETCH_CONTRACTOR_FEEDBACK_SUCCESS =
  'FETCH_CONTRACTOR_FEEDBACK_SUCCESS';

// exports for retrieving current contractor user appointments
export const RET_CONTRACTOR_APP_SUCC = 'RET_CONTRACTOR_APP_SUCC';

// export PUT request for users settings
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';

//
export const FAIL_SCHEDULE = 'FAIL_SCHEDULE';
export const LOAD_SCHEDULE = 'LOAD_SCHEDULE';
// ---------------------------------------------------------------

// axios get all accounts
export const fetchAccts = () => dispatch => {
  // dispatch({ type: LOADING_USERS });
  const headers = setHeaders();

  axios
    .all([
      axios.get('https://fierce-plains-47590.herokuapp.com/api/users', {
        headers,
      }),
      axios.get('https://fierce-plains-47590.herokuapp.com/api/contractors', {
        headers,
      }),
      axios.get('https://fierce-plains-47590.herokuapp.com/api/appointments', {
        headers,
      }),
    ])
    .then(
      axios.spread((userRes, contRes, apmtRes) => {
        let { user } = userRes.data;
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

        const { appointments } = apmtRes.data;
        appointments.sort((a, b) => {
          return new Date(a.startTime) - new Date(b.startTime);
        });
        dispatch({
          type: FETCHING_USERS_SUCCESS,
          payload: {
            user,
            contractors: contRes.data.contractors,
            appointments,
          },
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

export const fetchAvailabilityByDay = date => dispatch => {
  // dispatch({ type: LOADING });
  const headers = setHeaders();
  const state = store.getState();

  axios
    .get(
      `https://fierce-plains-47590.herokuapp.com/api/schedules/date/${date}`,
      { headers }
    )
    .then(res => {
      const contractors = serviceSort(state.serviceFilter, state.contractors);
      const filter = res.data.appointments
        .filter(item =>
          dateFns.isSameDay(dateFns.addDays(new Date(date), 1), item.startTime)
        )
        .map(item => item.contractorId);
      const list = contractors.filter(contractor =>
        filter.includes(contractor.id)
      );
      dispatch({ type: SET_SORTED_CONTRACTORS, payload: list });
    })
    .catch(() => {
      // dispatch({ type: ERROR, error: 'Something went wrong.' });
    });
};

export const sortContractorsByService = query => dispatch => {
  const state = store.getState();
  const list = state.contractors.filter(contractor => {
    return contractor.services.some(service => service.name.includes(query));
  });
  dispatch({ type: SET_SORTED_CONTRACTORS, payload: list });
};

export const storeServiceName = service => dispatch => {
  dispatch({ type: SET_SERVICE_SORT, payload: service });
};

// axios get single contractor
export const selectSingleContractorSetting = id => dispatch => {
  dispatch({ type: LOADING });
  const headers = setHeaders();

  axios
    .get(`https://fierce-plains-47590.herokuapp.com/api/users/${id}`, {
      headers,
    })
    .then(res => {
      dispatch({
        type: FETCH_SINGLE_CONTRACTOR_SUCCESS,
        payload: res.data.contractor,
      });
    })
    .catch(err => dispatch({ type: FAILURE, payload: err }));
};

// axios get feedback
export const getFeedback = () => dispatch => {
  dispatch({ type: LOADING });
  const headers = setHeaders();

  axios
    .get(`https://fierce-plains-47590.herokuapp.com/api/feedback`, { headers })

    .then(res => {
      dispatch({ type: FEEDBACK_SUCCESS, payload: res.data });
      console.log(res);
    })
    .catch(err => dispatch({ type: FAILURE, payload: err }));
};

// axios get feedback targeting a contractor
// export const getContractorFeedback = id => dispatch => {
//   dispatch({ type: LOADING });
//   const headers = setHeaders();

//   axios
//     .get(`https://fierce-plains-47590.herokuapp.com/api/feedback/${id}`,{headers})
//     .then(res => {
//       dispatch({ type: FETCH_CONTRACTOR_FEEDBACK_SUCCESS, payload: res.data });
//     })
//     .catch(err => dispatch({ type: FAILURE, payload: err }));
// };

// axios put request to update users settings
export const editUserSettings = data => dispatch => {
  dispatch({ type: LOADING });
  const headers = setHeaders();

  axios
    .put('https://fierce-plains-47590.herokuapp.com/api/users', data, {
      headers,
    })
    .then(res => {
      dispatch({ type: EDIT_USER_SUCCESS, payload: res.data });
    })
    .catch(err => dispatch({ type: FAILURE, payload: err }));
};

// axios post feedback about a contractor
// export const postFeedback = event => dispatch => {
//   const headers = setHeaders();
//   axios.post(`https://fierce-plains-47590.herokuapp.com/api/feedback/${id}`,headers, event)
//   .then(res => {
//     dispatch({ type: POST_FEEDBACK_SUCCESS, payload: res.data});
//   })
//   .catch(err => dispatch({type: FAILURE, payload: err}))
// }

// axios get appointments when current user is contractor
// export const seeMyAppointments = (id) = dispatch => {
//   dispatch({ type: LOADING })
//   const headers = setHeaders();

//   axios.get(`https://fierce-plains-47590.herokuapp.com/api/appointments/${id}`,headers)
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

function serviceSort(query, state) {
  const list = state.filter(contractor => {
    return contractor.services.some(service => service.name.includes(query));
  });
  return list;
}

// export const selectContractor = (id, list) => dispatch => {
//   const selected = list.filter(item => item.id === id);
//   dispatch({ type: SELECTED, payload: selected[0]})
// }
