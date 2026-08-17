export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.error('GOOGLE_SHEETS_WEBHOOK_URL is not defined in environment variables.');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script responded with ${response.status}`);
    }

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.log('Non-JSON response from GAS:', text);
      // If it's not JSON, but the request didn't throw a 404/500, we can assume it might have worked
      // (GAS sometimes returns HTML on redirects)
      return res.status(200).json({ success: true, note: 'Received non-JSON response' });
    }
    
    if (data.status === 'success') {
      return res.status(200).json({ success: true });
    } else {
      throw new Error(data.message || 'Unknown error from Google Apps Script');
    }

  } catch (error) {
    console.error('Error sending data to Google Sheets:', error);
    return res.status(500).json({ error: 'Failed to send data to Google Sheets', details: error.message || error.toString() });
  }
}
