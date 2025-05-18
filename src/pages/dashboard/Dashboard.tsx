import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Users, BookOpen, Calendar, Award, Clock, AlertTriangle, TrendingUp, Bell } from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { getDaysInMonth, format, startOfToday } from 'date-fns';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const today = startOfToday();

  // Sample data for charts
  const attendanceData = {
    labels: Array.from({ length: getDaysInMonth(today) }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Attendance Rate (%)',
        data: Array.from({ length: getDaysInMonth(today) }, () => Math.floor(Math.random() * 30) + 70),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const gradeDistributionData = {
    labels: ['A', 'B', 'C', 'D', 'F'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          '#10B981',
          '#3B82F6',
          '#F59E0B',
          '#F97316',
          '#EF4444',
        ],
        borderColor: '#FFFFFF',
        borderWidth: 2,
      },
    ],
  };

  // Stats cards based on user role
  const getStatsCards = () => {
    if (user?.role === 'admin') {
      return [
        { icon: <Users size={20} />, title: 'Total Students', value: '1,245', color: 'bg-blue-600' },
        { icon: <BookOpen size={20} />, title: 'Active Courses', value: '84', color: 'bg-green-600' },
        { icon: <Calendar size={20} />, title: 'Upcoming Events', value: '12', color: 'bg-amber-600' },
        { icon: <Clock size={20} />, title: 'Attendance Rate', value: '92%', color: 'bg-purple-600' },
      ];
    } else if (user?.role === 'teacher') {
      return [
        { icon: <Users size={20} />, title: 'My Students', value: '87', color: 'bg-blue-600' },
        { icon: <BookOpen size={20} />, title: 'My Courses', value: '5', color: 'bg-green-600' },
        { icon: <Clock size={20} />, title: 'Classes Today', value: '3', color: 'bg-amber-600' },
        { icon: <AlertTriangle size={20} />, title: 'Attendance Issues', value: '4', color: 'bg-red-600' },
      ];
    } else {
      return [
        { icon: <BookOpen size={20} />, title: 'My Courses', value: '6', color: 'bg-blue-600' },
        { icon: <Clock size={20} />, title: 'Attendance', value: '95%', color: 'bg-green-600' },
        { icon: <Award size={20} />, title: 'GPA', value: '3.7', color: 'bg-amber-600' },
        { icon: <Calendar size={20} />, title: 'Upcoming Tests', value: '2', color: 'bg-purple-600' },
      ];
    }
  };

  // Recent announcements
  const announcements = [
    {
      id: 1,
      title: 'Final Exam Schedule Posted',
      date: '2023-12-01',
      content: 'The final examination schedule for the Fall semester has been posted. Please check your student portal for details.',
    },
    {
      id: 2,
      title: 'Winter Break Dates',
      date: '2023-11-15',
      content: 'The school will be closed for Winter Break from December 20 to January 3. Classes will resume on January 4.',
    },
    {
      id: 3,
      title: 'Parent-Teacher Conference',
      date: '2023-11-10',
      content: 'Parent-Teacher conferences will be held on November 25-26. Please sign up for a time slot.',
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {user?.role === 'admin' 
            ? 'Admin Dashboard' 
            : user?.role === 'teacher' 
              ? 'Teacher Dashboard' 
              : user?.role === 'parent'
                ? 'Parent Dashboard'
                : 'Student Dashboard'}
        </h1>
        <p className="text-gray-600">Welcome back, {user?.name}! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {getStatsCards().map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className={`${stat.color} text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Attendance Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Attendance</h2>
          <div className="h-64">
            <Line 
              data={attendanceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: false,
                    min: 60,
                    max: 100,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Grade Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Grade Distribution</h2>
          <div className="h-64 flex items-center justify-center">
            <Doughnut 
              data={gradeDistributionData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Announcements and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Announcements */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Recent Announcements</h2>
              <Bell size={18} className="text-gray-500" />
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="px-6 py-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-800">{announcement.title}</h3>
                  <span className="text-xs text-gray-500">{announcement.date}</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{announcement.content}</p>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 bg-gray-50 rounded-b-lg">
            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800">
              View all announcements
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
              <TrendingUp size={18} className="text-gray-500" />
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="px-6 py-4">
              <div className="flex items-center">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full mr-3">
                  <BookOpen size={16} />
                </div>
                <div>
                  <p className="text-sm text-gray-800">Assignment submitted in <span className="font-medium">Mathematics 101</span></p>
                  <p className="text-xs text-gray-500">Today, 9:42 AM</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="flex items-center">
                <div className="bg-green-100 text-green-600 p-2 rounded-full mr-3">
                  <Award size={16} />
                </div>
                <div>
                  <p className="text-sm text-gray-800">Grade posted for <span className="font-medium">Physics Quiz #5</span></p>
                  <p className="text-xs text-gray-500">Yesterday, 2:15 PM</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="flex items-center">
                <div className="bg-purple-100 text-purple-600 p-2 rounded-full mr-3">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-sm text-gray-800">New event: <span className="font-medium">Science Fair Registration</span></p>
                  <p className="text-xs text-gray-500">Yesterday, 10:30 AM</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-3 bg-gray-50 rounded-b-lg">
            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800">
              View all activity
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;