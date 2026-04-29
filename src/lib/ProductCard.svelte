<script lang="ts">
  import type { Product } from '../types';

  export let product: Product;
  export let layout: 'grid' | 'list' = 'grid';

  let imageError = false;
  let retries = 0;

  function handleImageError(e: Event) {
    if (retries < 1 && product.image) {
      retries++;
      const img = e.target as HTMLImageElement;
      // Thêm cache-buster để trình duyệt thử tải lại ảnh thay vì dùng cache lỗi
      img.src = product.image + (product.image.includes('?') ? '&' : '?') + 'retry=' + Date.now();
    } else {
      imageError = true;
    }
  }

  function getInitials(name: string): string {
    return name
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();
  }

  // Random soft gradient for placeholder
  const gradients = [
    'linear-gradient(135deg, #2d6a4f, #52b788)',
    'linear-gradient(135deg, #b5451b, #e07a5f)',
    'linear-gradient(135deg, #7b6b43, #c9a84c)',
    'linear-gradient(135deg, #3d405b, #81b29a)',
    'linear-gradient(135deg, #4a7c59, #90be6d)',
  ];
  const gradient = gradients[Math.abs(product.name.charCodeAt(0) + product.name.length) % gradients.length];

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="product-card {layout}"
  class:out-of-stock={!product.inStock}
  on:click={() => dispatch('select', product)}
>
  <div class="product-image-wrap">
    {#if product.image && !imageError}
      <img
        src={product.image}
        alt={product.name}
        on:error={handleImageError}
        loading="lazy"
      />
    {:else}
      <div class="product-placeholder" style="background: {gradient}">
        <span>{getInitials(product.name)}</span>
      </div>
    {/if}
    {#if !product.inStock}
      <div class="badge out-badge">Hết hàng</div>
    {/if}
    {#if product.category}
      <div class="badge cat-badge">{product.category}</div>
    {/if}
  </div>

  <div class="product-info">
    <h3 class="product-name">{product.name}</h3>
    {#if product.description && layout === 'list'}
      <p class="product-desc">{product.description}</p>
    {/if}
    <div class="product-meta">
      <span class="product-price">{product.priceFormatted}</span>
      {#if product.unit}
        <span class="product-unit">/ {product.unit}</span>
      {/if}
    </div>
    {#if layout === 'list' && product.tags.length > 0}
      <div class="tags">
        {#each product.tags as tag}
          <span class="tag">{tag}</span>
        {/each}
      </div>
    {/if}
    <button class="btn-detail" on:click|stopPropagation={() => dispatch('select', product)}>
      Xem chi tiết
    </button>
  </div>
</div>

<style>
  .product-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
    display: flex;
    position: relative;
  }

  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.18);
    border-color: var(--accent);
  }

  /* === GRID LAYOUT === */
  .product-card.grid {
    flex-direction: column;
  }

  .product-card.grid .product-image-wrap {
    width: 100%;
    aspect-ratio: 1 / 1;
    position: relative;
    overflow: hidden;
  }

  .product-card.grid .product-info {
    padding: 14px 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
  }

  .product-card.grid .btn-detail {
    margin-top: auto;
  }

  /* === LIST LAYOUT === */
  .product-card.list {
    flex-direction: row;
    align-items: stretch;
    gap: 0;
  }

  .product-card.list .product-image-wrap {
    width: 140px;
    min-width: 140px;
    height: 140px;
    position: relative;
    overflow: hidden;
  }

  .product-card.list .product-info {
    padding: 16px 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
  }

  .product-card.list .product-name {
    font-size: 1.1rem;
  }

  .product-card.list .btn-detail {
    align-self: flex-start;
    margin-top: auto;
  }

  /* === SHARED === */
  .product-image-wrap img,
  .product-placeholder {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
  }

  .product-card:hover .product-image-wrap img,
  .product-card:hover .product-placeholder {
    transform: scale(1.06);
  }

  .product-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 700;
    color: rgba(255,255,255,0.85);
    letter-spacing: 2px;
  }

  .badge {
    position: absolute;
    top: 10px;
    font-size: 0.68rem;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 20px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .out-badge {
    left: 10px;
    background: rgba(220, 60, 60, 0.88);
    color: #fff;
    backdrop-filter: blur(4px);
  }

  .cat-badge {
    right: 10px;
    background: rgba(15, 15, 15, 0.62);
    color: #fff;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255,255,255,0.15);
  }

  .out-of-stock {
    opacity: 0.7;
  }

  .product-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-primary);
    line-height: 1.35;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .product-desc {
    font-size: 0.82rem;
    color: var(--text-muted);
    margin: 0;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .product-meta {
    display: flex;
    align-items: baseline;
    gap: 4px;
  }

  .product-price {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--accent);
  }

  .product-unit {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .tag {
    font-size: 0.7rem;
    padding: 2px 8px;
    border-radius: 12px;
    background: var(--tag-bg);
    color: var(--text-muted);
    border: 1px solid var(--border);
  }

  .btn-detail {
    padding: 7px 16px;
    border-radius: 8px;
    border: 1.5px solid var(--accent);
    background: transparent;
    color: var(--accent);
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.18s ease, color 0.18s ease;
    font-family: inherit;
    margin-top: 8px;
  }

  .btn-detail:hover {
    background: var(--accent);
    color: #fff;
  }
</style>
