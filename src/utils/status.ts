import type { BarrierStatusCode } from '../types';

export const BARRIER_STATUS_MAP: Record<BarrierStatusCode, string> = {
  VERIFYING_PIN: 'barrier.verifying_pin',
  OPENED_SUCCESSFULLY: 'barrier.opened_successfully',
  INVALID_OR_EXPIRED_PIN: 'barrier.invalid_or_expired_pin',
  NETWORK_ERROR: 'barrier.network_error',
} as const;

export function getBarrierStatusMessage(statusCode: BarrierStatusCode): string {
  return BARRIER_STATUS_MAP[statusCode];
}
