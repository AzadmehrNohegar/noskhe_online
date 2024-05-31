import {
  apiCustomResponse,
  credit_invoice,
  credit_invoice_response,
  invoice,
  pkg_invoice,
} from "@/model";
import { AxiosCustomRequestConfig, http } from "@/services/axios";

export const getInvoiceApiInvoices = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get<invoice[]>("/invoice/api/invoices/", { params });
};

export const getInvoiceApiPackageInvoices = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get<pkg_invoice[]>("/invoice/api/package-invoices/", {
    params,
  });
};

export const getInvoiceApiCreditInvoices = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get<credit_invoice[]>("/invoice/api/credit-invoices/", {
    params,
  });
};

export const getInvoiceApiExportCsvInvoices = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get("/invoice/api/export/csv/invoices/", { params });
};

export const getInvoiceApiExportCsvPackageInvoices = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get("/invoice/api/export/csv/package-invoices/", {
    params,
  });
};

export const getInvoiceApiExportCsvCreditInvoices = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get("/invoice/api/export/csv/credit-invoices/", {
    params,
  });
};

export const getInvoiceApiInvoicesDownloadById = async ({
  id,
  headers,
}: AxiosCustomRequestConfig) => {
  return await http.get(`/invoice/api/invoices/${id}/download/`, { headers });
};

export const postInvoiceApiInvoices = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post("/invoice/api/invoices/", body);
};

export const postInvoiceApiCreditInvoices = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post<unknown, apiCustomResponse<credit_invoice_response>>(
    "/invoice/api/credit-invoices/",
    body
  );
};
