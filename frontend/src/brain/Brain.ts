import { BodyUploadCsv, CheckHealthData, GetAllLeadsData, UploadCsvData, UploadCsvError } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Brain<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Check health of application. Returns 200 when OK, 500 when not.
   *
   * @name check_health
   * @summary Check Health
   * @request GET:/_healthz
   */
  check_health = (params: RequestParams = {}) =>
    this.request<CheckHealthData, any>({
      path: `/_healthz`,
      method: "GET",
      ...params,
    });

  /**
   * @description Upload a CSV file with company leads
   *
   * @tags dbtn/module:leads
   * @name upload_csv
   * @summary Upload Csv
   * @request POST:/routes/api/leads/upload
   */
  upload_csv = (data: BodyUploadCsv, params: RequestParams = {}) =>
    this.request<UploadCsvData, UploadCsvError>({
      path: `/routes/api/leads/upload`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      ...params,
    });

  /**
   * @description Get all leads
   *
   * @tags dbtn/module:leads
   * @name get_all_leads
   * @summary Get All Leads
   * @request GET:/routes/api/leads
   */
  get_all_leads = (params: RequestParams = {}) =>
    this.request<GetAllLeadsData, any>({
      path: `/routes/api/leads`,
      method: "GET",
      ...params,
    });
}
