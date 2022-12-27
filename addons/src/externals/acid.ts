import { url } from "../constants";

export type Client = {
  id: string;
  client: string;
  os: string;
  category: string;
  browser: string;
  default: boolean;
  rotate: boolean;
};

export type ClientsResponse = {
  clients: {
    [id: string]: Client;
  };
};

export type GetTestResponse = {
  id: string;
  date: number;
  type: "email-test" | "spam-test";
  headers?: {
    [key: string]: string;
  };
}[];

export type AuditRequest = {
  subject: string;
  html: string;
  clients: string[];
  image_blocking: boolean;
};

export type AuditResponse = {
  id: string;
  reference_id?: string;
  customer_id?: string;
  spam: {
    key: string;
    address_list: string[];
  };
};

export type TestResult = {
  id: string;
  display_name: string;
  client: string;
  os: string;
  category: string;
  screenshots: {
    default: string;
    no_images: string;
  };
  thumbnail: string;
  full_thumbnail: string;
  status: string;
  status_details: {
    submitted: number;
    attempts: number;
  };
};

export type TestResultResponse = {
  [id: string]: TestResult;
};

export const getAcidHealth = async (): Promise<void> => {
  await fetch(new URL(url + "acid/auth"));
};

export const getAcidTemplates = async (): Promise<ClientsResponse> => {
  const res = await fetch(new URL(url + "acid/clients"));
  return await res.json();
};

export const getAcidTests = async (): Promise<GetTestResponse> => {
  const res = await fetch(new URL(url + "acid/tests"));
  return await res.json();
};

export const createAcidAudit = async (
  body: AuditRequest
): Promise<AuditResponse> => {
  const res = await fetch(new URL(url + "acid/audit"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return await res.json();
};

export const getAcidResult = async (
  id: string
): Promise<TestResultResponse> => {
  const res = await fetch(new URL(url + `acid/test/${id}`));
  return await res.json();
};
