import express from "express";
import axios, { Axios, AxiosRequestConfig } from "axios";

const emailOnAcidUrl = "https://api.emailonacid.com/v5.0.1";

const apiKey = "cd593d2c06fb39909f04805d42e85ed2e88495fc";
const password = "EC$d4$afF@RJ$HnDjdj7";

const token = Buffer.from(`${apiKey}:${password}`).toString("base64");

const fetchAcid = (url: string, options: AxiosRequestConfig = {}) => {
  return axios(`${emailOnAcidUrl}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      authorization: `Basic ${token}`.trim(),
    },
  });
};

const router = express.Router();

router.get("/auth", async (req, res, next) => {
  try {
    await fetchAcid("/auth");
    return res.status(200).end();
  } catch (error) {
    return next(error);
  }
});

router.get("/clients", async (req, res, next) => {
  try {
    const internal = await fetchAcid("/email/clients");
    return res.status(internal.status).json(internal.data);
  } catch (error) {
    return next(error);
  }
});

router.get("/tests", async (req, res, next) => {
  try {
    const internal = await fetchAcid("/email/tests");
    return res.status(internal.status).json(internal.data);
  } catch (error) {
    return next(error);
  }
});

router.post("/audit", async (req, res, next) => {
  try {
    const internal = await axios.post(
      `${emailOnAcidUrl}/email/tests`,
      req.body,
      {
        headers: {
          authorization: `Basic ${token}`.trim(),
        },
      }
    );

    return res.status(internal.status).json(internal.data);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.get("/test/:id", async (req, res, next) => {
  try {
    const internal = await fetchAcid(`/email/tests/${req.params.id}/results`);
    return res.status(internal.status).json(internal.data);
  } catch (error) {
    return next(error);
  }
});

export { router };
