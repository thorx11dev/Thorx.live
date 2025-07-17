import nodemailer from 'nodemailer';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

interface EmailVerificationData {
  userId: number;
  email: string;
  token: string;
  expiresAt: Date;
}

/**
 * Production-Ready Email Service for Thorx
 * Handles reliable email delivery with comprehensive error handling
 */
export class ProductionEmailService {
  private transporter: nodemailer.Transporter;
  private verificationTokens: Map<string, EmailVerificationData> = new Map();
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'thorx-email-verification-secret-key';
  private readonly VERIFICATION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  constructor() {
    this.initializeTransporter();
  }

  /**
   * Initialize email transporter with production-ready configuration
   */
  private initializeTransporter(): void {
    this.transporter = nodemailer.createTransport({
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
      },
      pool: false, // Disable pooling for reliability
      connectionTimeout: 20000, // 20 second timeout
      greetingTimeout: 20000,
      socketTimeout: 30000,
      debug: false
    });
    
    console.log('📧 Production email service initialized');
  }

  /**
   * Generate secure verification token
   */
  private generateVerificationToken(userId: number, email: string): string {
    const payload = {
      userId,
      email,
      type: 'email_verification',
      timestamp: Date.now(),
      nonce: crypto.randomBytes(16).toString('hex')
    };

    return jwt.sign(payload, this.JWT_SECRET, { 
      expiresIn: '24h',
      issuer: 'thorx-platform',
      audience: 'thorx-users'
    });
  }

  /**
   * Generate professional email template
   */
  private generateEmailTemplate(email: string, verificationLink: string): string {
    const logoBase64 = this.getThorxLogoBase64();
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Thorx Account</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #0f172a; color: #e2e8f0;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
    
    <!-- Header with Logo -->
    <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); text-align: center; padding: 40px 20px;">
      ${logoBase64 ? `
        <img src="data:image/jpeg;base64,${logoBase64}" 
             alt="Thorx Logo" 
             style="width: 160px; height: auto; max-width: 100%; border-radius: 16px; margin-bottom: 20px;" />
      ` : `
        <div style="font-size: 48px; font-weight: 800; color: #e2e8f0; margin-bottom: 20px;">THORX</div>
      `}
      <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #e2e8f0;">Welcome to Thorx!</h1>
      <p style="margin: 10px 0 0; font-size: 16px; color: #94a3b8;">Your cosmic journey begins here</p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 30px;">
      <p style="font-size: 16px; line-height: 1.6; color: #e2e8f0; margin-bottom: 25px;">
        Thank you for joining Thorx! To complete your registration and start exploring the digital universe, please verify your email address.
      </p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationLink}" 
           style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px; box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);">
          Verify Email Address
        </a>
      </div>
      
      <p style="font-size: 14px; color: #94a3b8; margin-top: 25px;">
        If the button doesn't work, copy and paste this link into your browser:
      </p>
      <p style="font-size: 14px; color: #60a5fa; word-break: break-all; margin-top: 10px;">
        ${verificationLink}
      </p>
      
      <div style="background-color: #334155; border-radius: 12px; padding: 20px; margin: 30px 0;">
        <p style="font-size: 14px; color: #e2e8f0; margin: 0; text-align: center;">
          <strong>🚀 Ready to start earning?</strong><br>
          Once verified, you'll have access to all Thorx features and earning opportunities.
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #0f172a; padding: 30px; text-align: center;">
      <p style="font-size: 14px; color: #64748b; margin: 0 0 10px;">
        This verification link expires in 24 hours for security.
      </p>
      <p style="font-size: 12px; color: #475569; margin: 0;">
        © 2025 Thorx. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>`;
  }

  /**
   * Get Thorx logo as base64
   */
  private getThorxLogoBase64(): string {
    try {
      const fs = eval('require')('fs');
      const path = eval('require')('path');
      const logoPath = path.join(process.cwd(), 'attached_assets/WhatsApp Image 2025-07-14 at 11.14.27_2d89cec2_1752689411906.jpg');
      const logoBuffer = fs.readFileSync(logoPath);
      return logoBuffer.toString('base64');
    } catch (error) {
      console.error('Error loading logo:', error);
      return '';
    }
  }

  /**
   * Send verification email with comprehensive error handling
   */
  async sendVerificationEmail(userId: number, email: string): Promise<{ success: boolean; message: string; messageId?: string }> {
    try {
      console.log(`📧 Sending verification email to: ${email}`);
      
      // Generate verification token
      const token = this.generateVerificationToken(userId, email);
      
      // Store token data
      const verificationData: EmailVerificationData = {
        userId,
        email,
        token,
        expiresAt: new Date(Date.now() + this.VERIFICATION_EXPIRY)
      };
      this.verificationTokens.set(token, verificationData);
      
      // Generate verification link
      const baseUrl = process.env.REPLIT_DOMAIN ? 
        `https://${process.env.REPLIT_DOMAIN}` : 
        'http://localhost:5000';
      const verificationLink = `${baseUrl}/api/auth/verify-email?token=${token}`;
      
      // Generate email content
      const htmlContent = this.generateEmailTemplate(email, verificationLink);
      
      // Mail options
      const mailOptions = {
        from: '"Thorx Platform" <support@thorx.live>',
        to: email,
        subject: 'Verify Your Thorx Account - Welcome!',
        html: htmlContent,
        text: `Welcome to Thorx! Please verify your email address by clicking this link: ${verificationLink}`,
        priority: 'high' as const,
        headers: {
          'X-Priority': '1',
          'X-MSMail-Priority': 'High',
          'Importance': 'high',
          'X-Mailer': 'Thorx Platform',
          'X-Entity-Ref-ID': 'thorx-verification-email'
        }
      };
      
      // Send email with timeout
      const startTime = Date.now();
      const result = await Promise.race([
        this.transporter.sendMail(mailOptions),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Email timeout after 30 seconds')), 30000)
        )
      ]) as any;
      
      const duration = Date.now() - startTime;
      console.log(`✅ Verification email sent successfully to ${email} in ${duration}ms`);
      
      return {
        success: true,
        message: 'Verification email sent successfully',
        messageId: result.messageId
      };
      
    } catch (error: any) {
      console.error('❌ Failed to send verification email:', error);
      
      // Provide specific error messages
      let errorMessage = 'Failed to send verification email';
      if (error.code === 'EENVELOPE') {
        errorMessage = 'Invalid recipient email address';
      } else if (error.code === 'EAUTH') {
        errorMessage = 'Email authentication failed';
      } else if (error.code === 'ECONNECTION') {
        errorMessage = 'Email server connection failed';
      }
      
      return {
        success: false,
        message: errorMessage
      };
    }
  }

  /**
   * Verify email token
   */
  async verifyEmailToken(token: string): Promise<{ success: boolean; userId?: number; email?: string; error?: string }> {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET, {
        issuer: 'thorx-platform',
        audience: 'thorx-users'
      }) as any;

      if (decoded.type !== 'email_verification') {
        return { success: false, error: 'Invalid token type' };
      }

      const verificationData = this.verificationTokens.get(token);
      if (!verificationData) {
        return { success: false, error: 'Token not found or expired' };
      }

      if (verificationData.expiresAt < new Date()) {
        this.verificationTokens.delete(token);
        return { success: false, error: 'Token expired' };
      }

      // Clean up used token
      this.verificationTokens.delete(token);

      return {
        success: true,
        userId: decoded.userId,
        email: decoded.email
      };
    } catch (error) {
      console.error('Token verification error:', error);
      return { success: false, error: 'Invalid token' };
    }
  }

  /**
   * Clean up expired tokens
   */
  cleanupExpiredTokens(): void {
    const now = new Date();
    for (const [token, data] of this.verificationTokens.entries()) {
      if (data.expiresAt < now) {
        this.verificationTokens.delete(token);
      }
    }
  }
}

export const productionEmailService = new ProductionEmailService();