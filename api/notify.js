import admin from 'firebase-admin';

// Vercel Environment Variables für Sicherheit nutzen!
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { title, body } = req.body;
  const db = admin.firestore();
  
  try {
    // Hole alle gespeicherten Tokens
    const tokensSnapshot = await db.collection('push_tokens').get();
    const tokens = tokensSnapshot.docs.map(doc => doc.data().token);

    if (tokens.length > 0) {
      const message = {
        notification: { title, body },
        tokens: tokens,
      };
      
      await admin.messaging().sendMulticast(message);
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
