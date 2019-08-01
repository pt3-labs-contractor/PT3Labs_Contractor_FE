import axios from 'axios';
import dateFns from 'date-fns';

export const SEND_SERV = 'SEND_SERV';
export const SEND_SERV_COMP = 'SEND_SERV_COMP';
export const DELETE_SERV_SUCC = 'DELETE_SERV_SUCC';

export const SEND_SCHED = 'SEND_SCHED';
export const SEND_SCHED_COMP = 'SEND_SCHED_COMP';
export const GET_SCHED = 'GET_SCHED';
export const DEL_SCHED = 'DEL_SCHED';
export const DEL_SCHED_COMP = 'DEL_SCHED_COMP';
export const UP_SCHED = 'UP_SCHED';
export const UP_SCHED_COMP = 'UP_SCHED_COMP';
export const GET_APP = 'GET_APP';
export const CONFIRMING_APP = 'CONFIRMING_APP';
export const CONFIRMED_APP = 'CONFIRMED_APP';
export const DELETE_APP = 'DELETE_APP';
export const GETTING_USER_SUCC = 'GETTING_USER_SUCC';
export const GETTING_USER = 'GETTING_USER';
export const REFS = 'REFS';
export const LOGOUTUSER = 'LOGOUTUSER';

// exports for fetching all users
export const LOADING = 'LOADING';
export const END_LOAD = 'END_LOAD';
export const FETCHING_USERS_SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

// exports for calander
export const SET_MONTH = 'SET_MONTH';
export const SET_DAY = 'SET_DAY';
export const SET_SCHEDULE = 'SET_SCHEDULE';

export const SET_SORTED_CONTRACTORS = 'SET_SORTED_CONTRACTORS';
export const SET_SERVICE_SORT = 'SET_SERVICE_SORT';

export const SET_CONTRACTOR_POSITION = 'SET_CONTRACTOR_POSITION';

// export for services
export const SET_SERVICES = 'SET_SERVICES';

// exports for finding single contractor
export const FETCH_SINGLE_CONTRACTOR_SUCCESS =
  'FETCH_SINGLE_CONTRACTOR_SUCCESS';

// exports for  feedback
export const FEEDBACK_SUCCESS = 'FEEDBACK_SUCCESS';
export const FETCH_CONTRACTOR_FEEDBACK_SUCCESS =
  'FETCH_CONTRACTOR_FEEDBACK_SUCCESS';
export const CLEAR_TEMP_FEEDBACK = 'CLEAR_TEMP_FEEDBACK';
export const POST_FEEDBACK_SUCCESS = 'POST_FEEDBACK_SUCCESS';
export const DELETE_FEEDBACK_SUCCESS = 'DELETE_FEEDBACK_SUCCESS';

// exports for retrieving current contractor user appointments
export const RET_CONTRACTOR_APP_SUCC = 'RET_CONTRACTOR_APP_SUCC'; // possible removal

// export PUT request for users settings
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';

export const APPOINTMENT_SUCCESS = 'APPOINTMENT_SUCCES';

//
export const FAIL_SCHEDULE = 'FAIL_SCHEDULE';
export const LOAD_SCHEDULE = 'LOAD_SCHEDULE';
export const SELECTED = 'SELECTED';

export const SUBSCRIBE_SUCCESS = 'SUBSCRIBE_SUCCESS';
export const SUBSCRIBE_FAILURE = 'SUBSCRIBE_FAILURE';

export const RETRIEVE_SUBSCRIPTION_SUCCESS = 'RETRIEVE_SUBSCRIPTION_SUCCESS';
export const RETRIEVE_SUBSCRIPTION_FAILURE = 'RETRIEVE_SUBSCRIPTION_FAILURE';

export const CANCEL_DEFAULT_SUCCESS = 'CANCEL_DEFAULT_SUCCESS';
export const CANCEL_DEFAULT_FAILURE = 'CANCEL_DEFAULT_FAILURE';
export const CANCEL_IMMEDIATE_SUCCESS = 'CANCEL_IMMEDIATE_SUCCESS';
export const CANCEL_IMMEDIATE_FAILURE = 'CANCEL_IMMEDIATE_FAILURE';

export const SET_ERROR = 'SET_ERROR';
// ---------------------------------------------------------------

function setHeaders() {
  const bearer = `Bearer ${localStorage.getItem('jwt')}`;
  const headers = { authorization: bearer };
  return headers;
}

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
      axios.get('https://fierce-plains-47590.herokuapp.com/api/appointments', {
        headers,
      }),
    ])
    .then(
      axios.spread((userRes, contRes, apmtRes) => {
        // console.log(apmtRes);
        let { user } = userRes.data;
        const { appointments } = apmtRes.data;
        console.log(appointments);
        appointments.sort((a, b) => {
          return new Date(a.startTime) - new Date(b.startTime);
        });
        if (user.contractorId) {
          axios
            .get(
              `https://fierce-plains-47590.herokuapp.com/api/contractors/${
                user.contractorId
              }`,
              {
                headers,
              }
            )
            .then(res => {
              user = { ...res.data.contractor, ...user };
              dispatch({
                type: FETCHING_USERS_SUCCESS,
                payload: {
                  user,
                  contractors: contRes.data.contractors,
                  appointments,
                  services: res.data.contractor.services,
                },
              });
            });
        } else {
          dispatch({
            type: FETCHING_USERS_SUCCESS,
            payload: {
              user,
              contractors: contRes.data.contractors,
              appointments,
            },
          });
        }
      })
    )
    .catch(e => {
      dispatch({
        type: FAILURE,
        error: 'Something went wrong.',
      });
    });
};

export const fetchSchedule = id => dispatch => {
  // dispatch({ type: LOADING });
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

function serviceSort(query, state) {
  const list = state.filter(contractor => {
    return contractor.services.some(service => service.name.includes(query));
  });
  return list;
}

export const fetchAvailabilityByDay = (
  date,
  serviceFilter,
  contractors
) => dispatch => {
  // dispatch({ type: LOADING });
  const headers = setHeaders();
  axios
    .get(
      `https://fierce-plains-47590.herokuapp.com/api/schedules/date/${date}`,
      { headers }
    )
    .then(res => {
      const sortedContractors = serviceSort(serviceFilter, contractors);
      const filter = res.data.appointments
        .filter(item =>
          dateFns.isSameDay(dateFns.addDays(new Date(date), 1), item.startTime)
        )
        .map(item => item.contractorId);
      const list = sortedContractors.filter(contractor =>
        filter.includes(contractor.id)
      );
      dispatch({ type: SET_SORTED_CONTRACTORS, payload: list });
    })
    .catch(() => {
      // dispatch({ type: ERROR, error: 'Something went wrong.' });
    });
};

export const sortContractorsByService = query => dispatch => {
  const state = {};
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
    .get(`https://fierce-plains-47590.herokuapp.com/api/contractors/${id}`, {
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

export const resetFailure = () => dispatch => {
  dispatch({ type: FAILURE, error: null });
};

export const setFailure = fail => dispatch => {
  dispatch({ type: FAILURE, error: fail });
};

// axios get feedback
export const getFeedback = () => dispatch => {
  // dispatch({ type: LOADING });
  const headers = setHeaders();

  axios
    .get(`https://fierce-plains-47590.herokuapp.com/api/feedback`, { headers })

    .then(res => {
      endManualLoad();
      dispatch({ type: FEEDBACK_SUCCESS, payload: res.data });
      // console.log(res);
    })
    .catch(err => dispatch({ type: FAILURE, payload: err }));
};

export const getFeedbackByContractor = id => dispatch => {
  const headers = setHeaders();

  axios
    .get(`https://fierce-plains-47590.herokuapp.com/api/feedback/${id}`, {
      headers,
    })
    .then(res => {
      dispatch({ type: FEEDBACK_SUCCESS, payload: res.data });
    })
    .catch(err => dispatch({ type: FAILURE, payload: err }));
};

// axios post feedback about a contractor
export const postFeedback = data => dispatch => {
  dispatch({ type: LOADING });
  const headers = setHeaders();
  // console.log(data)
  axios
    .post(
      `https://fierce-plains-47590.herokuapp.com/api/feedback/${
        data.contractorId
      }`,
      data,
      {
        headers,
      }
    )
    .then(res => {
      // console.log(res)
      dispatch({ type: POST_FEEDBACK_SUCCESS, payload: res.data });
    })
    .catch(err => dispatch({ type: FAILURE, payload: err }));
};

// axios delete feedback about a contractor
export const deleteFeedback = (id, list) => dispatch => {
  dispatch({ type: LOADING });
  const headers = setHeaders();

  axios
    .delete(`https://fierce-plains-47590.herokuapp.com/api/feedback/${id}`, {
      headers,
    })
    .then(() => {
      console.log('From action.js', list);
      const newFeedback = list.filter(item => item.id !== id);
      dispatch({ type: DELETE_FEEDBACK_SUCCESS, payload: newFeedback });
    })
    .catch(err => dispatch({ type: FAILURE, payload: err }));
};

// axios put request to update users settings
export const editUserSettings = data => dispatch => {
  dispatch({ type: LOADING });
  const headers = setHeaders();

  axios
    .put('https://fierce-plains-47590.herokuapp.com/api/users', data, {
      headers,
    })
    .then(res => {
      dispatch({ type: EDIT_USER_SUCCESS, payload: res.data.user });
    })
    .catch(err => dispatch({ type: FAILURE, payload: err }));
};

// axios get appointments when current user is contractor
export const seeMyAppointments = () => dispatch => {
  dispatch({ type: LOADING });
  const headers = setHeaders();
  axios
    .get(`https://fierce-plains-47590.herokuapp.com/api/appointments`, {
      headers,
    })
    .then(res => {
      dispatch({
        type: RET_CONTRACTOR_APP_SUCC,
        payload: res.data.appointments,
      });
    })
    .catch(err => dispatch({ type: FAILURE, payload: err }));
};

// axios request for services
export const postNewService = serv => {
  return dispatch => {
    dispatch({ type: SEND_SERV });
    const headers = setHeaders();
    axios
      .post('https://fierce-plains-47590.herokuapp.com/api/services', serv, {
        headers,
      })
      .then(res => {
        console.log(res.data);
        dispatch({ type: SEND_SERV_COMP, payload: res.data.created });
      })
      .catch(err => {
        dispatch({ type: FAILURE, error: 'Failed to add Service.' });
      });
  };
};

export const deleteService = (service, list) => dispatch => {
  dispatch({ type: LOADING });
  const headers = setHeaders();

  axios
    .delete(
      `https://fierce-plains-47590.herokuapp.com/api/services/${service.id}`,
      { headers }
    )
    .then(res => {
      const newList = list.filter(serv => serv.id !== res.data.deleted.id);
      dispatch({ type: DELETE_SERV_SUCC, payload: newList });
    })
    .catch(err => {
      dispatch({ type: FAILURE, payload: err });
    });
};

export const postNewSchedule = sched => {
  const headers = setHeaders();
  return dispatch => {
    dispatch({ type: SEND_SCHED });
    axios
      .post('https://fierce-plains-47590.herokuapp.com/api/schedules', sched, {
        headers,
      })
      .then(res => {
        console.log(res.data);
        dispatch({ type: SEND_SCHED_COMP, payload: res.data });
      })
      .catch(err => {
        console.log(err.response.data.error);
        dispatch({
          type: FAILURE,
          error: err.response.data.error,
        });
      });
  };
};

export const getSchedules = id => {
  const headers = setHeaders();
  return dispatch => {
    dispatch({ type: GET_SCHED });
    axios
      .get(
        `https://fierce-plains-47590.herokuapp.com/api/schedules/contractor/${id}`,
        {
          headers,
        }
      )
      .then(res => {
        const scheds = res.data.schedule;
        scheds.sort((a, b) => {
          return new Date(a.startTime) - new Date(b.startTime);
        });
        dispatch({ type: SET_SCHEDULE, payload: res.data.schedule });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const deleteSchedule = id => {
  const headers = setHeaders();
  return dispatch => {
    dispatch({ type: DEL_SCHED });
    axios
      .delete(`https://fierce-plains-47590.herokuapp.com/api/schedules/${id}`, {
        headers,
      })
      .then(() => {
        dispatch({ type: DEL_SCHED_COMP, payload: id });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const updateSchedule = (id, obj) => {
  const headers = setHeaders();
  console.log(id, obj);
  return dispatch => {
    dispatch({ type: UP_SCHED });
    axios
      .put(
        `https://fierce-plains-47590.herokuapp.com/api/schedules/${id}`,
        obj,
        {
          headers,
        }
      )
      .then(res => {
        dispatch({ type: UP_SCHED_COMP, payload: res.data });
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response);
      });
  };
};

export const postAppointment = app => dispatch => {
  const headers = setHeaders();

  axios
    .post('https://fierce-plains-47590.herokuapp.com/api/appointments', app, {
      headers,
    })
    .then(() => {
      console.log('Created!');
      axios
        .get('https://fierce-plains-47590.herokuapp.com/api/appointments', {
          headers,
        })
        .then(res => {
          dispatch({
            type: APPOINTMENT_SUCCESS,
            payload: res.data.appointments,
          });
        });
    })
    .catch(err => {
      dispatch({ type: FAILURE, payload: err });
    });
};

export const confirmApp = (id, obj) => {
  const headers = setHeaders();
  return dispatch => {
    dispatch({ type: CONFIRMING_APP });
    axios
      .put(
        `https://fierce-plains-47590.herokuapp.com/api/appointments/${id}`,
        obj,
        { headers }
      )
      .then(res => {
        dispatch({ type: CONFIRMED_APP, payload: res.data });
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// user delete app
export const deleteApp = (obj, id) => {
  const headers = setHeaders();
  return dispatch => {
    axios
      .delete(
        `https://fierce-plains-47590.herokuapp.com/api/appointments/${id}`,
        { headers }
      )
      .then(res => {
        // console.log(obj)
        const deletedAppVar = obj.filter(a => {
          return a.id !== id;
        });
        console.log(deletedAppVar);
        dispatch({ type: DELETE_APP, payload: deletedAppVar });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const getUser = id => {
  const headers = setHeaders();
  return dispatch => {
    dispatch({ type: GETTING_USER });
    axios
      .get(` https://fierce-plains-47590.herokuapp.com/api/users/${id}`, {
        headers,
      })
      .then(res => {
        dispatch({ type: GETTING_USER_SUCC, payload: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const logoutUser = () => {
  return dispatch => {
    dispatch({ type: LOGOUTUSER });
  };
};

export const setRefs = rfs => {
  return dispatch => {
    dispatch({ type: REFS, payload: rfs });
  };
};

export const setDay = day => dispatch => {
  dispatch({ type: SET_DAY, payload: day });
};

export const setMonth = day => dispatch => {
  dispatch({ type: SET_MONTH, payload: day });
};

export const setPosition = element => dispatch => {
  dispatch({ type: SET_CONTRACTOR_POSITION, payload: element });
};

export const selectContractor = (id, list) => dispatch => {
  const selected = list.filter(item => item.id === id);
  dispatch({ type: SELECTED, payload: selected[0] });
};
export const handleSubscribe = (token, address) => dispatch => {
  dispatch({ type: LOADING });
  const headers = setHeaders();
  axios
    .post(
      'https://fierce-plains-47590.herokuapp.com/api/subscription',
      { token, address },
      { headers }
    )
    .then(res =>
      dispatch({ type: SUBSCRIBE_SUCCESS, payload: res.data.success })
    )
    .catch(err => {
      dispatch({ type: SUBSCRIBE_FAILURE, payload: err.response.data.error });
    });
};

export const retrieveSubscription = () => dispatch => {
  dispatch({ type: LOADING });
  const headers = setHeaders();
  axios
    .get('https://fierce-plains-47590.herokuapp.com/api/subscription', {
      headers,
    })
    .then(res =>
      dispatch({
        type: RETRIEVE_SUBSCRIPTION_SUCCESS,
        payload: res.data.subscription,
      })
    )
    .catch(err =>
      dispatch({
        type: RETRIEVE_SUBSCRIPTION_FAILURE,
        payload: err.response.data.error,
      })
    );
};

export const cancelDefault = () => dispatch => {
  dispatch({ type: LOADING });
  const headers = setHeaders();
  axios
    .delete('https://fierce-plains-47590.herokuapp.com/api/subscription', {
      headers,
    })
    .then(res => dispatch({ type: CANCEL_DEFAULT_SUCCESS }))
    .catch(err =>
      dispatch({
        type: CANCEL_DEFAULT_FAILURE,
        payload: err.response.data.error,
      })
    );
};

export const cancelImmediate = () => dispatch => {
  dispatch({ type: LOADING });
  const headers = setHeaders();
  axios
    .delete(
      'https://fierce-plains-47590.herokuapp.com/api/subscription/immediate',
      { headers }
    )
    .then(res =>
      dispatch({ type: CANCEL_IMMEDIATE_SUCCESS, payload: res.data })
    )
    .catch(err =>
      dispatch({
        type: CANCEL_IMMEDIATE_FAILURE,
        payload: err.response.data.error,
      })
    );
};

export const clearTempFeedbak = () => dispatch => {
  dispatch({ type: CLEAR_TEMP_FEEDBACK });
};

export const startManualLoad = () => dispatch => {
  dispatch({ type: LOADING });
};

export const endManualLoad = () => dispatch => {
  dispatch({ type: END_LOAD });
};

export const setError = err => dispatch => {
  dispatch({ type: SET_ERROR, payload: err });
};
