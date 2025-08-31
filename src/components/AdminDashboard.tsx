import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LogOut, Users, BarChart, UserPlus } from 'lucide-react';
import { User, Student, Teacher, AttendanceRecord } from '../App';
import TeacherManagement from './TeacherManagement';
import StudentManagement from './StudentManagement';
import AttendanceReports from './AttendanceReports';
import AdminProfile from './AdminProfile';

interface AdminDashboardProps {
  user: User;
  students: Student[];
  teachers: Teacher[];
  attendanceRecords: AttendanceRecord[];
  onLogout: () => void;
  onAddTeacher: (teacher: Teacher) => void;
  onUpdateTeacher: (teacher: Teacher) => void;
  onDeleteTeacher: (teacherId: string) => void;
  onAddStudent: (student: Student) => void;
  onUpdateStudent: (student: Student) => void;
  onDeleteStudent: (studentId: string) => void;
  onChangeAdminPassword: (newPassword: string) => void;
}

export default function AdminDashboard({
  user,
  students,
  teachers,
  attendanceRecords,
  onLogout,
  onAddTeacher,
  onUpdateTeacher,
  onDeleteTeacher,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
  onChangeAdminPassword
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const todayAttendance = attendanceRecords.filter(
    record => record.date === new Date().toISOString().split('T')[0]
  );

  const attendanceRate = students.length > 0 
    ? (todayAttendance.length / students.length * 100).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.018 4.695a9.02 9.02 0 0110.465-8.695m-6.482 6.003a9.02 9.02 0 01-3.691-7.308m6.173 7.308v.001M12 3v7.5l3.5-3.5" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-medium bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Admin Dashboard</h1>
              <p className="text-slate-600 text-sm">Welcome back, {user.name}</p>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout} className="border-purple-200 text-purple-700 hover:bg-purple-50">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-md transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm text-blue-700">Total Students</CardTitle>
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold text-blue-900">{students.length}</div>
                  <p className="text-xs text-blue-600">
                    Registered students
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100 hover:shadow-md transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm text-green-700">Teachers</CardTitle>
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <UserPlus className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold text-green-900">{teachers.length}</div>
                  <p className="text-xs text-green-600">
                    Active teachers
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-md transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm text-orange-700">Today's Attendance</CardTitle>
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <BarChart className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold text-orange-900">{todayAttendance.length}</div>
                  <p className="text-xs text-orange-600">
                    Students present today
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-md transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm text-purple-700">Attendance Rate</CardTitle>
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <BarChart className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold text-purple-900">{attendanceRate}%</div>
                  <p className="text-xs text-purple-600">
                    Today's attendance rate
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Recent Activity</CardTitle>
                <CardDescription className="text-slate-600">Latest attendance records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {attendanceRecords.slice(-5).reverse().map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="font-medium text-slate-800">{record.studentName}</p>
                          <p className="text-sm text-slate-600">{record.date} at {record.time}</p>
                        </div>
                      </div>
                      <div className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Present</div>
                    </div>
                  ))}
                  {attendanceRecords.length === 0 && (
                    <p className="text-slate-500 text-center py-8">No attendance records yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teachers">
            <TeacherManagement
              teachers={teachers}
              onAddTeacher={onAddTeacher}
              onUpdateTeacher={onUpdateTeacher}
              onDeleteTeacher={onDeleteTeacher}
              adminEmail={user.email}
            />
          </TabsContent>

          <TabsContent value="students">
            <StudentManagement
              students={students}
              onAddStudent={onAddStudent}
              onUpdateStudent={onUpdateStudent}
              onDeleteStudent={onDeleteStudent}
            />
          </TabsContent>

          <TabsContent value="reports">
            <AttendanceReports
              students={students}
              attendanceRecords={attendanceRecords}
            />
          </TabsContent>

          <TabsContent value="profile">
            <AdminProfile
              adminEmail={user.email}
              adminName={user.name}
              onChangePassword={onChangeAdminPassword}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}