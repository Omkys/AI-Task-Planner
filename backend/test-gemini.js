import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

console.log('Testing Gemini API Key...\n');
console.log('API Key:', process.env.GEMINI_API_KEY ? '✓ Found' : '✗ Missing');

const testAPI = async () => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    console.log('\nSending test request...');
    const result = await model.generateContent('Say "API is working" in 3 words');
    const response = result.response.text();
    
    console.log('✅ API Response:', response);
    console.log('\n✅ Gemini API is working correctly!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ API Error:', error.message);
    console.error('\nPossible issues:');
    console.error('1. Invalid API key');
    console.error('2. API key not enabled for Gemini');
    console.error('3. Network/firewall blocking Google APIs');
    console.error('4. Rate limit exceeded');
    process.exit(1);
  }
};

testAPI();
