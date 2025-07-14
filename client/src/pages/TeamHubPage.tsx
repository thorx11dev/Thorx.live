import { useState, useEffect } from 'react';
import { useTeamAuth } from '@/hooks/useTeamAuth';
import { apiRequest } from '@/lib/queryClient';
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  Target, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Send,
  Plus,
  Edit3,
  Trash2,
  RefreshCw,
  Video,
  FileText,
  Award,
  Activity
} from 'lucide-react';

interface TeamChat {
  id: number;
  message: string;
  senderName: string;
  senderRole: string;
  timestamp: string;
}

interface TeamTask {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  createdAt: string;
}

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  lastSeen: string;
}

const TeamHubPage = () => {
  const { teamMember } = useTeamAuth();
  const [activeTab, setActiveTab] = useState<'chat' | 'tasks' | 'members' | 'analytics'>('chat');
  const [loading, setLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState<TeamChat[]>([]);
  const [tasks, setTasks] = useState<TeamTask[]>([]);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    dueDate: ''
  });
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    loadTeamData();
    // Auto-refresh chat every 30 seconds
    const interval = setInterval(loadChatMessages, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadTeamData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadChatMessages(),
        loadTasks(),
        loadMembers()
      ]);
    } catch (error) {
      console.error('Error loading team data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadChatMessages = async () => {
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await apiRequest('/api/team/chat', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const chatData = await response.json();
        setChatMessages(chatData);
      }
    } catch (error) {
      console.error('Error loading chat messages:', error);
    }
  };

  const loadTasks = async () => {
    try {
      // Mock data - replace with actual API call
      setTasks([
        {
          id: 1,
          title: 'Review User Feedback',
          description: 'Analyze recent user feedback and compile report',
          assignedTo: 'Aon Imran',
          priority: 'high',
          status: 'in-progress',
          dueDate: '2025-01-20',
          createdAt: '2025-01-15'
        },
        {
          id: 2,
          title: 'Social Media Campaign',
          description: 'Launch new social media campaign for Q1',
          assignedTo: 'Zohaib Nadeem',
          priority: 'medium',
          status: 'pending',
          dueDate: '2025-01-25',
          createdAt: '2025-01-14'
        },
        {
          id: 3,
          title: 'Marketing Analytics',
          description: 'Update marketing dashboard with latest metrics',
          assignedTo: 'Zain Abbas',
          priority: 'low',
          status: 'completed',
          dueDate: '2025-01-18',
          createdAt: '2025-01-13'
        }
      ]);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const loadMembers = async () => {
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await apiRequest('/api/team/members', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const memberData = await response.json();
        setMembers(memberData);
      }
    } catch (error) {
      console.error('Error loading members:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || sendingMessage) return;

    setSendingMessage(true);
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await apiRequest('/api/team/chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: newMessage.trim()
        }),
      });

      if (response.ok) {
        setNewMessage('');
        await loadChatMessages();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSendingMessage(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const createTask = async () => {
    if (!newTask.title || !newTask.assignedTo) return;

    try {
      const taskData: TeamTask = {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        assignedTo: newTask.assignedTo,
        priority: newTask.priority,
        status: 'pending',
        dueDate: newTask.dueDate,
        createdAt: new Date().toISOString().split('T')[0]
      };

      setTasks(prev => [taskData, ...prev]);
      setShowTaskModal(false);
      setNewTask({
        title: '',
        description: '',
        assignedTo: '',
        priority: 'medium',
        dueDate: ''
      });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getRoleColor = (role: string) => {
    const colors = {
      'ceo': 'text-red-400',
      'marketing': 'text-blue-400',
      'social_media': 'text-purple-400',
      'admin': 'text-green-400'
    };
    return colors[role as keyof typeof colors] || 'text-gray-400';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'low': 'bg-green-500/20 text-green-400',
      'medium': 'bg-yellow-500/20 text-yellow-400',
      'high': 'bg-red-500/20 text-red-400'
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'pending': 'bg-gray-500/20 text-gray-400',
      'in-progress': 'bg-blue-500/20 text-blue-400',
      'completed': 'bg-green-500/20 text-green-400'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-200 flex items-center space-x-2">
            <Users className="w-6 h-6" />
            <span>Team Hub</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Collaborate and manage team activities</p>
        </div>
        <button
          onClick={loadTeamData}
          disabled={loading}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Team Members</p>
              <p className="text-2xl font-bold text-slate-200">{members.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Active Tasks</p>
              <p className="text-2xl font-bold text-yellow-400">{tasks.filter(t => t.status !== 'completed').length}</p>
            </div>
            <Target className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Completed</p>
              <p className="text-2xl font-bold text-green-400">{tasks.filter(t => t.status === 'completed').length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Messages</p>
              <p className="text-2xl font-bold text-purple-400">{chatMessages.length}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-slate-700">
        {[
          { id: 'chat', label: 'Team Chat', icon: MessageSquare },
          { id: 'tasks', label: 'Tasks', icon: Target },
          { id: 'members', label: 'Members', icon: Users },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-slate-700 text-white border-b-2 border-blue-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Chat Tab */}
      {activeTab === 'chat' && (
        <div className="bg-slate-800 rounded-lg border border-slate-700 h-96 flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {chatMessages.length === 0 ? (
              <div className="text-center text-slate-400 py-8">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              chatMessages.map((msg) => (
                <div key={msg.id} className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-slate-300">
                        {msg.senderName.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-slate-200">{msg.senderName}</span>
                      <span className={`text-xs font-medium ${getRoleColor(msg.senderRole)}`}>
                        {msg.senderRole.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-slate-500">{formatTimestamp(msg.timestamp)}</span>
                    </div>
                    <p className="text-slate-300 text-sm whitespace-pre-wrap">{msg.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim() || sendingMessage}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tasks Tab */}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-slate-200">Team Tasks</h3>
            <button
              onClick={() => setShowTaskModal(true)}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New Task</span>
            </button>
          </div>

          <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-slate-200 font-medium">Task</th>
                    <th className="px-4 py-3 text-left text-slate-200 font-medium">Assigned To</th>
                    <th className="px-4 py-3 text-left text-slate-200 font-medium">Priority</th>
                    <th className="px-4 py-3 text-left text-slate-200 font-medium">Status</th>
                    <th className="px-4 py-3 text-left text-slate-200 font-medium">Due Date</th>
                    <th className="px-4 py-3 text-left text-slate-200 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {tasks.map((task) => (
                    <tr key={task.id} className="hover:bg-slate-700/50 transition-colors">
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-slate-200 font-medium">{task.title}</p>
                          <p className="text-slate-400 text-sm">{task.description}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-200">{task.assignedTo}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-200">{new Date(task.dueDate).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button className="text-blue-400 hover:text-blue-300 transition-colors">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="text-red-400 hover:text-red-300 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Members Tab */}
      {activeTab === 'members' && (
        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h3 className="text-lg font-semibold text-slate-200">Team Members</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {members.map((member) => (
                <div key={member.id} className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-slate-200">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-slate-200 font-medium">{member.name}</p>
                        <p className="text-slate-400 text-sm">{member.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)} bg-slate-600`}>
                        {member.role.replace('_', ' ')}
                      </span>
                      <p className="text-slate-400 text-xs mt-1">
                        {member.isActive ? 'Online' : `Last seen: ${formatTimestamp(member.lastSeen)}`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Team Activity</span>
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Messages Sent</span>
                  <span className="text-slate-200 font-medium">{chatMessages.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Tasks Created</span>
                  <span className="text-slate-200 font-medium">{tasks.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Completion Rate</span>
                  <span className="text-green-400 font-medium">
                    {tasks.length > 0 ? Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Performance</span>
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">High Priority Tasks</span>
                  <span className="text-red-400 font-medium">{tasks.filter(t => t.priority === 'high').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Overdue Tasks</span>
                  <span className="text-orange-400 font-medium">
                    {tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Active Members</span>
                  <span className="text-blue-400 font-medium">{members.filter(m => m.isActive).length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md border border-slate-700">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">Create New Task</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Task Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Assign To</label>
                <select
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask(prev => ({ ...prev, assignedTo: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select team member</option>
                  {members.map(member => (
                    <option key={member.id} value={member.name}>{member.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowTaskModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createTask}
                  disabled={!newTask.title || !newTask.assignedTo}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors"
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamHubPage;