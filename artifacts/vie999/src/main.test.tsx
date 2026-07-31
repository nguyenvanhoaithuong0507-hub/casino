import { describe, it, expect, vi, beforeEach } from "vitest";
import { Fragment, Children } from "react";
import type { ReactElement } from "react";

// `main.tsx` performs its work as a side effect at module-evaluation time
// (it isn't exporting any functions to call directly). To test it, we mock
// its dependencies, dynamically import the module, and assert on how the
// mocks were invoked.
const { createRootMock, renderMock, AppMock, AnalyticsMock } = vi.hoisted(() => {
  const renderMock = vi.fn();
  const createRootMock = vi.fn(() => ({
    render: renderMock,
    unmount: vi.fn(),
  }));
  const AppMock = () => null;
  const AnalyticsMock = () => null;
  return { createRootMock, renderMock, AppMock, AnalyticsMock };
});

vi.mock("react-dom/client", () => ({
  createRoot: createRootMock,
}));

vi.mock("@vercel/analytics/react", () => ({
  Analytics: AnalyticsMock,
}));

vi.mock("./App", () => ({
  default: AppMock,
}));

describe("main.tsx entry point", () => {
  beforeEach(() => {
    vi.resetModules();
    createRootMock.mockClear();
    renderMock.mockClear();
    document.body.innerHTML = '<div id="root"></div>';
  });

  it("mounts a React root on the #root DOM element", async () => {
    await import("./main");

    const rootElement = document.getElementById("root");
    expect(createRootMock).toHaveBeenCalledTimes(1);
    expect(createRootMock).toHaveBeenCalledWith(rootElement);
  });

  it("renders exactly once, with App and Analytics as sibling children of a fragment", async () => {
    await import("./main");

    expect(renderMock).toHaveBeenCalledTimes(1);

    const tree = renderMock.mock.calls[0][0] as ReactElement;
    expect(tree.type).toBe(Fragment);

    const children = Children.toArray(tree.props.children) as ReactElement[];
    expect(children).toHaveLength(2);
    expect(children[0].type).toBe(AppMock);
    expect(children[1].type).toBe(AnalyticsMock);
  });

  it("renders App and Analytics without passing any props", async () => {
    await import("./main");

    const tree = renderMock.mock.calls[0][0] as ReactElement;
    const [appElement, analyticsElement] = Children.toArray(
      tree.props.children,
    ) as ReactElement[];

    expect(appElement.props).toEqual({});
    expect(analyticsElement.props).toEqual({});
  });

  it("creates the root before rendering into it", async () => {
    await import("./main");

    const createRootOrder = createRootMock.mock.invocationCallOrder[0];
    const renderOrder = renderMock.mock.invocationCallOrder[0];
    expect(createRootOrder).toBeLessThan(renderOrder);
  });

  it("creates only a single root, since App and Analytics are rendered as siblings rather than nested roots", async () => {
    await import("./main");

    expect(createRootMock).toHaveBeenCalledTimes(1);
  });

  it("passes whatever getElementById('root') returns to createRoot, even null (regression: the `!` non-null assertion is compile-time only)", async () => {
    document.body.innerHTML = "";

    await import("./main");

    expect(createRootMock).toHaveBeenCalledTimes(1);
    expect(createRootMock).toHaveBeenCalledWith(null);
  });
});