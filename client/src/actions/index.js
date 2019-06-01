import axios from 'axios';

export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE'; 
export const SELECTED = 'SELECTED';
export const SET_MONTH = 'SET_MONTH';
export const SET_DAY = 'SET_DAY';

export const fetchAccts = () => dispatch => {
  dispatch({ type: LOADING });
  const bearer = 'Bearer ' + localStorage.getItem('jwt');
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
      dispatch({ type: SUCCESS, payload: accounts });
    }))
    .catch(() => {
      dispatch({ type: FAILURE, error: "Something went wrong."});
    });
}

export const selectContractor = (id, list) => dispatch => {
  const selected = list.filter(item => item.id === id);
  dispatch({ type: SELECTED, payload: selected[0]})
}

export const setDay = day => dispatch => {
  dispatch({ type: SET_DAY, payload: day })
}

export const setMonth = day => dispatch => {
  dispatch({ type: SET_MONTH, payload: day })
}