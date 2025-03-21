import { BodyUploadCsv, CheckHealthData, GetAllLeadsData, UploadCsvData } from "./data-contracts";

export namespace Brain {
  /**
   * @description Check health of application. Returns 200 when OK, 500 when not.
   * @name check_health
   * @summary Check Health
   * @request GET:/_healthz
   */
  export namespace check_health {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CheckHealthData;
  }

  /**
   * @description Upload a CSV file with company leads
   * @tags dbtn/module:leads
   * @name upload_csv
   * @summary Upload Csv
   * @request POST:/routes/api/leads/upload
   */
  export namespace upload_csv {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BodyUploadCsv;
    export type RequestHeaders = {};
    export type ResponseBody = UploadCsvData;
  }

  /**
   * @description Get all leads
   * @tags dbtn/module:leads
   * @name get_all_leads
   * @summary Get All Leads
   * @request GET:/routes/api/leads
   */
  export namespace get_all_leads {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetAllLeadsData;
  }
}
