import { TLabelProps } from './types';

export function isLabelProps(value: unknown): value is TLabelProps {
  return Object.prototype.hasOwnProperty.call(value, 'value');
}
