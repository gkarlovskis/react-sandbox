import { AuthApi } from "../../src/api/auth-api";

describe("AuthApi unit tests", () => {
  it("constructor", () => {
    const api: AuthApi = new AuthApi("https://www.fakeurl.com");

    expect(api).not.toBeUndefined();
    expect(api["baseUrl"]).toBe("https://www.fakeurl.com");
  });

  it("fetchUserData", async () => {
    const api: AuthApi = new AuthApi("https://www.fakeurl.com");
    const spyOn = jest.spyOn(api, "post" as any).mockResolvedValueOnce("resolved")
      .mockResolvedValueOnce({
        data: { username: "demo@demo.lv" }
      })
      .mockResolvedValueOnce({
        data: { username: "demo1@demo.lv" }
      })
      .mockResolvedValueOnce({
        data: null
      });

    await expect(api.fetchUserData("username" as any, "password" as any)).resolves.toEqual({ "role": "", "username": "" });
    expect(spyOn.mock.calls[0][0]).toBe("");
    expect(spyOn.mock.calls[0][1]).toBe("https://www.fakeurl.com/post");
    expect(spyOn.mock.calls[0][2]).not.toBeUndefined();
    expect(spyOn.mock.calls[0][3]).not.toBeUndefined();

    await expect(api.fetchUserData("demo@demo.lv" as any, "password" as any)).resolves.toEqual({ "role": "admin", "username": "demo@demo.lv" });
    expect(spyOn.mock.calls[0][0]).toBe("");
    expect(spyOn.mock.calls[0][1]).toBe("https://www.fakeurl.com/post");
    expect(spyOn.mock.calls[0][2]).not.toBeUndefined();
    expect(spyOn.mock.calls[0][3]).not.toBeUndefined();

    await expect(api.fetchUserData("demo1@demo.lv" as any, "password" as any)).resolves.toEqual({ "role": "user", "username": "demo1@demo.lv" });

    expect(spyOn.mock.calls[0][0]).toBe("");
    expect(spyOn.mock.calls[0][1]).toBe("https://www.fakeurl.com/post");
    expect(spyOn.mock.calls[0][2]).not.toBeUndefined();
    expect(spyOn.mock.calls[0][3]).not.toBeUndefined();

    await expect(api.fetchUserData("demo@demo.lv" as any, "password" as any)).resolves.toEqual({ "role": "", "username": "" });
    expect(spyOn.mock.calls[0][0]).toBe("");
    expect(spyOn.mock.calls[0][1]).toBe("https://www.fakeurl.com/post");
    expect(spyOn.mock.calls[0][2]).not.toBeUndefined();
    expect(spyOn.mock.calls[0][3]).not.toBeUndefined();

    expect(spyOn).toHaveBeenCalledTimes(4);
  });

});
