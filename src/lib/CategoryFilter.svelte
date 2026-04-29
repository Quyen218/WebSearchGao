<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let categories: string[] = [];
  export let selected: string = 'all';

  const dispatch = createEventDispatcher();
</script>

<div class="category-filter">
  <button
    class="cat-btn"
    class:active={selected === 'all'}
    on:click={() => dispatch('change', 'all')}
  >
    Tất cả
  </button>
  {#each categories as cat}
    <button
      class="cat-btn"
      class:active={selected === cat}
      on:click={() => dispatch('change', cat)}
    >
      {cat}
    </button>
  {/each}
</div>

<style>
  .category-filter {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    padding: 0 4px;
  }

  .cat-btn {
    padding: 7px 16px;
    border-radius: 20px;
    border: 1.5px solid var(--border);
    background: transparent;
    color: var(--text-muted);
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.18s ease;
    font-family: inherit;
    white-space: nowrap;
  }

  .cat-btn:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  .cat-btn.active {
    background: var(--accent);
    border-color: var(--accent);
    color: #fff;
    font-weight: 600;
  }
</style>
