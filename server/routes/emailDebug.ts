import { Router } from 'express';
import { emailService } from '../emailService';

const router = Router();

// Debug endpoint to test email sending
router.post('/debug/send-test-email', async (req, res) => {
  try {
    const { email, userId } = req.body;
    
    if (!email || !userId) {
      return res.status(400).json({ error: 'Email and userId are required' });
    }

    console.log(`🔍 Debug: Attempting to send email to ${email} for user ${userId}`);
    
    const startTime = Date.now();
    const result = await emailService.sendVerificationEmail(userId, email);
    const endTime = Date.now();
    
    const deliveryTime = endTime - startTime;
    
    if (result) {
      console.log(`✅ Debug: Email sent successfully to ${email} in ${deliveryTime}ms`);
      res.json({
        success: true,
        message: `Email sent successfully to ${email}`,
        deliveryTime: `${deliveryTime}ms`,
        timestamp: new Date().toISOString()
      });
    } else {
      console.log(`❌ Debug: Failed to send email to ${email} after ${deliveryTime}ms`);
      res.status(500).json({
        success: false,
        message: `Failed to send email to ${email}`,
        deliveryTime: `${deliveryTime}ms`,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Debug email error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Debug endpoint to resend verification email
router.post('/debug/resend-verification', async (req, res) => {
  try {
    const { email, userId } = req.body;
    
    if (!email || !userId) {
      return res.status(400).json({ error: 'Email and userId are required' });
    }

    console.log(`🔄 Debug: Resending verification email to ${email} for user ${userId}`);
    
    const startTime = Date.now();
    const result = await emailService.resendVerificationEmail(userId, email);
    const endTime = Date.now();
    
    const deliveryTime = endTime - startTime;
    
    if (result) {
      console.log(`✅ Debug: Verification email resent successfully to ${email} in ${deliveryTime}ms`);
      res.json({
        success: true,
        message: `Verification email resent to ${email}`,
        deliveryTime: `${deliveryTime}ms`,
        timestamp: new Date().toISOString()
      });
    } else {
      console.log(`❌ Debug: Failed to resend verification email to ${email} after ${deliveryTime}ms`);
      res.status(500).json({
        success: false,
        message: `Failed to resend verification email to ${email}`,
        deliveryTime: `${deliveryTime}ms`,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Debug resend email error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

export default router;