  import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios"
import { createApi, getHotels } from ".";

vi.mock("axios", () => {
  const mockGet = vi.fn();
  const mockUse = vi.fn();

  return {
    default: {
      create: vi.fn(() => ({
        get: mockGet,
        interceptors: {
          request: { use: mockUse },
        },
      })),
      __mocks: { mockGet, mockUse },
    },
  };
});

const { mockGet, mockUse } = (axios).__mocks;
describe("api", () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("calls /hotels with the correct params", async () => {
    mockGet.mockResolvedValue({ data: [] });

    const bounds = { south: 1, north: 2, west: 3, east: 4 };
    await getHotels(bounds);

    expect(mockGet).toHaveBeenCalledWith("/hotels", {
      params: {
        min_lat: 1,
        max_lat: 2,
        min_lon: 3,
        max_lon: 4,
      },
    });
  });

  it("adds Authorization header when token exists", () => {
    const fakeToken = "abc123";
    localStorage.setItem("token", fakeToken);
    createApi(); 
    let config = { headers: {} };

    // Get the callback registered by interceptors.request.use
    const requestCallback = mockUse.mock.calls[0][0];
    config = requestCallback(config);

    expect(config.headers.Authorization).toBe(`Bearer ${fakeToken}`);
  });

  it("does not add Authorization header when no token exists", () => {
    localStorage.clear();
    createApi();
    let config = { headers: {} };
    const requestCallback = mockUse.mock.calls[0][0];
    config = requestCallback(config);

    expect(config.headers.Authorization).toBeUndefined();
  })
});
