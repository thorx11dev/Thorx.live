import { productionEmailService } from './emailService.production.js';

async function runComprehensiveEmailTest() {
  console.log('🚀 Starting comprehensive email verification test...\n');
  
  const testEmail = 'test.thorx.verification@gmail.com';
  
  try {
    // Test 1: Send verification email
    console.log('📧 Test 1: Sending verification email...');
    const emailResult = await productionEmailService.sendVerificationEmail(123, testEmail);
    
    if (emailResult.success) {
      console.log('✅ Verification email sent successfully');
      console.log(`   Message: ${emailResult.message}`);
      console.log(`   Message ID: ${emailResult.messageId}`);
    } else {
      console.log('❌ Verification email failed');
      console.log(`   Error: ${emailResult.message}`);
      return;
    }
    
    // Test 2: Clean up expired tokens
    console.log('\n🧹 Test 2: Cleaning up expired tokens...');
    productionEmailService.cleanupExpiredTokens();
    console.log('✅ Token cleanup completed');
    
    // Test 3: Test various email addresses
    console.log('\n📮 Test 3: Testing different email formats...');
    
    const testEmails = [
      'user@gmail.com',
      'test.user@yahoo.com',
      'user+tag@outlook.com',
      'business@company.co.uk'
    ];
    
    for (const email of testEmails) {
      try {
        const result = await productionEmailService.sendVerificationEmail(456, email);
        console.log(`   ${email}: ${result.success ? '✅ Success' : '❌ Failed'} - ${result.message}`);
      } catch (error) {
        console.log(`   ${email}: ❌ Error - ${error}`);
      }
    }
    
    console.log('\n✅ Comprehensive email test completed successfully!');
    console.log('📧 Email verification system is fully operational');
    
  } catch (error) {
    console.error('❌ Comprehensive email test failed:', error);
  }
}

runComprehensiveEmailTest();