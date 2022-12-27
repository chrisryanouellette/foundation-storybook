import React, { useState } from "react";
import { addons, types } from "@storybook/addons";
import { AddonPanel } from "@storybook/components";
import { App } from "./components";

const ADDON_ID = "email-on-acid";
const PANEL_ID = `${ADDON_ID}/panel`;

addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "Email on Acid",
    render: ({ active, key }) => {
      return (
        <AddonPanel active={active || false} key={key} children={<App />} />
      );
    },
  });
});
