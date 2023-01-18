interface HttpResponseHeader {
    "Content-Type": string,
}

export interface HttpResponse {
    statusCode: number,
    body: any,
    headers?: HttpResponseHeader,
}
