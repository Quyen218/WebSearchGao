<script lang="ts">
  import type { LayoutMode, SortOption, PageView } from "../types";
  import { createEventDispatcher } from "svelte";

  export let query: string = "";
  export let layout: LayoutMode = "grid";
  export let sortBy: SortOption = "default";
  export let currentPage: PageView = "home";
  export let resultCount: number = 0;
  export let totalCount: number = 0;

  const dispatch = createEventDispatcher();

  function toggleLayout() {
    dispatch("layout", layout === "grid" ? "list" : "grid");
  }
</script>

<header class="header">
  <div class="header-inner">
    <!-- Brand -->
    <button class="brand" on:click={() => dispatch("navigate", "home")}>
      <div class="brand-logo">
        <img
          src="/logo.jpg"
          alt="Gạo Lý Nhân Logo"
          style="width: 100%; height: 100%; object-fit: contain; border-radius: 10px;"
        />
      </div>
      <div class="brand-text">
        <span class="brand-name">Gạo Lý Nhân</span>
        <span class="brand-tagline">Gạo ngon – Giá tốt</span>
      </div>
    </button>

    <!-- Nav -->
    <nav class="nav-links">
      <button
        class="nav-btn"
        class:active={currentPage === "home"}
        on:click={() => dispatch("navigate", "home")}>Sản phẩm</button
      >
      <button
        class="nav-btn"
        class:active={currentPage === "about"}
        on:click={() => dispatch("navigate", "about")}>Giới thiệu</button
      >
    </nav>

    <!-- Controls -->
    <div class="controls">
      <!-- Search -->
      <div class="search-wrap">
        <svg
          class="search-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="search"
          class="search-input"
          placeholder="Tìm kiếm sản phẩm..."
          bind:value={query}
          on:input={() => dispatch("search", query)}
        />
        {#if query}
          <button
            class="clear-btn"
            on:click={() => {
              query = "";
              dispatch("search", "");
            }}
            aria-label="Xóa"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" /><line
                x1="6"
                y1="6"
                x2="18"
                y2="18"
              />
            </svg>
          </button>
        {/if}
      </div>

      <!-- Sort -->
      <select
        class="sort-select"
        bind:value={sortBy}
        on:change={() => dispatch("sort", sortBy)}
        aria-label="Sắp xếp"
      >
        <option value="default">Mặc định</option>
        <option value="price-asc">Giá ↑</option>
        <option value="price-desc">Giá ↓</option>
        <option value="name-az">A → Z</option>
      </select>

      <!-- Layout toggle -->
      <button
        class="icon-btn layout-btn"
        on:click={toggleLayout}
        title={layout === "grid" ? "Xem dạng danh sách" : "Xem dạng lưới"}
      >
        {#if layout === "grid"}
          <!-- List icon -->
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
        {:else}
          <!-- Grid icon -->
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
        {/if}
      </button>
    </div>
  </div>

  {#if currentPage === "home" && (query || totalCount > 0)}
    <div class="result-bar">
      <span class="result-count">
        {#if query}
          <strong>{resultCount}</strong> kết quả cho "<em>{query}</em>"
        {:else}
          <strong>{resultCount}</strong> sản phẩm
        {/if}
      </span>
    </div>
  {/if}
</header>

<style>
  .header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--header-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }

  .header-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  /* Brand */
  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    flex-shrink: 0;
    text-align: left;
  }

  .brand-logo {
    width: 42px;
    height: 42px;
    background: var(--card-bg);
    border: 1.5px solid var(--border);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.2s;
  }

  .brand:hover .brand-logo {
    border-color: var(--accent);
  }

  .brand-text {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .brand-name {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.3px;
    line-height: 1;
  }

  .brand-tagline {
    font-size: 0.68rem;
    color: var(--text-muted);
    font-weight: 400;
  }

  /* Nav */
  .nav-links {
    display: flex;
    gap: 4px;
    margin-left: 8px;
  }

  .nav-btn {
    padding: 6px 14px;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: var(--text-muted);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    font-family: inherit;
    transition:
      background 0.18s,
      color 0.18s;
  }

  .nav-btn:hover {
    background: var(--hover-bg);
    color: var(--text-primary);
  }
  .nav-btn.active {
    background: var(--hover-bg);
    color: var(--accent);
    font-weight: 600;
  }

  /* Controls */
  .controls {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: auto;
    flex-wrap: wrap;
  }

  .search-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-icon {
    position: absolute;
    left: 10px;
    color: var(--text-muted);
    pointer-events: none;
  }

  .search-input {
    padding: 8px 36px 8px 34px;
    border-radius: 10px;
    border: 1.5px solid var(--border);
    background: var(--input-bg);
    color: var(--text-primary);
    font-size: 0.875rem;
    font-family: inherit;
    width: 220px;
    transition:
      border-color 0.18s,
      width 0.3s ease;
    outline: none;
  }

  .search-input:focus {
    border-color: var(--accent);
    width: 280px;
  }

  .search-input::placeholder {
    color: var(--text-muted);
  }

  .clear-btn {
    position: absolute;
    right: 8px;
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    display: flex;
    padding: 2px;
    border-radius: 50%;
    transition: color 0.15s;
  }

  .clear-btn:hover {
    color: var(--text-primary);
  }

  .sort-select {
    padding: 8px 10px;
    border-radius: 10px;
    border: 1.5px solid var(--border);
    background: var(--input-bg);
    color: var(--text-primary);
    font-size: 0.82rem;
    font-family: inherit;
    cursor: pointer;
    outline: none;
    transition: border-color 0.18s;
  }

  .sort-select:focus {
    border-color: var(--accent);
  }

  .icon-btn {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    border: 1.5px solid var(--border);
    background: var(--input-bg);
    color: var(--text-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition:
      border-color 0.18s,
      background 0.18s;
    flex-shrink: 0;
  }

  .icon-btn:hover {
    border-color: var(--accent);
    background: var(--hover-bg);
  }

  .result-bar {
    max-width: 1280px;
    margin: 0 auto;
    padding: 6px 20px 10px;
  }

  .result-count {
    font-size: 0.82rem;
    color: var(--text-muted);
  }

  .result-count strong {
    color: var(--accent);
    font-weight: 700;
  }
  .result-count em {
    font-style: normal;
    color: var(--text-secondary);
  }

  @media (max-width: 640px) {
    .header-inner {
      gap: 10px;
    }
    .nav-links {
      margin-left: 0;
    }
    .controls {
      margin-left: 0;
      width: 100%;
    }
    .search-input {
      width: 100%;
    }
    .search-input:focus {
      width: 100%;
    }
    .search-wrap {
      flex: 1;
    }
  }

  @media (max-width: 480px) {
    .brand-tagline {
      display: none;
    }
    .nav-btn {
      padding: 6px 10px;
      font-size: 0.82rem;
    }
  }
</style>
