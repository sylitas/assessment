import mongoose from 'mongoose';
import BulkMailModel from './schema/bulkmail';

const {
  MONGO_USER: user,
  MONGO_PASSWORD: pass,
  MONGO_PORT: port,
  MONGO_DATABASE: dbName,
  MONGO_URL: host,
} = process.env;

const url = `mongodb://${user}:${pass}@${host}:${port}/${dbName}?directConnection=true&authSource=admin&replicaSet=replicaset&retryWrites=true`;

const connect = async () => mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const mongooseClient = {
  bulkMail: {
    create: async (query) => {
      try {
        await connect();
        const result = await BulkMailModel.create(query);
        return result;
      } catch (error) {
        console.log('😎 Sylitas | Error :', error);
      } finally {
        await mongoose.disconnect();
      }
    },
    find: async (query, limit) => {
      try {
        await connect();
        const result = await BulkMailModel.find(query).limit(limit);
        return result;
      } catch (error) {
        console.log('😎 Sylitas | Error :', error);
      } finally {
        await mongoose.disconnect();
      }
    },
    deleteMany: async (query) => {
      try {
        await connect();
        const result = await BulkMailModel.deleteMany(query);
        return result;
      } catch (error) {
        console.log('😎 Sylitas | Error :', error);
      } finally {
        await mongoose.disconnect();
      }
    },
  },
};

export default mongooseClient;
