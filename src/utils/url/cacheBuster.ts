import { hasQuery } from './hasQuery';
import { uniqueId } from '../string/uniqueId';

export const cacheBuster = (url: string) =>
  `${url}${hasQuery(url) ? '&' : '?'}uniqueId=${uniqueId()}`;
