import { useState, useEffect } from 'react';
import { useTeamAuth } from '@/hooks/useTeamAuth';
import { Briefcase, Target, Calendar, CheckCircle, Clock, Users, TrendingUp, Award } from 'lucide-react';
import TeamSidebar from '@/components/TeamSidebar';

const WorkPage = () => {
  const { teamMember } = useTeamAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'progress' | 'team'>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Mock work data based on team member role
  const getWorkData = () => {
    const role = teamMember?.role;
    const name = teamMember?.name;

    if (name === 'Aon Imran') {
      return {
        currentProjects: [
          { id: 1, name: 'Thorx Platform Development', progress: 85, status: 'In Progress', priority: 'High' },
          { id: 2, name: 'Team Management System', progress: 92, status: 'Near Completion', priority: 'High' },
          { id: 3, name: 'User Experience Optimization', progress: 67, status: 'In Progress', priority: 'Medium' }
        ],
        completedTasks: 47,
        activeTasks: 12,
        teamPerformance: 'Excellent'
      };
    } else if (name === 'Zain Abbas') {
      return {
        currentProjects: [
          { id: 1, name: 'Digital Marketing Campaign', progress: 78, status: 'In Progress', priority: 'High' },
          { id: 2, name: 'User Acquisition Strategy', progress: 91, status: 'Near Completion', priority: 'High' },
          { id: 3, name: 'Brand Awareness Initiative', progress: 45, status: 'In Progress', priority: 'Medium' }
        ],
        completedTasks: 34,
        activeTasks: 8,
        teamPerformance: 'Good'
      };
    } else if (name === 'Zohaib Nadeem') {
      return {
        currentProjects: [
          { id: 1, name: 'Social Media Strategy', progress: 88, status: 'In Progress', priority: 'High' },
          { id: 2, name: 'Content Creation Pipeline', progress: 73, status: 'In Progress', priority: 'Medium' },
          { id: 3, name: 'Community Engagement', progress: 95, status: 'Near Completion', priority: 'High' }
        ],
        completedTasks: 29,
        activeTasks: 6,
        teamPerformance: 'Excellent'
      };
    } else {
      return {
        currentProjects: [
          { id: 1, name: 'System Administration', progress: 82, status: 'In Progress', priority: 'High' },
          { id: 2, name: 'Database Management', progress: 90, status: 'Near Completion', priority: 'Medium' },
          { id: 3, name: 'Security Monitoring', progress: 76, status: 'In Progress', priority: 'High' }
        ],
        completedTasks: 31,
        activeTasks: 7,
        teamPerformance: 'Good'
      };
    }
  };

  const workData = getWorkData();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500';
      case 'Near Completion': return 'bg-blue-500';
      case 'In Progress': return 'bg-yellow-500';
      case 'Pending': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-900">
        <TeamSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-900">
      <TeamSidebar />
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-200">Work Portal</h1>
                  <p className="text-slate-400">Manage your projects and tasks</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-slate-400">Active Tasks</div>
                  <div className="text-lg font-semibold text-slate-200">{workData.activeTasks}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-400">Completed</div>
                  <div className="text-lg font-semibold text-green-400">{workData.completedTasks}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-slate-800 p-1 rounded-lg">
              {[
                { id: 'overview', label: 'Overview', icon: Target },
                { id: 'tasks', label: 'Tasks', icon: CheckCircle },
                { id: 'progress', label: 'Progress', icon: TrendingUp },
                { id: 'team', label: 'Team', icon: Users }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-2 px-4 rounded-md transition-colors flex items-center justify-center space-x-2 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Active Projects</p>
                      <p className="text-2xl font-bold text-slate-200">{workData.currentProjects.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-xs text-green-400 mt-2">All projects on track</div>
                </div>

                <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Completed Tasks</p>
                      <p className="text-2xl font-bold text-slate-200">{workData.completedTasks}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-xs text-green-400 mt-2">+15% from last month</div>
                </div>

                <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Active Tasks</p>
                      <p className="text-2xl font-bold text-slate-200">{workData.activeTasks}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-xs text-blue-400 mt-2">In progress</div>
                </div>

                <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Performance</p>
                      <p className="text-2xl font-bold text-slate-200">{workData.teamPerformance}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-xs text-purple-400 mt-2">Team rating</div>
                </div>
              </div>

              {/* Current Projects */}
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                <h2 className="text-xl font-semibold text-slate-200 mb-6">Current Projects</h2>
                <div className="space-y-4">
                  {workData.currentProjects.map((project) => (
                    <div key={project.id} className="bg-slate-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
                          <h3 className="font-medium text-slate-200">{project.name}</h3>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`text-sm font-medium ${getPriorityColor(project.priority)}`}>
                            {project.priority}
                          </span>
                          <span className="text-sm text-slate-400">{project.status}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Progress</span>
                          <span className="text-slate-300">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <div className="space-y-6">
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                <h2 className="text-xl font-semibold text-slate-200 mb-6">Task Management</h2>
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-200 mb-2">Task Management Coming Soon</h3>
                  <p className="text-slate-400">
                    Advanced task management features will be available in the next update.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && (
            <div className="space-y-6">
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                <h2 className="text-xl font-semibold text-slate-200 mb-6">Progress Analytics</h2>
                <div className="text-center py-8">
                  <TrendingUp className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-200 mb-2">Analytics Dashboard Coming Soon</h3>
                  <p className="text-slate-400">
                    Detailed progress analytics and reporting features will be available soon.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                <h2 className="text-xl font-semibold text-slate-200 mb-6">Team Collaboration</h2>
                <div className="text-center py-8">
                  <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-200 mb-2">Team Features Coming Soon</h3>
                  <p className="text-slate-400">
                    Advanced team collaboration tools will be available in the next update.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkPage;