const REQUIRED_FIELDS = ['name', 'phone', 'area', 'date', 'readyBy'];
const PRICE_BY_SIZE = {
  '1–2BR': 140,
  '3BR': 180,
  '4BR': 220,
  '5BR+': 280,
};

function clean(value) {
  return String(value || '').trim().slice(0, 500);
}

function buildSummary(payload) {
  const bedrooms = clean(payload.bedrooms) || '1–2BR';
  const basePrice = PRICE_BY_SIZE[bedrooms] || PRICE_BY_SIZE['1–2BR'];
  const lines = [
    `AUSTIN TURNOVER DISPATCH — ${clean(payload.area)}`,
    `Date: ${clean(payload.date)} | Checkout: ${clean(payload.checkout) || 'TBD'} | Guest-ready by: ${clean(payload.readyBy)}`,
    `Home: ${bedrooms} | Starting payout/quote: $${basePrice}+`,
    `Decision maker: ${clean(payload.decisionMaker) || 'Host / owner'} (${clean(payload.name)}, ${clean(payload.phone)})`,
    `Email: ${clean(payload.email) || 'Not provided'}`,
    `Scope notes: ${clean(payload.notes) || 'Standard turnover: reset beds, clean kitchen/baths, restock basics, send photo proof.'}`,
    'Confirm only if you can commit to the exact window. Access details are shared after host approval.',
  ];
  return lines.join('\n');
}

export async function onRequestPost(context) {
  let payload;

  try {
    payload = await context.request.json();
  } catch {
    return Response.json({ error: 'Send a valid JSON dispatch request.' }, { status: 400 });
  }

  const missing = REQUIRED_FIELDS.filter((field) => !clean(payload[field]));
  if (missing.length) {
    return Response.json({ error: `Missing required fields: ${missing.join(', ')}` }, { status: 400 });
  }

  return Response.json({
    ok: true,
    summary: buildSummary(payload),
    nextSteps: [
      'Text the packet to the vetted cleaner roster.',
      'Copy the packet into Taskrabbit or Angi-style quote requests.',
      'Post the public-safe version to Facebook Marketplace cleaning groups.',
      'Share access details only after the decision maker approves the cleaner.',
    ],
  });
}

export async function onRequestGet() {
  return Response.json({ ok: true, message: 'POST a turnover request to create a dispatch packet.' });
}
