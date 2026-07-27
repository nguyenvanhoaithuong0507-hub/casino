import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Fragment } from "react";

const renderMock = vi.fn();
const createRootMock = vi.fn(() => ({ render: renderMock }));

vi.mock("react-dom/client", () => ({
  createRoot: createRootMock,
}));

vi.mock("@vercel/analytics/react", () => ({
  Analytics: () => null,
}));

vi.mock("./App", () => ({
  default: () => null,
}));

vi.mock("./index.css", () => ({}));

describe("main.tsx", () => {
  beforeEach(() => {
    vi.resetModules();
    renderMock.mockClear();
    createRootMock.mockClear();
    document.body.innerHTML = "";
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("mounts a React root on the #root DOM element", async () => {
    const rootElement = document.createElement("div");
    rootElement.id = "root";
    document.body.appendChild(rootElement);

    await import("./main");

    expect(createRootMock).toHaveBeenCalledTimes(1);
    expect(createRootMock).toHaveBeenCalledWith(rootElement);
  });

  it("renders App and Analytics together, in that order, in a single render call", async () => {
    const rootElement = document.createElement("div");
    rootElement.id = "root";
    document.body.appendChild(rootElement);

    // Import after main.tsx has been (re-)mounted so that the resolved
    // mock module instances match the ones main.tsx itself imported.
    await import("./main");
    const { default: App } = await import("./App");
    const { Analytics } = await import("@vercel/analytics/react");

    expect(renderMock).toHaveBeenCalledTimes(1);

    const renderedElement = renderMock.mock.calls[0][0];
    expect(renderedElement.type).toBe(Fragment);

    const children = renderedElement.props.children;
    expect(Array.isArray(children)).toBe(true);
    expect(children).toHaveLength(2);

    const [appElement, analyticsElement] = children;
    expect(appElement.type).toBe(App);
    expect(analyticsElement.type).toBe(Analytics);
  });

  it("calls createRoot with null when the #root element is missing (regression guard)", async () => {
    // No #root element appended to document.body in this test, mirroring
    // the non-null assertion `document.getElementById("root")!` in main.tsx.
    await import("./main");

    expect(createRootMock).toHaveBeenCalledTimes(1);
    expect(createRootMock).toHaveBeenCalledWith(null);
  });

  it("only calls render once even though App and Analytics are separate elements", async () => {
    const rootElement = document.createElement("div");
    rootElement.id = "root";
    document.body.appendChild(rootElement);

    await import("./main");

    // Ensures Analytics is mounted alongside the app in a single render
    // pass rather than via a separate render/inject call.
    expect(createRootMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledTimes(1);
  });
});