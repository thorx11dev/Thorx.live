import nodemailer from 'nodemailer';

async function testEmailConnection() {
  const transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'support@thorx.live',
      pass: process.env.EMAIL_APP_PASSWORD
    },
    tls: {
      rejectUnauthorized: false,
      ciphers: 'SSLv3'
    }
  });

  try {
    console.log('🔍 Testing email server connection...');
    await transporter.verify();
    console.log('✅ Email server connection successful!');
    
    // Test sending a simple email
    const result = await transporter.sendMail({
      from: '"Thorx" <support@thorx.live>',
      to: 'support@thorx.live',
      subject: 'Test Email Connection',
      text: 'This is a test email to verify the connection.'
    });
    
    console.log('✅ Test email sent successfully:', result.messageId);
  } catch (error) {
    console.error('❌ Email connection failed:', error);
  }
}

testEmailConnection();