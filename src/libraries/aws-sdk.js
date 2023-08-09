import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl as getSigned } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

const S3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  region: process.env.BUCKET_REGION,
});

/**
 * Upload file to specific bucket
 * @param {String} userId
 * @param {String} filename
 * @param {Buffer} fileContent
 * @returns
 */
export const upload = (userId, filename, fileContent) => {
  const Key = `${userId}/${uuidv4()}/${filename}`;
  return {
    storeScheduleBucket: async () => {
      const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_SCHEDULE,
        Key,
        Body: fileContent,
      });
      await S3.send(command);
      return { key: Key };
    },
    storeBucket: async () => {
      const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_KEEP,
        Key,
        Body: fileContent,
      });
      await S3.send(command);
      return { key: Key };
    },
  };
};

/**
 * Get file content with limited time public
 * @param {String} Key
 * @returns
 */
export const getSignedUrl = async (Key, Bucket) => {
  const command = new GetObjectCommand({
    Bucket,
    Key,
  });
  return await getSigned(S3, command, { expiresIn: parseInt(process.env.EXPIRED_LIMIT, 10) });
};

/**
 * Converts a stream from S3 to a string.
 *
 * @param {stream.Readable} stream - The stream to convert.
 * @returns {Promise<string>} - A promise that resolves to the converted string.
 */
const s3streamToString = async (stream) => {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', (error) => reject(error));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
  });
};

export const getFileContent = async (Key) => {
  try {
    // Retrieve the HTML file from S3
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_KEEP,
      Key,
    });
    const response = await S3.send(command);

    const fileContent = await s3streamToString(response.Body);

    return fileContent;
  } catch (error) {
    console.error('Error retrieving HTML from S3:', error);
    throw error;
  }
};
