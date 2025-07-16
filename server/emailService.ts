import nodemailer from 'nodemailer';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

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
 * Comprehensive Email Verification Service for Thorx
 * Handles secure email verification with JWT tokens and professional branding
 */
export class EmailService {
  private transporter: nodemailer.Transporter;
  private verificationTokens: Map<string, EmailVerificationData> = new Map();
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'thorx-email-verification-secret-key';
  private readonly VERIFICATION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  constructor() {
    this.initializeTransporter();
  }

  /**
   * Initialize email transporter with environment configuration
   */
  private initializeTransporter(): void {
    const emailConfig = {
      host: process.env.EMAIL_HOST || 'mail.privateemail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER || 'support@thorx.live',
        pass: process.env.EMAIL_APP_PASSWORD || process.env.EMAIL_PASS || 'your-password'
      },
      tls: {
        rejectUnauthorized: false // Accept self-signed certificates
      },
      // Optimization settings for faster email delivery
      pool: true, // Use connection pooling
      maxConnections: 5, // Maximum concurrent connections
      maxMessages: 100, // Maximum messages per connection
      rateLimit: 10, // Send up to 10 messages per second
      connectionTimeout: 2000, // 2 second connection timeout
      greetingTimeout: 2000, // 2 second greeting timeout
      socketTimeout: 5000, // 5 second socket timeout
    };

    this.transporter = nodemailer.createTransport(emailConfig);
    
    // Log configuration for debugging (without password)
    console.log('📧 Email service configuration:', {
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.secure,
      user: emailConfig.auth.user
    });
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
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #334155;
            background-color: #f8fafc;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="stars" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23stars)"/></svg>');
            opacity: 0.3;
        }
        
        .logo {
            width: 80px;
            height: 80px;
            margin: 0 auto 20px;
            background: #475569;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 1;
        }
        
        .logo-shape {
            width: 40px;
            height: 40px;
            background: #e2e8f0;
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        
        .brand-name {
            font-size: 32px;
            font-weight: 700;
            color: #e2e8f0;
            margin-bottom: 8px;
            position: relative;
            z-index: 1;
        }
        
        .tagline {
            font-size: 16px;
            color: #94a3b8;
            position: relative;
            z-index: 1;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .welcome-title {
            font-size: 24px;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .welcome-message {
            font-size: 16px;
            color: #64748b;
            margin-bottom: 30px;
            text-align: center;
            line-height: 1.7;
        }
        
        .benefits-list {
            background: #f8fafc;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 30px;
        }
        
        .benefits-title {
            font-size: 18px;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 15px;
        }
        
        .benefit-item {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            font-size: 14px;
            color: #475569;
        }
        
        .benefit-icon {
            width: 20px;
            height: 20px;
            background: #10b981;
            border-radius: 50%;
            margin-right: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }
        
        .cta-container {
            text-align: center;
            margin: 30px 0;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1);
        }
        
        .verification-note {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 6px;
            padding: 15px;
            margin: 20px 0;
            font-size: 14px;
            color: #92400e;
        }
        
        .footer {
            background: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        
        .footer-text {
            font-size: 14px;
            color: #64748b;
            margin-bottom: 15px;
        }
        
        .footer-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-bottom: 15px;
        }
        
        .footer-link {
            color: #3b82f6;
            text-decoration: none;
            font-size: 14px;
        }
        
        .footer-link:hover {
            text-decoration: underline;
        }
        
        .support-info {
            font-size: 12px;
            color: #94a3b8;
        }
        
        @media (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 8px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .footer {
                padding: 20px;
            }
            
            .footer-links {
                flex-direction: column;
                gap: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">
                <div class="logo-shape"></div>
            </div>
            <h1 class="brand-name">Thorx</h1>
            <p class="tagline">Navigate the digital universe with confidence</p>
        </div>
        
        <div class="content">
            <h1 class="welcome-title">Welcome to the Cosmic Revolution!</h1>
            
            <p class="welcome-message">
                Thank you for joining Thorx, the premier platform for digital earning and cosmic exploration. 
                To unlock the full potential of your account and access all our incredible features, 
                please verify your email address.
            </p>
            
            <div class="benefits-list">
                <h3 class="benefits-title">What awaits you after verification:</h3>
                <div class="benefit-item">
                    <div class="benefit-icon">✓</div>
                    <span>Access to Ads Cosmos, Social Cosmos, and Site Cosmos earning opportunities</span>
                </div>
                <div class="benefit-item">
                    <div class="benefit-icon">✓</div>
                    <span>Real-time earnings tracking and performance analytics</span>
                </div>
                <div class="benefit-item">
                    <div class="benefit-icon">✓</div>
                    <span>Secure payout system with JazzCash integration</span>
                </div>
                <div class="benefit-item">
                    <div class="benefit-icon">✓</div>
                    <span>Join our thriving community of digital earners</span>
                </div>
            </div>
            
            <div class="cta-container">
                <a href="${verificationLink}" class="cta-button">
                    Verify Your Email and Unlock Thorx
                </a>
            </div>
            
            <div class="verification-note">
                <strong>Important:</strong> This verification link is valid for 24 hours and can only be used once. 
                If you didn't create a Thorx account, please ignore this email.
            </div>
        </div>
        
        <div class="footer">
            <p class="footer-text">
                Need help? We're here to support your cosmic journey.
            </p>
            
            <div class="footer-links">
                <a href="mailto:support@thorx.live" class="footer-link">Contact Support</a>
                <a href="https://thorx.live/help" class="footer-link">Help Center</a>
                <a href="https://thorx.live/privacy" class="footer-link">Privacy Policy</a>
            </div>
            
            <p class="support-info">
                © 2025 Thorx Platform. All rights reserved.<br>
                Email: support@thorx.live | WhatsApp: +1-234-567-8900
            </p>
        </div>
    </div>
</body>
</html>`;
  }

  /**
   * Send verification email to user
   */
  async sendVerificationEmail(userId: number, email: string): Promise<boolean> {
    try {
      const token = this.generateVerificationToken(userId, email);
      const verificationLink = `${process.env.CLIENT_URL || 'http://localhost:5000'}/api/auth/verify-email?token=${token}`;
      
      // Store token data for validation
      this.verificationTokens.set(token, {
        userId,
        email,
        token,
        expiresAt: new Date(Date.now() + this.VERIFICATION_EXPIRY)
      });

      const htmlContent = this.generateEmailTemplate(email, verificationLink);

      const mailOptions = {
        from: {
          name: 'Thorx Platform',
          address: process.env.EMAIL_USER || 'support@thorx.live'
        },
        to: email,
        subject: 'Verify Your Thorx Account - Unlock the Digital Universe',
        html: htmlContent,
        text: `Welcome to Thorx! Please verify your email address by clicking this link: ${verificationLink}`,
        priority: 'high', // Set high priority for faster delivery
        headers: {
          'X-Priority': '1',
          'X-MSMail-Priority': 'High',
          'Importance': 'high'
        }
      };

      // Use Promise.race to timeout after 5 seconds for speed optimization
      const emailPromise = this.transporter.sendMail(mailOptions);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Email timeout')), 5000)
      );

      await Promise.race([emailPromise, timeoutPromise]);
      return true;
    } catch (error) {
      console.error('Error sending verification email:', error);
      return false;
    }
  }

  /**
   * Verify email token and return user data
   */
  async verifyEmailToken(token: string): Promise<{ success: boolean; userId?: number; email?: string; error?: string }> {
    try {
      // Check if token exists in our store
      const tokenData = this.verificationTokens.get(token);
      if (!tokenData) {
        return { success: false, error: 'Invalid or expired verification token' };
      }

      // Check if token has expired
      if (new Date() > tokenData.expiresAt) {
        this.verificationTokens.delete(token);
        return { success: false, error: 'Verification token has expired' };
      }

      // Verify JWT token
      const decoded = this.verifyToken(token);
      if (!decoded) {
        this.verificationTokens.delete(token);
        return { success: false, error: 'Invalid token signature' };
      }

      // Token is valid - remove from store (single use)
      this.verificationTokens.delete(token);

      return {
        success: true,
        userId: decoded.userId,
        email: decoded.email
      };
    } catch (error) {
      console.error('Error verifying email token:', error);
      return { success: false, error: 'Token verification failed' };
    }
  }

  /**
   * Clean up expired tokens (should be called periodically)
   */
  cleanupExpiredTokens(): void {
    const now = new Date();
    for (const [token, data] of this.verificationTokens.entries()) {
      if (now > data.expiresAt) {
        this.verificationTokens.delete(token);
      }
    }
  }

  /**
   * Resend verification email
   */
  async resendVerificationEmail(userId: number, email: string): Promise<boolean> {
    // Remove any existing tokens for this user
    for (const [token, data] of this.verificationTokens.entries()) {
      if (data.userId === userId && data.email === email) {
        this.verificationTokens.delete(token);
      }
    }

    return this.sendVerificationEmail(userId, email);
  }
}

// Export singleton instance
export const emailService = new EmailService();