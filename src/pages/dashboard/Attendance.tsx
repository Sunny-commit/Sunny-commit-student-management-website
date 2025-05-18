import React, { useState } from 'react';
import { mockCourses, mockStudents, mockAttendance } from '../../data/mockData';
import { Calendar, ChevronLeft, ChevronRight, Filter, Download, Users, Search } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

const Attendance: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedView, setSelectedView] = useState<'calendar' | 'list'>('calendar');

  // Navigation functions
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  // Generate calendar header
  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';
    return (
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {format(currentMonth, dateFormat)}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={prevMonth}
            className="p-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setCurrentMonth(new Date())}
            className="p-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Today
          </button>
          <button
            onClick={nextMonth}
            className="p-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  };

  // Generate calendar days of week header
  const renderDays = () => {
    const dateFormat = 'EEE';
    const days = [];
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-center py-2 text-gray-600 text-sm" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="grid grid-cols-7">{days}</div>;
  };

  // Generate calendar cells
  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        
        // Dummy data - random attendance percentage for demonstration
        const attendancePercentage = Math.floor(Math.random() * 40) + 60; // 60-100%
        
        days.push(
          <div
            key={day.toString()}
            className={`min-h-[100px] p-2 border border-gray-200 ${
              !isSameMonth(day, monthStart)
                ? 'bg-gray-100 text-gray-400'
                : isSameDay(day, selectedDate)
                ? 'bg-blue-50 border-blue-500'
                : ''
            }`}
            onClick={() => onDateClick(cloneDay)}
          >
            <div className="flex justify-between">
              <span className={`text-sm ${isSameDay(day, new Date()) ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}`}>
                {formattedDate}
              </span>
              {isSameMonth(day, monthStart) && (
                <span 
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    attendancePercentage >= 90 ? 'bg-green-100 text-green-800' :
                    attendancePercentage >= 80 ? 'bg-blue-100 text-blue-800' :
                    attendancePercentage >= 70 ? 'bg-amber-100 text-amber-800' :
                    'bg-red-100 text-red-800'
                  }`}
                >
                  {attendancePercentage}%
                </span>
              )}
            </div>
            
            {isSameMonth(day, monthStart) && (
              <div className="mt-2 text-xs text-gray-600">
                {Math.floor(Math.random() * 2) > 0 && (
                  <div className="flex items-center mb-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 mr-1"></span>
                    <span>{Math.floor(Math.random() * 5) + 1} absent</span>
                  </div>
                )}
                {Math.floor(Math.random() * 2) > 0 && (
                  <div className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mr-1"></span>
                    <span>{Math.floor(Math.random() * 3) + 1} late</span>
                  </div>
                )}
              </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="mb-4">{rows}</div>;
  };

  // List view of attendance
  const renderListView = () => {
    // Filter attendance records for the selected date
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const todayAttendance = mockAttendance.filter(record => record.date === dateStr);
    
    // If none match our selected date, use all records for demo purposes
    const attendanceToShow = todayAttendance.length > 0 ? todayAttendance : mockAttendance;
    
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendanceToShow.map(record => {
              const student = mockStudents.find(s => s.id === record.studentId);
              const course = mockCourses.find(c => c.id === record.courseId);
              
              return (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        {student?.avatar ? (
                          <img className="h-8 w-8 rounded-full" src={student.avatar} alt={`${student.firstName} ${student.lastName}`} />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">
                            {student?.firstName.charAt(0)}{student?.lastName.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {student?.firstName} {student?.lastName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course?.name || 'Unknown Course'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(record.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      record.status === 'present' ? 'bg-green-100 text-green-800' :
                      record.status === 'absent' ? 'bg-red-100 text-red-800' :
                      record.status === 'late' ? 'bg-amber-100 text-amber-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.notes || '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Attendance Management</h1>
        <p className="text-gray-600">Track and manage student attendance records</p>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            {/* Course filter */}
            <div className="relative w-full sm:w-52">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
              >
                <option value="all">All Courses</option>
                {mockCourses.map(course => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <Filter size={16} />
              </div>
            </div>

            {/* View toggle */}
            <div className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                className={`inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                  selectedView === 'calendar' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedView('calendar')}
              >
                <Calendar size={16} className="mr-2" />
                Calendar
              </button>
              <button
                type="button"
                className={`inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                  selectedView === 'list' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border-l-0`}
                onClick={() => setSelectedView('list')}
              >
                <Users size={16} className="mr-2" />
                List
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search students..."
                className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-blue-600 sm:text-sm"
              />
            </div>
            
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Download size={16} className="mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          {selectedView === 'calendar' ? (
            <>
              {renderHeader()}
              {renderDays()}
              {renderCells()}
            </>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Attendance for {format(selectedDate, 'MMMM d, yyyy')}
                </h3>
                <p className="text-gray-600 text-sm">
                  Showing attendance records for the selected date. Click on a calendar date to view its records.
                </p>
              </div>
              {renderListView()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;