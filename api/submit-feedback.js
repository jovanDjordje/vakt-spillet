export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { year, stress_final, time_wasted, feedback } = req.body;

  if (!feedback || !feedback.trim()) {
    return res.status(400).json({ error: 'Feedback is required' });
  }

  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/vakt_feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': process.env.SUPABASE_KEY,
      'Authorization': `Bearer ${process.env.SUPABASE_KEY}`,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({
      year,
      stress_final,
      time_wasted,
      feedback: feedback.trim()
    })
  });

  if (!response.ok) {
    const err = await response.text();
    console.error('Supabase error:', err);
    return res.status(500).json({ error: 'Failed to save feedback' });
  }

  return res.status(200).json({ ok: true });
}
