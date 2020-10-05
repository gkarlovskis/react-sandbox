import axios from "axios";
jest.mock("axios");
const mockAxios: jest.Mocked<typeof axios> = axios as jest.Mocked<typeof axios>;


import { AuthApi } from "../../src/api/auth-api";

describe("BaseApi", () => {
  beforeEach(() => {
    mockAxios.get.mockReset();
    mockAxios.post.mockReset();
    mockAxios.patch.mockReset();
  });

  it("constructor", () => {
    const api: AuthApi = new AuthApi("https://www.fakeendpoint.com");
    expect(api).not.toBeUndefined();
  });


  it("config", () => {
    const api: AuthApi = new AuthApi("https://www.fakeendpoint.com");

    expect(api["config"]("token" as any)).not.toBeUndefined()
  });

  describe("get", () => {
    it("success", async () => {
      mockAxios.get.mockResolvedValue({ data: "response" });
      const api: AuthApi = new AuthApi("https://www.fakeendpoint.com");
      const spyOnConfig = jest.spyOn(api, "config" as any).mockReturnValue("config");

      await expect(api["get"]("token" as any, "url", "message")).resolves.toBe("response");
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      expect(mockAxios.get.mock.calls[0][0]).toBe("url");
      expect(mockAxios.get.mock.calls[0][1]).toBe("config");
      expect(spyOnConfig).toHaveBeenCalledTimes(1);
      expect(spyOnConfig.mock.calls[0][0]).toBe("token");
    });

    it("error", async () => {
      mockAxios.get.mockRejectedValue(new Error("message"));
      const api: AuthApi = new AuthApi("https://www.fakeendpoint.com");
      jest.spyOn(api, "config" as any).mockReturnValue("config");
      await expect(api["get"]("token" as any, "url", "message")).resolves.toBeUndefined();
    });
  });

  describe("post", () => {
    it("success", async () => {
      mockAxios.post.mockResolvedValue({ data: "response" });
      const api: AuthApi = new AuthApi("https://www.fakeendpoint.com");
      const spyOnConfig = jest.spyOn(api, "config" as any).mockReturnValue("config");

      await expect(api["post"]("token" as any, "url", "data", "message")).resolves.toBe("response");
      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(mockAxios.post.mock.calls[0][0]).toBe("url");
      expect(mockAxios.post.mock.calls[0][1]).toBe("data");
      expect(mockAxios.post.mock.calls[0][2]).toBe("config");
      expect(spyOnConfig).toHaveBeenCalledTimes(1);
      expect(spyOnConfig.mock.calls[0][0]).toBe("token");
    });

    it("error", async () => {
      mockAxios.post.mockRejectedValue(new Error("message"));
      const api: AuthApi = new AuthApi("https://www.fakeendpoint.com");
      jest.spyOn(api, "config" as any).mockReturnValue("config");

      await expect(api["post"]("token" as any, "url", "data", "message")).rejects.toThrow(Error);
    });
  });

  describe("patch", () => {
    it("success", async () => {
      mockAxios.patch.mockResolvedValue({ data: "response" });
      const api: AuthApi = new AuthApi("https://www.fakeendpoint.com");
      const spyOnConfig = jest.spyOn(api, "config" as any).mockReturnValue("config");

      await expect(api["patch"]("token" as any, "url", "data", "message")).resolves.toBe("response");
      expect(mockAxios.patch).toHaveBeenCalledTimes(1);
      expect(mockAxios.patch.mock.calls[0][0]).toBe("url");
      expect(mockAxios.patch.mock.calls[0][1]).toBe("data");
      expect(mockAxios.patch.mock.calls[0][2]).toBe("config");
      expect(spyOnConfig).toHaveBeenCalledTimes(1);
      expect(spyOnConfig.mock.calls[0][0]).toBe("token");
    });

    it("error", async () => {
      mockAxios.patch.mockRejectedValue(new Error("message"));
      const api: AuthApi = new AuthApi("https://www.fakeendpoint.com");
      jest.spyOn(api, "config" as any).mockReturnValue("config");

      await expect(api["patch"]("token" as any, "url", "data", "message")).rejects.toThrow(Error);
    });
  });
});
