/* eslint-disable-next-line */
import perMinute from './perMinute';

export default {
  perMinute: {
    start: () => {
      console.log('😎 Sylitas | Start cronjob');
      perMinute.start();
    },
    stop: () => {
      console.log('😎 Sylitas | Stop cronjob');
      perMinute.stop();
    },
  },
};
