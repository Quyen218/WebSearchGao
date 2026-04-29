import type { Product } from '../types';

const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRDo18sDQwvCHek9TDx-XhQexTXw7SF3GcLzYNAMufcg0BgZGj8byvDIc6TQZ0Rak6LGSXrSLU_4Ge_/pub?gid=0&single=true&output=csv';

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentField.trim());
      currentField = '';
    } else if ((char === '\n' || (char === '\r' && nextChar === '\n')) && !inQuotes) {
      if (char === '\r') i++;
      currentRow.push(currentField.trim());
      rows.push(currentRow);
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }

  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    rows.push(currentRow);
  }

  return rows;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(price);
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(SHEET_URL);
  if (!response.ok) throw new Error('Failed to fetch product data');

  const text = await response.text();
  const rows = parseCSV(text);

  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.toLowerCase().trim());

  const getIdx = (names: string[]): number => {
    for (const n of names) {
      const idx = headers.findIndex((h) => h.includes(n));
      if (idx !== -1) return idx;
    }
    return -1;
  };

  const idIdx = getIdx(['id', 'mã', 'ma']);
  const nameIdx = getIdx(['name', 'tên', 'ten', 'sản phẩm', 'san pham']);
  const priceIdx = getIdx(['price', 'giá', 'gia']);
  const categoryIdx = getIdx(['category', 'loại', 'loai', 'danh mục', 'danh muc']);
  const descIdx = getIdx(['desc', 'mô tả', 'mo ta', 'ghi chú', 'ghi chu', 'chi tiết']);
  const unitIdx = getIdx(['unit', 'đơn vị', 'don vi', 'dvt']);
  const imageIdx = getIdx(['linkimage', 'image', 'hình', 'hinh', 'ảnh', 'anh', 'img']);
  const tagsIdx = getIdx(['tag', 'nhãn', 'nhan']);
  const stockIdx = getIdx(['stock', 'tồn', 'ton', 'còn hàng', 'con hang']);
  const showIdx = getIdx(['showweb', 'show', 'hiển thị', 'hien thi', 'website']);

  const products: Product[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < 2 || !row[nameIdx >= 0 ? nameIdx : 0]) continue;

    const showwebsite =
      showIdx >= 0
        ? (row[showIdx] || '').toLowerCase().trim() === 'true'
        : true;

    if (!showwebsite) continue;

    const rawPrice = priceIdx >= 0 ? row[priceIdx] : '';
    const price = parseFloat(rawPrice.replace(/[^0-9.]/g, '')) || 0;

    const tagsRaw = tagsIdx >= 0 ? row[tagsIdx] : '';
    const tags = tagsRaw
      ? tagsRaw
        .split(/[,;|]/)
        .map((t) => t.trim())
        .filter(Boolean)
      : [];

    const inStockRaw = stockIdx >= 0 ? row[stockIdx] : 'true';
    const inStock = !['false', '0', 'no', 'hết', 'het', 'out'].includes(
      inStockRaw.toLowerCase().trim()
    );

    products.push({
      id: idIdx >= 0 ? row[idIdx] || String(i) : String(i),
      name: nameIdx >= 0 ? row[nameIdx] : row[0],
      price,
      priceFormatted: formatPrice(price),
      category: categoryIdx >= 0 ? row[categoryIdx] || 'Khác' : 'Khác',
      description: descIdx >= 0 ? row[descIdx] || '' : '',
      unit: unitIdx >= 0 ? row[unitIdx] || 'kg' : '',
      image: imageIdx >= 0 ? row[imageIdx] || '' : '',
      tags,
      inStock,
      showwebsite,
    });
  }

  return products;
}
