/* eslint-disable */
import QiscusSDK from 'qiscus-sdk-core';

// this part is only for browsers, but we need to get around this part
// so that build tool not complaining
window.qiscus = null;
export default (function QiscusStoreSingleton() {
  if (!window.qiscus) window.qiscus = new QiscusSDK();
  return window.qiscus;
})();
