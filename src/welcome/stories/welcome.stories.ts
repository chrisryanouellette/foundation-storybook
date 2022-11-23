import { create } from "../../create";
import template from "../welcome.email.html";

export default {
  title: "Emails/Welcome",
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => create(template(args));

export const Welcome = Template.bind({});
Welcome.args = {
  name: "Chris Omlette",
  disable: false,
  ...Welcome.args,
};
