import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import {
  ShowcaseProvider,
  type ShowcaseContextValue,
} from "@/showcase/ShowcaseContext";
import { ComponentsLayout } from "./ComponentsLayout";
import { ComponentsIndexPage } from "./ComponentsIndexPage";

class SilentIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

vi.stubGlobal("IntersectionObserver", SilentIntersectionObserver);

function renderPage(entry = "/components") {
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
            <Route index element={<ComponentsIndexPage />} />
          </Route>
        </Routes>
      </ShowcaseProvider>
    </MemoryRouter>,
  );
}

describe("ComponentsIndexPage", () => {
  it("defaults to the basic component page", () => {
    renderPage();

    expect(screen.getByRole("navigation", { name: "组件分组分页" })).toHaveClass(
      "sticky",
      "top-14",
      "justify-center",
    );
    expect(screen.getByRole("radio", { name: /基础组件/ })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(
      screen.getByRole("heading", { name: "操作与输入" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Chat" }),
    ).not.toBeInTheDocument();
    expect(
      screen
        .getAllByRole("link", { name: "按钮" })
        .some((el) => el.getAttribute("href") === "/components/button"),
    ).toBe(true);
  });

  it("shows the Chat, Agent, and Shell categories on the AI Agent page", () => {
    renderPage("/components?group=agent");

    expect(
      screen.getByRole("radio", { name: /AI Agent 组件/ }),
    ).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("heading", { name: "Chat" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Agent" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Shell" })).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "操作与输入" }),
    ).not.toBeInTheDocument();
  });

  it("switches component pages through the compact segmented control", () => {
    renderPage();

    fireEvent.click(screen.getByRole("radio", { name: /AI Agent 组件/ }));

    expect(
      screen.getByRole("radio", { name: /AI Agent 组件/ }),
    ).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("heading", { name: "Agent" })).toBeInTheDocument();
  });

  it("keeps the remaining subgroups on the other page", () => {
    renderPage("/components?group=other");

    expect(
      screen.getByRole("heading", { name: "时间与系统" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "装饰与效果" }),
    ).toBeInTheDocument();
  });
});
