import { service } from './../services/api';
import config from '../config.json';

import { ADD_FILMS } from './../constants';

const addFilms = (films = []) => ({
  type: ADD_FILMS,
  films
});

export const fetchFilmsAndDispatch = () => dispatch => {
  service
    .get(config.FILM_URL)
    //.then(_data => dispatch(addFilms(_data.results)));
	.then(async _data => {
      let infoObj = _data;
      if (infoObj) {
        let film = [...infoObj.results];
        while (infoObj.next) {
          infoObj = await service.get(infoObj.next);
          infoObj && (film = [...film, ...infoObj.results]);
          dispatch(addFilms(film))
        }
      }
    });
};
