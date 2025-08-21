export interface WeatherData {
  temperature: number | null;
  wind: number | null;
  humidity: number | null;
  weatherCode: number | null;
  loading: boolean;
  error: boolean;
}

export interface BarrierState {
  pin: string[];
  deviceOnline: boolean;
  status: BarrierStatusCode | null;
  statusType: 'info' | 'error' | 'success' | null;
  isReady: boolean;
  justOpened: boolean;
}

export interface Contact {
  name: string;
  phone: string;
  description: string;
}

export interface PlaygroundRule {
  icon: string;
  title: string;
  desc: string;
}

export type StatusType = 'info' | 'error' | 'success';

export type BarrierStatusCode = 
  | 'VERIFYING_PIN'
  | 'OPENED_SUCCESSFULLY' 
  | 'INVALID_OR_EXPIRED_PIN'
  | 'NETWORK_ERROR';
