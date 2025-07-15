import { useState, useEffect, useRef } from 'react';
import { useTeamAuth } from '@/hooks/useTeamAuth';
import { Send, Smile, Paperclip, MoreVertical, User, Clock } from 'lucide-react';

interface TeamChat {
  id: number;
  senderId: number;
  message: string;
  createdAt: string;
  senderName?: string;
  senderRole?: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  isActive: boolean;
}

const LinkagePage = () => {
  const { teamMember } = useTeamAuth();
  const [messages, setMessages] = useState<TeamChat[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMessages();
    loadTeamMembers();
    
    // Set up real-time message polling
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await fetch('/api/team/chat', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const chatData = await response.json();
        setMessages(chatData);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTeamMembers = async () => {
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await fetch('/api/team/members', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const memberData = await response.json();
        setTeamMembers(memberData);
      }
    } catch (error) {
      console.error('Error loading team members:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await fetch('/api/team/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: newMessage.trim(),
        }),
      });

      if (response.ok) {
        setNewMessage('');
        // Immediately reload messages
        await loadMessages();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ceo': return 'bg-yellow-500';
      case 'marketing': return 'bg-green-500';
      case 'social_media': return 'bg-pink-500';
      case 'admin': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getMessageWithSender = (message: TeamChat) => {
    const sender = teamMembers.find(member => member.id === message.senderId);
    return {
      ...message,
      senderName: sender?.name || 'Unknown',
      senderRole: sender?.role || 'member'
    };
  };

  const onlineMembers = teamMembers.filter(member => member.isActive);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        {/* Team Members Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 h-full">
            <h4 className="text-sm font-medium text-slate-200 mb-4">Team Members</h4>
            <div className="space-y-3">
              {onlineMembers.map((member) => (
                <div key={member.id} className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full ${getRoleColor(member.role)} flex items-center justify-center`}>
                    <span className="text-white font-bold text-xs">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-slate-200 truncate">
                        {member.name}
                      </p>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <p className="text-xs text-slate-400 capitalize">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3">
          <div className="bg-slate-800 rounded-lg border border-slate-700 h-full flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-200">Team Chat</h3>
                  <p className="text-sm text-slate-400">
                    {onlineMembers.length} members online
                  </p>
                </div>
                <button className="p-2 hover:bg-slate-700 rounded-lg">
                  <MoreVertical className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-400">No messages yet. Start the conversation!</p>
                </div>
              ) : (
                messages.map((message) => {
                  const messageWithSender = getMessageWithSender(message);
                  const isOwnMessage = message.senderId === teamMember?.id;
                  
                  return (
                    <div key={message.id} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                        <div className={`px-4 py-2 rounded-lg ${
                          isOwnMessage 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-slate-700 text-slate-200'
                        }`}>
                          {!isOwnMessage && (
                            <div className="flex items-center space-x-2 mb-1">
                              <div className={`w-4 h-4 rounded-full ${getRoleColor(messageWithSender.senderRole)}`}></div>
                              <span className="text-xs font-medium">{messageWithSender.senderName}</span>
                            </div>
                          )}
                          <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                        </div>
                        <div className={`mt-1 flex items-center space-x-1 text-xs text-slate-400 ${
                          isOwnMessage ? 'justify-end' : 'justify-start'
                        }`}>
                          <Clock className="w-3 h-3" />
                          <span>{formatTime(message.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <div className="relative">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      rows={1}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      style={{ minHeight: '48px', maxHeight: '120px' }}
                    />
                    <div className="absolute right-2 bottom-2 flex items-center space-x-1">
                      <button 
                        type="button"
                        className="p-1 hover:bg-slate-600 rounded"
                      >
                        <Smile className="w-4 h-4 text-slate-400" />
                      </button>
                      <button 
                        type="button"
                        className="p-1 hover:bg-slate-600 rounded"
                      >
                        <Paperclip className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim() || sending}
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center space-x-2"
                >
                  {sending ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkagePage;