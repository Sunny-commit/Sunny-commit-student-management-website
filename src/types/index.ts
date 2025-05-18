// Student related types

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  phone?: string;
  address?: string;
  enrollmentDate: string;
  graduationDate?: string;
  status: 'active' | 'inactive' | 'graduated' | 'suspended';
  avatar?: string;
  parent?: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  credits: number;
  semester: string;
  teacher: {
    id: string;
    name: string;
  };
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
    room: string;
  }[];
  students: string[]; // IDs of enrolled students
}

export interface Attendance {
  id: string;
  studentId: string;
  courseId: string;
  date: string; // ISO format
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  assignmentId: string;
  score: number;
  maxScore: number;
  type: 'quiz' | 'exam' | 'assignment' | 'project' | 'midterm' | 'final';
  date: string;
  notes?: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'transcript' | 'report_card' | 'certificate' | 'id_card' | 'other';
  url: string;
  uploadDate: string;
  studentId?: string;
  courseId?: string;
  size: number; // in bytes
  format: 'pdf' | 'doc' | 'docx' | 'jpg' | 'png';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  authorId: string;
  authorName: string;
  targetAudience: 'all' | 'students' | 'teachers' | 'parents' | 'administrators';
  isImportant: boolean;
  attachments?: {
    name: string;
    url: string;
  }[];
}