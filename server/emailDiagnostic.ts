import nodemailer from 'nodemailer';
import { emailService } from './emailService.js';
import { emailAvatarService } from './emailAvatarService.js';

async function runEmailDiagnostic() {
  console.log('🔍 Starting comprehensive email diagnostic...\n');
  
  // Test 1: Basic SMTP connection
  console.log('Test 1: SMTP Connection Test');
  try {
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
    
    await transporter.verify();
    console.log('✅ SMTP connection successful\n');
  } catch (error) {
    console.error('❌ SMTP connection failed:', error);
    return;
  }
  
  // Test 2: Avatar service
  console.log('Test 2: Avatar Service Test');
  const logoBase64 = emailAvatarService.getLogoBase64();
  const avatarConfig = emailAvatarService.getAvatarConfig();
  console.log('Logo loaded:', logoBase64 ? '✅ Yes' : '❌ No');
  console.log('Avatar config:', avatarConfig ? '✅ Valid' : '❌ Invalid\n');
  
  // Test 3: Simple email send
  console.log('Test 3: Simple Email Send');
  try {
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
    
    const result = await transporter.sendMail({
      from: '"Thorx" <support@thorx.live>',
      to: 'support@thorx.live',
      subject: 'Diagnostic Test Email',
      text: 'This is a diagnostic test email.',
      html: '<p>This is a diagnostic test email.</p>'
    });
    
    console.log('✅ Simple email sent successfully:', result.messageId);
  } catch (error) {
    console.error('❌ Simple email send failed:', error);
  }
  
  // Test 4: Full verification email
  console.log('\nTest 4: Full Verification Email');
  try {
    const result = await emailService.sendVerificationEmail(999, 'diagnostic@thorx.live');
    console.log('Verification email result:', result ? '✅ Success' : '❌ Failed');
  } catch (error) {
    console.error('❌ Verification email failed:', error);
  }
  
  console.log('\n🔍 Diagnostic complete');
}

runEmailDiagnostic();