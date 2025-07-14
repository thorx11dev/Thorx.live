import bcrypt from 'bcrypt';
import { storage } from './storage';

async function initializeTeamMembers() {
  try {
    console.log('Initializing team members...');
    
    // Team member data with updated passwords
    const teamMembers = [
      {
        name: "Aon Imran",
        email: "aon@thorx.live",
        password: "ThorxAonImran!9426",
        role: "ceo"
      },
      {
        name: "Zain Abbas",
        email: "zain@thorx.live",
        password: "ThorxZainAbbas@1111",
        role: "marketing"
      },
      {
        name: "Zohaib Nadeem",
        email: "zohaib@thorx.live",
        password: "ThorxZohaibNadeem#7777",
        role: "social_media"
      },
      {
        name: "Prof. Muhammad Jahangeer",
        email: "jahangeer@thorx.live",
        password: "ThorxMuhammadJahangeer$0000",
        role: "admin"
      }
    ];

    // Check if team members already exist
    const existingMembers = await storage.getAllTeamMembers();
    
    if (existingMembers.length > 0) {
      console.log('Team members already exist. Updating passwords...');
      
      for (const member of teamMembers) {
        const existing = existingMembers.find(m => m.name === member.name);
        if (existing) {
          const hashedPassword = await bcrypt.hash(member.password, 10);
          await storage.updateTeamMemberPassword(existing.id, hashedPassword);
          console.log(`Updated password for ${member.name}`);
        }
      }
    } else {
      console.log('Creating new team members...');
      
      for (const member of teamMembers) {
        const hashedPassword = await bcrypt.hash(member.password, 10);
        
        await storage.createTeamMember({
          name: member.name,
          email: member.email,
          password: hashedPassword,
          role: member.role
        });
        
        console.log(`Created team member: ${member.name}`);
      }
    }
    
    console.log('Team member initialization completed!');
  } catch (error) {
    console.error('Error initializing team members:', error);
  }
}

// Run initialization
initializeTeamMembers();