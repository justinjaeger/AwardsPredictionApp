import * as UploadService from './upload';
import * as DownloadService from './download';

const AWSStorage = {
  ...UploadService,
  ...DownloadService,
};

export default AWSStorage;
