import { emailService } from './emailService.js';

async function testEmailDelivery() {
  console.log('🧪 Testing email delivery with new logo...');
  
  try {
    const result = await emailService.sendVerificationEmail(999, 'test@thorx.live');
    console.log('✅ Email test result:', result);
  } catch (error) {
    console.error('❌ Email test failed:', error);
  }
}

testEmailDelivery();