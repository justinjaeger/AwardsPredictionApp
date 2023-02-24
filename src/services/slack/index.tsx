import axios from 'axios';
import { SLACK_BOT_TOKEN } from '../../config';

export enum SlackChannel {
  BUGS = 'BUGS',
  SUGGESTIONS = 'SUGGESTIONS',
  QUESTIONS = 'QUESTIONS',
  SUPPORT = 'SUPPORT',
  OTHER = 'OTHER',
}

const channelIds: {
  [key in SlackChannel]: string;
} = {
  [SlackChannel.BUGS]: 'C04R5RJ6V5J',
  [SlackChannel.SUGGESTIONS]: 'C04R5RNKE5A',
  [SlackChannel.QUESTIONS]: 'C04R18GU961',
  [SlackChannel.SUPPORT]: 'C04QXKEQBSA',
  [SlackChannel.OTHER]: 'C04R0DV5HJ9',
};

const sendMessage = async (message: string, channel: SlackChannel) => {
  const channelId = channelIds[channel];
  await axios.post(
    'https://slack.com/api/chat.postMessage',
    {
      channel: channelId,
      text: message,
    },
    {
      headers: {
        Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
    },
  );
};

const SlackApi = {
  sendMessage,
};

export default SlackApi;
