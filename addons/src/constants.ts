export enum Events {
  run = "RUN",
  result = "RESULT",
  error = "ERROR",
}

const url = new URL(window.location.origin);
url.port = "6007";
export { url };
