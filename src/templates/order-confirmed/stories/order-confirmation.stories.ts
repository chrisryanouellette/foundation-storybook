import { create } from "../../../create";
import template from "../order-confirmed.email.html";

export default {
  title: "Emails/Order Confirmed",
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => create(template(args));

export const OrderConfirmed = Template.bind({});
OrderConfirmed.args = {
  recipient: "Person One",
  street: "123 Merry Lane",
  city: "Bennington",
  state: "NH",
  zip: "12345",
  "phone-number": "(123) 123-1234",
  "order-number": "123123123",
  "order-date": "April 1, 2020 at 12:00 AM",
  "shipping-type": "Ground",
  item: "24 Pack Paper Towels",
  "item-number": "123123123",
  ...OrderConfirmed.args,
};
