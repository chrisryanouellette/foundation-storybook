/// <reference path="../node_modules/handlebars/types/index.d.ts" />

declare module "*.email.html" {
  import Handlebars = require("handlebars");
  const value: ReturnType<typeof Handlebars.compile>;
  export default value;
}
