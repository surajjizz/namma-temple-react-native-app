import FunctionUtils from "../utils/Function";
// import createHistory from 'history/createBrowserHistory';
import AppStorage from "../storage/AppStorage";
import { Messages } from "../constants";

export default class HttpClient {
  url: string;
  syncTimeout: number;
  history: any;

  constructor(url: string, timeout: number = 30) {
    this.url = url;
    this.syncTimeout = timeout;
    // this.history = createHistory();
  }

  async getResponse(url: string) {
    let retResp: any;
    let resGetData: any = null;
    let getMsg: any = null;
    var getResp: any;

    getResp = await this.get(url);
    if (getResp == null) {
      return null;
    }
    try {
      resGetData = await getResp.json();
      if (resGetData && resGetData.detail) {
        getMsg = resGetData.detail;
      }
      if (getResp.ok) {
        retResp = resGetData;
      } else {
        if (getResp.status === 401) {
          // FunctionUtils.toast('fail', getMsg ? getMsg : "Yor session has expired!.. Please login again");
          // FunctionUtils.clearAllData();
        }
      }
    } catch (e) {
      retResp = {};
    }
    return retResp;
  }

  async postResponse(url: string, method: string, body: any, isFormData: boolean = false) {
    let retResp: any = null;
    let resPostData: any = null;
    var postResp: any;
    var postMsg: any = null;

    postResp = await this.post(url, method, body, isFormData);
    if (postResp === null) {
      return null;
    }
    try {
      resPostData = await postResp.json();
      if (resPostData) {
        if (resPostData.detail) {
          postMsg = resPostData.detail;
        } else if (Object.keys(resPostData) && Object.keys(resPostData)[0]) {
          postMsg = Object.keys(resPostData)[0] + ' => ' + resPostData[Object.keys(resPostData)[0]][0];
        }
      }
      if (postResp.ok) {
        retResp = resPostData;
      } else {
        if (postResp.status === 400) {
          FunctionUtils.toast(postMsg ? postMsg : "Invalid input data");
        } else if (postResp.status === 409) {
          FunctionUtils.toast(postMsg ? postMsg : "User already exists");
        } else if (postResp.status === 401) {
          FunctionUtils.toast(postMsg ? postMsg : "Unauthorized user details");
        } else if (postResp.status === 403) {
          FunctionUtils.toast(postMsg ? postMsg : "You do not have permission");
        } else if (postResp.status === 404) {
          FunctionUtils.toast(postMsg ? postMsg : "User not found!!!");
        }
      }
    } catch (e) {
      postResp?.text().then(function (text: any) {
        console.log("Error Response", text);
      });
    }
    return retResp;
  }

  async get(url: string) {
    let config: any = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    var userInfo: any = await AppStorage.getUserDetails();
    if (userInfo && userInfo.token) {
      config.headers["Authorization"] = `Token ${userInfo.token}`;
    }
    return this.httpFetch(url, config);
  }

  async post(url: string, method: string, body: object, isFormData: boolean) {
    var userInfo: any = await AppStorage.getUserDetails() || null;
    let config: any = {
      method: method,
      headers: {},
      body: isFormData ? body : JSON.stringify(body),
    }
    if (!isFormData) {
      config.headers["Content-Type"] = "application/json";
    }
    if (userInfo && userInfo?.token) {
      config.headers["Authorization"] = `Token ${userInfo?.token}`;
    }
    return this.httpFetch(url, config);
  }

  timeout(ms: any, promise: any) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        reject(new Error("timeout"));
      }, ms);
      promise.then(resolve, reject);
    });
  }

  async httpFetch(endpoint: string, config: any) {
    let response: any = null;
    let url: string;
    this.syncTimeout = this.syncTimeout * 1000;
    url = this.url + endpoint;

    try {
      response = await this.timeout(this.syncTimeout, fetch(url, config));
    } catch (err: any) {
        FunctionUtils.toast(err?.message?.toLowerCase()?.includes("network request failed") ?
          Messages.noInternet : err?.message);
    }
    return response;
  }
}
