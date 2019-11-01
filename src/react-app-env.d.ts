/// <reference types="react-scripts" />
interface Window {
  /** Runtime env variables */
  __REACT_APP_RUNTIME__: Record<string, string>;
  qiscus: any;
}

declare module 'qiscus-sdk-core';
declare module 'react-modal-image';
