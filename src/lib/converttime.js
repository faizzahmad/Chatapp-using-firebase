import { formatDistanceToNow } from 'date-fns';

export const getMinutesAgo = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  return formatDistanceToNow(date, { addSuffix: true });
};
