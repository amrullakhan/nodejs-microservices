import { Request } from "express";
import { makeExpressCallback } from "./ExpressCallBack";

describe("ExpressCallBack", () => {
  it("should return a function", () => {
    const controller = jest.fn();
    const expressCallback = makeExpressCallback(controller);
    expect(typeof expressCallback).toBe("function");
  });

  it("should call controller", () => {
    const controller = jest.fn();
    controller.mockResolvedValueOnce({
      headers: {},
      statusCode: 200,
      body: {},
    });
    const mockRequest = {
      body: {},
      query: {},
      params: {},
      ip: "",
      method: "",
      path: "",
      headers: {
        "Content-Type": "",
        Referer: "",
        "User-Agent": "",
      },
      get: jest.fn(),
    };
    const mockResponse = {
      set: jest.fn(),
      type: jest.fn(),
      status: jest.fn(),
    };
    const sendMock = jest.fn();
    mockResponse.status.mockReturnValueOnce({ send: sendMock });

    const expressCallback = makeExpressCallback(controller);
    expressCallback(mockRequest, mockResponse);
    expect(controller).toHaveBeenCalled();
  });

  it("should call controller and catch the error", () => {
    const controller = jest.fn();
    controller.mockRejectedValueOnce(new Error("error"));
    const mockRequest = {
      body: {},
      query: {},
      params: {},
      ip: "",
      method: "",
      path: "",
      headers: {
        "Content-Type": "",
        Referer: "",
        "User-Agent": "",
      },
      get: jest.fn(),
    };
    const mockResponse = {
      set: jest.fn(),
      type: jest.fn(),
      status: jest.fn(),
    };
    const sendMock = jest.fn();
    mockResponse.status.mockReturnValueOnce({ send: sendMock });

    const expressCallback = makeExpressCallback(controller);
    expressCallback(mockRequest, mockResponse);
    expect(controller).toHaveBeenCalled();
    expect(controller).not.toThrow();
  });
});
