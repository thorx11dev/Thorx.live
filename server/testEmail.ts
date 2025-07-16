import nodemailer from 'nodemailer';

// Test email configuration
const testEmailConfig = {
  host: 'mail.privateemail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'support@thorx.live',
    pass: process.env.EMAIL_APP_PASSWORD || 'missing-password'
  },
  tls: {
    rejectUnauthorized: false
  }
};

async function testEmailDelivery() {
  console.log('🧪 Testing email configuration...');
  console.log('Host:', testEmailConfig.host);
  console.log('Port:', testEmailConfig.port);
  console.log('User:', testEmailConfig.auth.user);
  console.log('Password exists:', !!testEmailConfig.auth.pass);
  
  try {
    const transporter = nodemailer.createTransport(testEmailConfig);
    
    // Test connection
    console.log('🔄 Testing SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!');
    
    // Test email sending
    console.log('📧 Sending test email...');
    const result = await transporter.sendMail({
      from: {
        name: 'Thorx Test',
        address: 'support@thorx.live'
      },
      to: 'aonimran.dev@gmail.com',
      subject: 'Thorx Email Test - ' + new Date().toISOString(),
      html: '<h1>Test Email</h1><p>This is a test email from Thorx to verify email delivery.</p>',
      text: 'Test Email - This is a test email from Thorx to verify email delivery.'
    });
    
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', result.messageId);
    console.log('Response:', result.response);
    
  } catch (error) {
    console.error('❌ Email test failed:', error);
    console.error('Error details:', error.message);
  }
}

testEmailDelivery();