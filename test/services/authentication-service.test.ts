
import { login, logout, getLoggedUser } from "../../src/services/authentication-service";
import { AuthApi } from "../../src/api/auth-api";

jest.mock("../../src/api/auth-api");
const mockDataAuthApi = AuthApi as jest.Mock;
const mockFetchUserResult = jest.fn();
mockDataAuthApi.mockImplementation(() => {
    return { fetchUserData: mockFetchUserResult };
});


describe("Authentication service unit tests", () => {
    beforeEach(() => {
        localStorage.removeItem("currentUser");
    });

    it("Login failure", async () => {
        mockFetchUserResult.mockResolvedValueOnce("");
        await expect(login("", "")).rejects.toThrowError();
    });

    it("Login success", async () => {
        mockFetchUserResult.mockResolvedValueOnce({ username: "tests" });
        await expect(login("", "")).resolves.toBe(true);
    });

    it("getLoggedUser failure", async () => {
        await expect(getLoggedUser()).resolves.toBeNull();
    });

    it("getLoggedUser success", async () => {
        localStorage.setItem("currentUser", JSON.stringify({ username: "demo" }));
        await expect(getLoggedUser()).resolves.not.toBeNull();
    });

    it("getLoggedUser parse error", async () => {
        localStorage.setItem("currentUser", "demo");
        await expect(getLoggedUser()).resolves.toBeNull();
    });

    it("logout", async () => {
        const reloadSpy = jest.fn();

        Object.defineProperty(window, "location", {
            value: { reload: reloadSpy },
        });

        localStorage.setItem("currentUser", JSON.stringify({ username: "demo" }));
        await expect(logout()).resolves.toBe(true);
    });
});