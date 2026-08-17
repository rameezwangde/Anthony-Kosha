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

    const data = await response.json();
    
    if (data.status === 'success') {
      return res.status(200).json({ success: true });
    } else {
      throw new Error(data.message || 'Unknown error from Google Apps Script');
    }

  } catch (error) {
    console.error('Error sending data to Google Sheets:', error);
    return res.status(500).json({ error: 'Failed to send data to Google Sheets' });
  }
}
