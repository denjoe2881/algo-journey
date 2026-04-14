import { getCompileWorker, workerRequest } from './src/worker/run-worker-pool';
// no that's frontend code. We can spin up testing purely via Node script?
// no, the easiest is to just write a Node test script to pass to worker?
// The worker is browser-based! `compile-worker.js` requires `importScripts` or DOM Worker API. So we cannot test via Node.
