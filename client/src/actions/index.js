import axios from 'axios';

export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export const fetchUsers = () => dispatch => {
  dispatch({ type: LOADING });
  axios.get('')
    .then(res => {
      dispatch({ type: SUCCESS, payload: res.data});
    })
    .catch(() => {
      dispatch({ type: FAILURE, error: "Something went wrong."})
    })
}