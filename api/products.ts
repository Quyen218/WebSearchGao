import type { VercelRequest, VercelResponse } from '@vercel/node';

const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRDo18sDQwvCHek9TDx-XhQexTXw7SF3GcLzYNAMufcg0BgZGj8byvDIc6TQZ0Rak6LGSXrSLU_4Ge_/pub?gid=0&single=true&output=csv';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow CORS from any origin (our own frontend)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60'); // Cache 5 phút

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const response = await fetch(SHEET_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    if (!response.ok) {
      return res.status(502).json({ error: 'Failed to fetch spreadsheet data' });
    }

    const csvText = await response.text();
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    return res.status(200).send(csvText);
  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
