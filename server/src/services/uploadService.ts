import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
dotenv.config();

const s3 = new S3({
  endpoint: process.env.SELECTEL_ENDPOINT,
  accessKeyId: process.env.ACCESS_KEY_S3,
  secretAccessKey: process.env.SECRET_KEY_S3,
  region: 'ru-7',
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});

export const uploadPicture = async (
  file: Express.Multer.File,
): Promise<string> => {
  const key = `projects/${uuidv4()}_${file.originalname}`;
  const params = {
    Bucket: process.env.SELECTEL_BUCKET!,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };
  const result = await s3.upload(params).promise();
  return result.Location;
};

export const deletePicture = async (key: string): Promise<void> => {
  const params = {
    Bucket: process.env.SELECTEL_BUCKET!,
    Key: key,
  };
  await s3.deleteObject(params).promise();
};
