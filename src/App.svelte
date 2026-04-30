<script lang="ts">
  import { onMount } from 'svelte';
  import type { Product, LayoutMode, SortOption, PageView } from './types';
  import { fetchProducts } from './lib/dataService';
  import Header from './lib/Header.svelte';
  import ProductCard from './lib/ProductCard.svelte';
  import ProductModal from './lib/ProductModal.svelte';
  import CategoryFilter from './lib/CategoryFilter.svelte';
  import AboutPage from './lib/AboutPage.svelte';

  // State
  let products: Product[] = [];
  let loading = true;
  let error = '';
  let query = '';
  let sortBy: SortOption = 'default';
  let layout: LayoutMode = 'grid';
  let selectedCategory = 'all';
  let currentPage: PageView = 'home';
  let selectedProduct: Product | null = null;
  let lastFetch = 0;
  const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  // Derived
  $: categories = [...new Set(products.map((p) => p.category).filter(Boolean))].sort();

  $: filteredProducts = (() => {
    let list = products;

    // Category
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Search
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    list = [...list];
    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'name-az') list.sort((a, b) => a.name.localeCompare(b.name, 'vi'));

    return list;
  })();

  async function loadProducts(force = false) {
    const now = Date.now();
    if (!force && now - lastFetch < CACHE_TTL && products.length > 0) return;

    loading = true;
    error = '';
    try {
      products = await fetchProducts();
      lastFetch = now;
    } catch (e: any) {
      error = 'Không thể tải dữ liệu sản phẩm. Vui lòng thử lại.';
      console.error(e);
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    loadProducts();
  });

  function handleNavigate(e: CustomEvent<PageView>) {
    currentPage = e.detail;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleSearch(e: CustomEvent<string>) {
    query = e.detail;
    selectedCategory = 'all';
  }

  function handleSort(e: CustomEvent<SortOption>) {
    sortBy = e.detail;
  }

  function handleLayout(e: CustomEvent<LayoutMode>) {
    layout = e.detail;
  }

  function handleCategoryChange(e: CustomEvent<string>) {
    selectedCategory = e.detail;
    query = '';
  }

  function openProduct(e: CustomEvent<Product>) {
    selectedProduct = e.detail;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    selectedProduct = null;
    document.body.style.overflow = '';
  }

  // Skeleton count
  const SKELETON_COUNT = 8;

  // Columns for grid layout based on screen
  $: gridCols = layout === 'grid' ? 'grid' : 'list';
</script>

<svelte:head>
  <title>Gạo Lý Nhân – Gạo sạch chất lượng cao</title>
  <meta name="description" content="Cửa hàng gạo Lý Nhân – Chuyên cung cấp gạo sạch, gia vị chất lượng cao. Giao hàng tận nơi, giá tốt, uy tín." />
  <meta property="og:title" content="Gạo Lý Nhân" />
  <meta property="og:description" content="Gạo sạch – Chất lượng cao – Uy tín từ nhà nông" />
  <meta name="theme-color" content="#0f1113" />
</svelte:head>

<Header
  {query}
  {layout}
  {sortBy}
  {currentPage}
  resultCount={filteredProducts.length}
  totalCount={products.length}
  on:navigate={handleNavigate}
  on:search={handleSearch}
  on:sort={handleSort}
  on:layout={handleLayout}
  on:reload={() => loadProducts(true)}
/>

<main class="main">
  {#if currentPage === 'about'}
    <div class="page-enter">
      <AboutPage on:navigate={handleNavigate} />
    </div>
  {:else}
    <div class="home-page page-enter">
      <!-- Category Filter -->
      {#if categories.length > 0 && !loading}
        <div class="filter-bar">
          <CategoryFilter
            {categories}
            selected={selectedCategory}
            on:change={handleCategoryChange}
          />
        </div>
      {/if}

      <!-- Loading -->
      {#if loading}
        <div class="products-{gridCols}">
          {#each Array(SKELETON_COUNT) as _}
            <div class="skeleton-card">
              <div class="skeleton" style="aspect-ratio:1/1; width:100%;"></div>
              <div style="padding:14px; display:flex; flex-direction:column; gap:8px;">
                <div class="skeleton" style="height:18px; width:70%;"></div>
                <div class="skeleton" style="height:14px; width:45%;"></div>
                <div class="skeleton" style="height:32px; width:100%; margin-top:6px; border-radius:8px;"></div>
              </div>
            </div>
          {/each}
        </div>

      <!-- Error -->
      {:else if error}
        <div class="empty-state">
          <div class="empty-icon">⚠️</div>
          <h3>Có lỗi xảy ra</h3>
          <p>{error}</p>
          <button class="retry-btn" on:click={() => loadProducts(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="1 4 1 10 7 10"/>
              <path d="M3.51 15a9 9 0 1 0 .49-3.96"/>
            </svg>
            Thử lại
          </button>
        </div>

      <!-- No results -->
      {:else if filteredProducts.length === 0}
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>Không tìm thấy sản phẩm</h3>
          <p>Thử tìm kiếm với từ khoá khác hoặc chọn danh mục khác.</p>
          <button class="retry-btn" on:click={() => { query = ''; selectedCategory = 'all'; }}>
            Xem tất cả
          </button>
        </div>

      <!-- Products -->
      {:else}
        <div class="products-{gridCols}">
          {#each filteredProducts as product (product.id)}
            <ProductCard
              {product}
              {layout}
              on:select={openProduct}
            />
          {/each}
        </div>
      {/if}

      <!-- Footer note -->
      {#if !loading && !error && products.length > 0}
        <div class="footer-note">
          <span>Dữ liệu được cập nhật từ hệ thống quản lý.</span>
          <button class="refresh-btn" on:click={() => loadProducts(true)}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="1 4 1 10 7 10"/>
              <path d="M3.51 15a9 9 0 1 0 .49-3.96"/>
            </svg>
            Làm mới
          </button>
        </div>
      {/if}
    </div>
  {/if}
</main>

<!-- Product Modal -->
{#if selectedProduct}
  <ProductModal
    product={selectedProduct}
    on:close={closeModal}
  />
{/if}

<style>
  .main {
    min-height: calc(100vh - 80px);
  }

  .home-page {
    max-width: 1280px;
    margin: 0 auto;
    padding: 20px 20px 60px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* === Filter bar === */
  .filter-bar {
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding-bottom: 4px;
  }
  .filter-bar::-webkit-scrollbar { display: none; }

  /* === Product grid layout === */
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }

  /* === Product list layout === */
  .products-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* === Skeleton === */
  .skeleton-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
  }

  /* === Empty state === */
  .empty-state {
    text-align: center;
    padding: 80px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .empty-icon {
    font-size: 3rem;
    margin-bottom: 8px;
  }

  .empty-state h3 {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .empty-state p {
    color: var(--text-muted);
    font-size: 0.9rem;
    max-width: 320px;
  }

  .retry-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 22px;
    background: var(--accent);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 600;
    font-family: inherit;
    margin-top: 8px;
    transition: opacity 0.18s;
  }

  .retry-btn:hover { opacity: 0.85; }

  /* === Footer note === */
  .footer-note {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 16px 0 0;
    font-size: 0.78rem;
    color: var(--text-muted);
    border-top: 1px solid var(--border);
  }

  .refresh-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    color: var(--accent);
    font-size: 0.78rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    padding: 2px 4px;
    transition: opacity 0.18s;
  }

  .refresh-btn:hover { opacity: 0.75; }

  /* === Responsive === */
  @media (max-width: 960px) {
    .products-grid {
      grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
      gap: 13px;
    }
  }

  @media (max-width: 600px) {
    .home-page { padding: 14px 12px 50px; }
    .products-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
  }

  @media (max-width: 360px) {
    .products-grid { grid-template-columns: 1fr; }
  }
</style>
