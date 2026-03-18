import dotenv from 'dotenv';
dotenv.config();

const testModels = async () => {
  const models = [
    'gemini-pro',
    'gemini-1.5-pro',
    'gemini-1.5-flash',
    'gemini-1.0-pro'
  ];

  for (const modelName of models) {
    try {
      console.log(`\nTesting ${modelName}...`);
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'Hello' }] }]
          })
        }
      );
      
      if (response.ok) {
        console.log(`✅ ${modelName} works!`);
        const data = await response.json();
        console.log('Response:', data.candidates[0].content.parts[0].text);
        return modelName;
      } else {
        console.log(`❌ ${modelName} failed: ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ ${modelName} error:`, error.message);
    }
  }
  
  console.log('\n❌ No working models found. API key may be invalid.');
};

testModels();
