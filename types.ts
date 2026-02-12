
export interface User {
  username: string;
  email: string;
  avatar: string;
  lastLogin: string;
}

export enum AuthStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface InsightData {
  quote: string;
  author: string;
  tip: string;
}
