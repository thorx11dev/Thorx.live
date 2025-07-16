import { emailService } from './emailService';

async function testEmailConnection() {
  console.log('🔍 Testing email service connection and delivery...');
  
  try {
    // Test email connection
    const testResult = await emailService.sendVerificationEmail(999, 'test@example.com');
    
    if (testResult) {
      console.log('✅ Email service connection successful');
      console.log('📧 Test email sent to test@example.com');
    } else {
      console.log('❌ Email service connection failed');
    }
    
    // Test with a real email to verify delivery
    console.log('\n🔍 Testing with a real email address...');
    const realTestResult = await emailService.sendVerificationEmail(998, 'support@thorx.live');
    
    if (realTestResult) {
      console.log('✅ Real email test successful');
      console.log('📧 Test email sent to support@thorx.live');
    } else {
      console.log('❌ Real email test failed');
    }
    
  } catch (error) {
    console.error('❌ Email service error:', error);
  }
}

// Run the test
testEmailConnection();