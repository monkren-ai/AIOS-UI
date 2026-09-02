import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import {
  ShowcaseProvider,
  type ShowcaseContextValue,
} from "@/showcase/ShowcaseContext";
import { ComponentsLayout } from "./ComponentsLayout";

function renderDetail(entry: string) {
  const context: ShowcaseContextValue = {
    lang: "zh",
    t: (zh) => zh,
    toggleLang: vi.fn(),
    preloadProjectIntro: vi.fn(),
    preloadAIPoc: vi.fn(),
    preloadShowcase: vi.fn(),
  };

  return render(
    <MemoryRouter initialEntries={[entry]}>
      <ShowcaseProvider value={context}>
        <Routes>
          <Route path="/components" element={<ComponentsLayout />}>
            <Route path=":slug" element={<div>组件正文</div>} />
          </Route>
        </Routes>
      </ShowcaseProvider>
    </MemoryRouter>,
  );
}

describe("ComponentsLayout", () => {
  it("infers the AI Agent page and its Chat, Agent, and Shell navigation", () => {
    renderDetail("/components/aicss");

    expect(
      screen.getByRole("radio", { name: /AI Agent 组件/ }),
    ).toHaveAttribute("aria-checked", "true");
    const sideNav = screen.getByRole("navigation", { name: "组件导航" });
    expect(within(sideNav).getByText("Chat")).toBeInTheDocument();
    expect(within(sideNav).getByText("Agent")).toBeInTheDocument();
    expect(within(sideNav).getByText("Shell")).toBeInTheDocument();
    expect(within(sideNav).queryByText("操作与输入")).not.toBeInTheDocument();
  });

  it("keeps basic detail pages inside the basic component navigation", () => {
    renderDetail("/components/autocomplete");

    expect(screen.getByRole("radio", { name: /基础组件/ })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    const sideNav = screen.getByRole("navigation", { name: "组件导航" });
    expect(within(sideNav).getByText("操作与输入")).toBeInTheDocument();
    expect(within(sideNav).queryByText("Chat")).not.toBeInTheDocument();
  });

  it("does not keep a separate live overview entry in the side navigation", () => {
    renderDetail("/components/autocomplete");

    const sideNav = screen.getByRole("navigation", { name: "组件导航" });
    expect(within(sideNav).queryByText("浏览")).not.toBeInTheDocument();
    expect(
      within(sideNav).queryByRole("link", { name: "交互总览" }),
    ).not.toBeInTheDocument();
  });
});
