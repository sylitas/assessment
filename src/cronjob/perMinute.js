import { CronJob } from 'cron';
import sendBulkMailInvitation from './sendBulkMailInvitation';

const job = new CronJob(
  '* * * * *',
  async () => {
    console.time('Finish task during');
    try {
      const { isStop } = await sendBulkMailInvitation();
      if (isStop) {
        console.log('😎 Sylitas | Stop cronjob');
        job.stop();
      }
    } catch (error) {
      console.log('😎 Sylitas | Error :', error);
    }
    console.timeEnd('Finish task during');
  },
  null,
  false,
  'Asia/Ho_Chi_Minh'
);

export default job;
