import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

interface EmailVerificationData {
  userId: number;
  email: string;
  token: string;
  expiresAt: Date;
}

interface EmailConfig {
  service: string;
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

/**
 * Development Email Service for Thorx
 * Uses console logging instead of actual email sending for development
 */
export class DevelopmentEmailService {
  private verificationTokens: Map<string, EmailVerificationData> = new Map();
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'thorx-email-verification-secret-key';
  private readonly VERIFICATION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  constructor() {
    console.log('📧 Development Email Service initialized - emails will be logged to console');
  }

  /**
   * Generate secure verification token with JWT
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
   * Verify JWT token and extract user data
   */
  private verifyToken(token: string): { userId: number; email: string } | null {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET, {
        issuer: 'thorx-platform',
        audience: 'thorx-users'
      }) as any;

      if (decoded.type !== 'email_verification') {
        return null;
      }

      return {
        userId: decoded.userId,
        email: decoded.email
      };
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }

  /**
   * Generate professional HTML email template with Thorx branding
   */
  private generateEmailTemplate(email: string, verificationLink: string): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Thorx Account</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #1e293b; }
        .container { max-width: 600px; margin: 0 auto; background-color: #334155; border-radius: 10px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 30px; text-align: center; }
        .logo { font-size: 32px; font-weight: bold; color: white; margin-bottom: 10px; }
        .content { padding: 40px 30px; color: #e2e8f0; }
        .button { display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
        .footer { background-color: #1e293b; padding: 20px; text-align: center; color: #94a3b8; font-size: 14px; }
        .features { background-color: #475569; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .feature-item { display: flex; align-items: center; margin: 10px 0; }
        .feature-icon { width: 20px; height: 20px; margin-right: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">⚡ Thorx</div>
          <p style="color: #e2e8f0; margin: 0;">Navigate the digital universe with confidence</p>
        </div>
        
        <div class="content">
          <h2 style="color: #f1f5f9; margin-bottom: 20px;">Welcome to Thorx!</h2>
          
          <p>Thank you for joining Thorx, the premier platform for digital earning opportunities. To unlock all features and start your cosmic journey, please verify your email address.</p>
          
          <div class="features">
            <h3 style="color: #f1f5f9; margin-top: 0;">What you'll unlock:</h3>
            <div class="feature-item">
              <span class="feature-icon">🚀</span>
              <span>Access to Ads Cosmos, Social Cosmos, and Site Cosmos</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">💰</span>
              <span>Real-time earnings tracking and analytics</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🔒</span>
              <span>Secure payout system with JazzCash integration</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">📊</span>
              <span>Performance optimization tools and insights</span>
            </div>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" class="button">Verify Your Email and Unlock Thorx</a>
          </div>
          
          <p style="color: #94a3b8; font-size: 14px; margin-top: 30px;">
            This verification link will expire in 24 hours for security purposes. 
            If you didn't create a Thorx account, you can safely ignore this email.
          </p>
          
          <p style="color: #94a3b8; font-size: 14px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${verificationLink}" style="color: #60a5fa; word-break: break-all;">${verificationLink}</a>
          </p>
        </div>
        
        <div class="footer">
          <p><strong>Thorx Team</strong></p>
          <p>Digital Universe • Earning Platform • Secure Payouts</p>
          <p>Need help? Contact us at <a href="mailto:support@thorx.live" style="color: #60a5fa;">support@thorx.live</a></p>
        </div>
      </div>
    </body>
    </html>
    `;
  }

  /**
   * Send verification email to user (development version - logs to console)
   */
  async sendVerificationEmail(userId: number, email: string): Promise<boolean> {
    try {
      const token = this.generateVerificationToken(userId, email);
      
      // Store token for verification
      this.verificationTokens.set(token, {
        userId,
        email,
        token,
        expiresAt: new Date(Date.now() + this.VERIFICATION_EXPIRY)
      });

      // Development: Create verification link
      const verificationLink = `${process.env.FRONTEND_URL || 'http://localhost:5000'}/verify-email?token=${token}`;
      
      // Generate email template
      const emailTemplate = this.generateEmailTemplate(email, verificationLink);
      
      // Log email to console instead of sending
      console.log('\n📧 ==================== EMAIL VERIFICATION ====================');
      console.log(`📧 TO: ${email}`);
      console.log(`📧 FROM: Thorx Support <support@thorx.live>`);
      console.log(`📧 SUBJECT: Verify Your Thorx Account - Unlock Digital Universe`);
      console.log(`📧 VERIFICATION LINK: ${verificationLink}`);
      console.log(`📧 TOKEN: ${token}`);
      console.log(`📧 EXPIRES: ${new Date(Date.now() + this.VERIFICATION_EXPIRY).toLocaleString()}`);
      console.log('📧 ============================================================\n');
      
      // In development, also log the HTML template for inspection
      if (process.env.NODE_ENV === 'development') {
        console.log('📧 HTML TEMPLATE:');
        console.log(emailTemplate);
        console.log('📧 ============================================================\n');
      }

      return true;
    } catch (error) {
      console.error('Development email service error:', error);
      return false;
    }
  }

  /**
   * Verify email token and return user data
   */
  async verifyEmailToken(token: string): Promise<{ success: boolean; userId?: number; email?: string; error?: string }> {
    try {
      // Check if token exists in our map
      const storedToken = this.verificationTokens.get(token);
      
      if (!storedToken) {
        // Try to verify JWT directly
        const decoded = this.verifyToken(token);
        if (!decoded) {
          return {
            success: false,
            error: 'Invalid or expired verification token'
          };
        }
        
        return {
          success: true,
          userId: decoded.userId,
          email: decoded.email
        };
      }

      // Check if token is expired
      if (storedToken.expiresAt < new Date()) {
        this.verificationTokens.delete(token);
        return {
          success: false,
          error: 'Verification token has expired. Please request a new one.'
        };
      }

      // Remove token after successful verification (single-use)
      this.verificationTokens.delete(token);

      console.log(`✅ Email verification successful for user ${storedToken.userId} (${storedToken.email})`);

      return {
        success: true,
        userId: storedToken.userId,
        email: storedToken.email
      };

    } catch (error) {
      console.error('Email verification error:', error);
      return {
        success: false,
        error: 'Token verification failed'
      };
    }
  }

  /**
   * Clean up expired tokens (should be called periodically)
   */
  cleanupExpiredTokens(): void {
    const now = new Date();
    for (const [token, data] of this.verificationTokens.entries()) {
      if (data.expiresAt < now) {
        this.verificationTokens.delete(token);
      }
    }
  }

  /**
   * Resend verification email
   */
  async resendVerificationEmail(userId: number, email: string): Promise<boolean> {
    console.log(`📧 Resending verification email to ${email} (User ID: ${userId})`);
    return this.sendVerificationEmail(userId, email);
  }
}

export const developmentEmailService = new DevelopmentEmailService();