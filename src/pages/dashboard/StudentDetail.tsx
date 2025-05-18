import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockStudents, mockCourses, mockGrades, mockAttendance } from '../../data/mockData';
import { ArrowLeft, Phone, Mail, Home, Calendar, Edit, Download, Share2, Printer, BookOpen, LineChart, ClipboardCheck } from 'lucide-react';

const StudentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const student = mockStudents.find(s => s.id === id);

  if (!student) {
    return (
      <div className="bg-white shadow rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Student Not Found</h2>
        <p className="text-gray-600 mb-6">The student you're looking for doesn't exist or has been removed.</p>
        <Link to="/students" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft size={16} className="mr-2" />
          Back to Students
        </Link>
      </div>
    );
  }

  // Get student's courses
  const studentCourses = mockCourses.filter(course => 
    course.students.includes(student.id)
  );

  // Get student's grades
  const studentGrades = mockGrades.filter(grade => 
    grade.studentId === student.id
  );

  // Get student's attendance
  const studentAttendance = mockAttendance.filter(record => 
    record.studentId === student.id
  );

  // Calculate overall GPA (simplified)
  const calculateGPA = () => {
    if (studentGrades.length === 0) return 'N/A';
    
    const totalScore = studentGrades.reduce((sum, grade) => sum + (grade.score / grade.maxScore), 0);
    const gpa = (totalScore / studentGrades.length) * 4; // Simplified conversion to 4.0 scale
    return gpa.toFixed(2);
  };

  // Calculate attendance rate
  const calculateAttendanceRate = () => {
    if (studentAttendance.length === 0) return 'N/A';
    
    const presentCount = studentAttendance.filter(record => 
      record.status === 'present' || record.status === 'late'
    ).length;
    
    return `${Math.round((presentCount / studentAttendance.length) * 100)}%`;
  };

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center">
            <Link to="/students" className="mr-2 text-gray-500 hover:text-gray-700">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Student Profile</h1>
          </div>
          <p className="text-gray-600">Detailed information about {student.firstName} {student.lastName}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Edit size={16} className="mr-2" />
            Edit
          </button>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Download size={16} className="mr-2" />
            Export
          </button>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Share2 size={16} className="mr-2" />
            Share
          </button>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Printer size={16} className="mr-2" />
            Print
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6 text-center">
              {student.avatar ? (
                <img
                  src={student.avatar}
                  alt={`${student.firstName} ${student.lastName}`}
                  className="mx-auto h-32 w-32 rounded-full object-cover"
                />
              ) : (
                <div className="mx-auto h-32 w-32 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-medium">
                  {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                </div>
              )}
              <h2 className="mt-4 text-xl font-bold text-gray-900">{student.firstName} {student.lastName}</h2>
              <p className="text-gray-500">Student ID: STU-{student.id.padStart(5, '0')}</p>
              
              <div className="mt-4 flex justify-center items-center">
                <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                  student.status === 'active' ? 'bg-green-100 text-green-800' :
                  student.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                  student.status === 'graduated' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <Mail size={18} className="text-gray-400 mr-3" />
                  <span>{student.email}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Phone size={18} className="text-gray-400 mr-3" />
                  <span>{student.phone || 'Not provided'}</span>
                </div>
                <div className="flex items-start text-gray-700">
                  <Home size={18} className="text-gray-400 mr-3 mt-1" />
                  <span>{student.address || 'Not provided'}</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Academic Information</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Enrollment Date</span>
                  <span className="text-gray-900">{new Date(student.enrollmentDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Grade Level</span>
                  <span className="text-gray-900">10th Grade</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">GPA</span>
                  <span className="text-gray-900">{calculateGPA()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Attendance Rate</span>
                  <span className="text-gray-900">{calculateAttendanceRate()}</span>
                </div>
              </div>
            </div>
            
            {student.parent && (
              <div className="border-t border-gray-200 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Parent/Guardian</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Name</span>
                    <span className="text-gray-900">{student.parent.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Email</span>
                    <span className="text-gray-900">{student.parent.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Phone</span>
                    <span className="text-gray-900">{student.parent.phone}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Courses */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Enrolled Courses</h3>
                <BookOpen size={20} className="text-gray-500" />
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {studentCourses.length > 0 ? (
                studentCourses.map(course => (
                  <div key={course.id} className="px-6 py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                      <h4 className="text-base font-medium text-gray-900">{course.name}</h4>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {course.code}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                    <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <span className="mr-1">Teacher:</span>
                        <span className="text-gray-700">{course.teacher.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-1">Credits:</span>
                        <span className="text-gray-700">{course.credits}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-1">Semester:</span>
                        <span className="text-gray-700">{course.semester}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-4 text-gray-500">No courses found for this student.</div>
              )}
            </div>
          </div>

          {/* Grades */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Recent Grades</h3>
                <LineChart size={20} className="text-gray-500" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {studentGrades.length > 0 ? (
                    studentGrades.map(grade => {
                      const course = mockCourses.find(c => c.id === grade.courseId);
                      return (
                        <tr key={grade.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course?.name || 'Unknown'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grade.assignmentId}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              grade.type === 'quiz' ? 'bg-blue-100 text-blue-800' :
                              grade.type === 'exam' ? 'bg-purple-100 text-purple-800' :
                              grade.type === 'assignment' ? 'bg-green-100 text-green-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {grade.type.charAt(0).toUpperCase() + grade.type.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(grade.date).toLocaleDateString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center">
                              <span className={`font-medium ${
                                (grade.score / grade.maxScore) >= 0.9 ? 'text-green-600' :
                                (grade.score / grade.maxScore) >= 0.8 ? 'text-blue-600' :
                                (grade.score / grade.maxScore) >= 0.7 ? 'text-amber-600' :
                                'text-red-600'
                              }`}>
                                {grade.score}/{grade.maxScore}
                              </span>
                              <span className="ml-2 text-gray-500">
                                ({Math.round((grade.score / grade.maxScore) * 100)}%)
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-sm text-gray-500 text-center">No grades found for this student.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Attendance */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Recent Attendance</h3>
                <ClipboardCheck size={20} className="text-gray-500" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {studentAttendance.length > 0 ? (
                    studentAttendance.map(record => {
                      const course = mockCourses.find(c => c.id === record.courseId);
                      return (
                        <tr key={record.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(record.date).toLocaleDateString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course?.name || 'Unknown'}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                    })
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-sm text-gray-500 text-center">No attendance records found for this student.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;