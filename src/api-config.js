let serverPort = 9000;

const hostRef = window && window.location && window.location.href;
const serverHost = hostRef.substring(0, hostRef.lastIndexOf(":"));

export const API_ROOT = `${serverHost}:${serverPort}/`;