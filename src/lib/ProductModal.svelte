<script lang="ts">
  import type { Product } from "../types";
  import { createEventDispatcher, onMount } from "svelte";

  export let product: Product;

  const dispatch = createEventDispatcher();
  let visible = false;
  let imageError = false;

  onMount(() => {
    setTimeout(() => (visible = true), 10);
  });

  function close() {
    visible = false;
    setTimeout(() => dispatch("close"), 260);
  }

  function handleKey(e: KeyboardEvent) {
    if (e.key === "Escape") close();
  }

  const gradients = [
    "linear-gradient(135deg, #2d6a4f, #52b788)",
    "linear-gradient(135deg, #b5451b, #e07a5f)",
    "linear-gradient(135deg, #7b6b43, #c9a84c)",
    "linear-gradient(135deg, #3d405b, #81b29a)",
    "linear-gradient(135deg, #4a7c59, #90be6d)",
  ];
  const gradient =
    gradients[
      Math.abs(product.name.charCodeAt(0) + product.name.length) %
        gradients.length
    ];

  function getInitials(name: string): string {
    return name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  }
</script>

<svelte:window on:keydown={handleKey} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="overlay" class:visible on:click={close}>
  <div class="modal" class:visible on:click|stopPropagation>
    <button class="close-btn" on:click={close} aria-label="Đóng">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>

    <div class="modal-image-wrap">
      {#if product.image && !imageError}
        <img
          src={product.image}
          alt={product.name}
          on:error={() => (imageError = true)}
        />
      {:else}
        <div class="modal-placeholder" style="background: {gradient}">
          <span>{getInitials(product.name)}</span>
        </div>
      {/if}
      {#if product.category}
        <span class="cat-pill">{product.category}</span>
      {/if}
    </div>

    <div class="modal-body">
      <div class="modal-header">
        <h2 class="modal-title">{product.name}</h2>
        <div
          class="stock-badge"
          class:in-stock={product.inStock}
          class:out-stock={!product.inStock}
        >
          {product.inStock ? "✓ Còn hàng" : "✗ Hết hàng"}
        </div>
      </div>

      <div class="price-row">
        <span class="modal-price">{product.priceFormatted}</span>
        {#if product.unit}
          <span class="modal-unit">/ {product.unit}</span>
        {/if}
      </div>

      {#if product.description}
        <div class="section">
          <h4 class="section-label">Mô tả sản phẩm</h4>
          <p class="modal-desc">{product.description}</p>
        </div>
      {/if}

      {#if product.tags.length > 0}
        <div class="section">
          <h4 class="section-label">Nhãn</h4>
          <div class="tags">
            {#each product.tags as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>
      {/if}

      <!-- <div class="modal-actions">
        <a
          href="https://zalo.me/0"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-order"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z"/>
          </svg>
          Đặt hàng qua Zalo
        </a>
        <button class="btn-close-secondary" on:click={close}>Đóng</button>
      </div> -->
    </div>
  </div>
</div>

<style>
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(6px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  .overlay.visible {
    opacity: 1;
  }

  .modal {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 20px;
    max-width: 520px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    transform: translateY(30px) scale(0.97);
    transition:
      transform 0.25s ease,
      opacity 0.25s ease;
    opacity: 0;
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
  }

  .modal.visible {
    transform: translateY(0) scale(1);
    opacity: 1;
  }

  .close-btn {
    position: absolute;
    top: 14px;
    right: 14px;
    z-index: 10;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #fff;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.18s;
  }

  .close-btn:hover {
    background: rgba(220, 60, 60, 0.7);
  }

  .modal-image-wrap {
    width: 100%;
    max-height: 400px;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 20px 20px 0 0;
    overflow: hidden;
  }

  .modal-image-wrap img {
    max-width: 100%;
    max-height: 400px;
    width: auto;
    height: auto;
    object-fit: contain;
  }

  .modal-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.5rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.85);
    letter-spacing: 3px;
  }

  .cat-pill {
    position: absolute;
    bottom: 14px;
    left: 14px;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(6px);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .modal-body {
    padding: 22px 24px 26px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .modal-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }

  .modal-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
    line-height: 1.35;
    flex: 1;
  }

  .stock-badge {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 20px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .in-stock {
    background: rgba(74, 179, 100, 0.15);
    color: #4ab364;
    border: 1px solid rgba(74, 179, 100, 0.3);
  }
  .out-stock {
    background: rgba(220, 60, 60, 0.12);
    color: #dc3c3c;
    border: 1px solid rgba(220, 60, 60, 0.25);
  }

  .price-row {
    display: flex;
    align-items: baseline;
    gap: 6px;
  }

  .modal-price {
    font-size: 1.7rem;
    font-weight: 800;
    color: var(--accent);
  }

  .modal-unit {
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .section-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--text-muted);
    margin: 0;
  }

  .modal-desc {
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.65;
    margin: 0;
    white-space: pre-wrap;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .tag {
    font-size: 0.75rem;
    padding: 3px 10px;
    border-radius: 12px;
    background: var(--tag-bg);
    color: var(--text-muted);
    border: 1px solid var(--border);
  }

  .modal-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 6px;
  }

  .btn-order {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 11px 22px;
    background: var(--accent);
    color: #fff;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    font-family: inherit;
    transition:
      opacity 0.18s,
      transform 0.18s;
    flex: 1;
    justify-content: center;
  }

  .btn-order:hover {
    opacity: 0.88;
    transform: translateY(-1px);
  }

  .btn-close-secondary {
    padding: 11px 18px;
    border-radius: 10px;
    border: 1.5px solid var(--border);
    background: transparent;
    color: var(--text-secondary);
    font-size: 0.9rem;
    font-family: inherit;
    cursor: pointer;
    transition:
      border-color 0.18s,
      color 0.18s;
  }

  .btn-close-secondary:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  @media (max-width: 480px) {
    .modal-body {
      padding: 18px 18px 22px;
    }
    .modal-title {
      font-size: 1.2rem;
    }
    .modal-price {
      font-size: 1.4rem;
    }
  }
</style>
