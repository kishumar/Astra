/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as Fetchreport from "../Fetchreport.js";
import type * as auth from "../auth.js";
import type * as getReportById from "../getReportById.js";
import type * as submitReport from "../submitReport.js";
import type * as updateReportStatus from "../updateReportStatus.js";
import type * as validatesession from "../validatesession.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  Fetchreport: typeof Fetchreport;
  auth: typeof auth;
  getReportById: typeof getReportById;
  submitReport: typeof submitReport;
  updateReportStatus: typeof updateReportStatus;
  validatesession: typeof validatesession;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
