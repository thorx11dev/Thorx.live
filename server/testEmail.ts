import { emailService } from './emailService.js';

async function testEmailDelivery() {
  console.log('🧪 Testing Thorx email verification system...');
  
  try {
    // Test with a real email address
    const result = await emailService.sendVerificationEmail(999, 'sh.ie.cl.air.ee@gmail.com');
    console.log('✅ Email verification test result:', result);
    
    if (result) {
      console.log('📧 Verification email sent successfully with Thorx logo branding!');
    } else {
      console.log('❌ Email verification failed - checking configuration...');
    }
  } catch (error) {
    console.error('❌ Email verification test failed:', error);
  }
}

testEmailDelivery();