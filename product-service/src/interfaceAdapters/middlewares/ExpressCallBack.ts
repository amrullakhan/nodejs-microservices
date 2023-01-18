import { HttpRequest, HttpResponse } from "useCases/interfaces";

export const makeExpressCallback = (controller: any) => {
  return (req: any, res: any) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent"),
      },
    };

    controller(httpRequest)
      .then((httpResponse: HttpResponse) => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }
        res.type("json");
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch((e: any) => {
        console.error(e);
        res.status(500).send({ error: "An unkown error occurred." });
      });
  };
};
