import axios, { AxiosRequestConfig } from "axios";
import https from 'https'

export abstract class BaseApi {

  protected config(token: string): AxiosRequestConfig {
    return {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }), headers: { "Access-Control-Allow-Origin": "*", "x-custom-token": JSON.stringify(token) }
    };
  }


  protected get = async <T>(token: string, url: string, logMessage: string): Promise<T> => {
    console.log(logMessage);
    return await axios
      .get<T>(url, this.config(token))
      .then(response => response.data)
      .catch(error => {
        console.log(error);
      }) as T;
  };

  protected post = async <TReq, TRes>(token: string, url: string, data: TReq, logMessage: string): Promise<TRes> => {
    console.log(logMessage);
    return await axios
      .post<TRes>(url, data, this.config(token))
      .then(response => response.data)
      .catch(error => {
        throw new Error(error);
      });
  };

  protected patch = async <TReq, TRes>(token: string, url: string, data: TReq, logMessage: string): Promise<TRes> => {
    console.log(logMessage);
    return await axios
      .patch<TRes>(url, data, this.config(token))
      .then(response => response.data)
      .catch(error => {
        console.log(error);
      }) as TRes;
  };
}
