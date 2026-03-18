import dotenv from 'dotenv';
dotenv.config();

const testDirect = async () => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Say hello in 3 words' }] }]
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ API Key Works!');
      console.log('Response:', data.candidates[0].content.parts[0].text);
    } else {
      console.log('❌ Error:', data.error.message);
      console.log('\nTo fix:');
      console.log('1. Go to: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com');
      console.log('2. Click "Enable API"');
      console.log('3. Wait 2 minutes');
      console.log('4. Test again');
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
};

testDirect();
