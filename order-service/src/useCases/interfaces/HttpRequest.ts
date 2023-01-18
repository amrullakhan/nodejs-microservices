interface HttpRequestHeader {
  "Content-Type": string;
  Referer: string;
  "User-Agent": string;
}

export interface HttpRequest {
  body: any;
  query: any;
  params: any;
  ip: string;
  method: string;
  path: string;
  headers: HttpRequestHeader;
}
