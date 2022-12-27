import React, { FormEvent } from "react";
import { useGlobals } from "@storybook/api";

const Setup = (): JSX.Element => {
  const [, update] = useGlobals();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const apiKey = formData.get("api-key");
    const password = formData.get("password");

    if (!apiKey || !password) {
      throw new Error(`Invalid fields`);
    }
    update({ apiKey: apiKey.valueOf(), password: password.valueOf() });
  };

  return (
    <div>
      <h1>Setup API Information</h1>
      <p>
        Before doing any testing, an API key for Email on Acid is needed. Once
        can be obtained by creating an account and signing up for a
        subscription.
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="api-key">API Key</label>
        <input id="api-key" name="api-key" type="text" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export { Setup };
