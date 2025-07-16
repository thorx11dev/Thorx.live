import * as fs from 'fs';
import * as path from 'path';

/**
 * Email Avatar Service for Thorx
 * Handles profile picture configuration for email clients
 */
export class EmailAvatarService {
  private static instance: EmailAvatarService;
  private logoBase64: string | null = null;

  private constructor() {
    this.loadLogo();
  }

  public static getInstance(): EmailAvatarService {
    if (!EmailAvatarService.instance) {
      EmailAvatarService.instance = new EmailAvatarService();
    }
    return EmailAvatarService.instance;
  }

  /**
   * Load and cache the Thorx logo as base64
   */
  private loadLogo(): void {
    try {
      const logoPath = path.join(process.cwd(), 'attached_assets/WhatsApp Image 2025-07-14 at 11.14.27_2d89cec2_1752689411906.jpg');
      const logoBuffer = fs.readFileSync(logoPath);
      this.logoBase64 = logoBuffer.toString('base64');
      console.log('📧 Thorx logo loaded successfully for email avatar');
    } catch (error) {
      console.error('❌ Error loading Thorx logo for email avatar:', error);
      this.logoBase64 = null;
    }
  }

  /**
   * Get the logo as base64 string
   */
  public getLogoBase64(): string | null {
    return this.logoBase64;
  }

  /**
   * Get email avatar configuration for nodemailer
   */
  public getAvatarConfig() {
    if (!this.logoBase64) return null;

    return {
      filename: 'thorx-avatar.jpg',
      content: this.logoBase64,
      encoding: 'base64',
      cid: 'thorx-avatar',
      contentDisposition: 'inline',
      headers: {
        'Content-ID': '<thorx-avatar>',
        'X-Attachment-Id': 'thorx-avatar',
        'Content-Type': 'image/jpeg'
      }
    };
  }

  /**
   * Get sender configuration for email clients to display profile picture
   */
  public getSenderConfig(email: string) {
    return {
      from: {
        name: 'Thorx',
        address: 'support@thorx.live'
      },
      headers: {
        'X-Avatar': this.logoBase64 ? `data:image/jpeg;base64,${this.logoBase64}` : undefined,
        'X-Sender-Avatar': this.logoBase64 ? `data:image/jpeg;base64,${this.logoBase64}` : undefined,
        'X-Entity-Ref-ID': 'thorx-platform',
        'X-Brand-Logo': this.logoBase64 ? `data:image/jpeg;base64,${this.logoBase64}` : undefined
      }
    };
  }
}

export const emailAvatarService = EmailAvatarService.getInstance();