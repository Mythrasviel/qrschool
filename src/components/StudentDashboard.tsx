import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LogOut, QrCode, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { User, AttendanceRecord } from '../App';
import QRCodeDisplay from './QRCodeDisplay';

interface StudentDashboardProps {
  user: User;
  attendanceRecords: AttendanceRecord[];
  onLogout: () => void;
}

export default function StudentDashboard({
  user,
  attendanceRecords,
  onLogout
}: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState('qr-code');

  // Calculate attendance statistics
  const totalDays = 30; // Mock total school days
  const presentDays = attendanceRecords.length;
  const attendancePercentage = ((presentDays / totalDays) * 100).toFixed(1);

  // Check if present today
  const today = new Date().toISOString().split('T')[0];
  const isPresentToday = attendanceRecords.some(record => record.date === today);

  // Get recent attendance (last 10 records)
  const recentAttendance = attendanceRecords.slice(-10).reverse();

  // Extract school ID from QR code (format: SCHOOLID-NAME)
  const schoolId = user.qrCode ? user.qrCode.split('-')[0] : 'N/A';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-medium bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Student Dashboard</h1>
              <p className="text-slate-600 text-sm">Welcome, {user.name}</p>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout} className="border-blue-200 text-blue-700 hover:bg-blue-50">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="qr-code">My QR Code</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">Attendance History</TabsTrigger>
          </TabsList>

          <TabsContent value="qr-code">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                  <QrCode className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Your Attendance QR Code
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Show this QR code to your teacher for attendance marking
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                {user.qrCode && (
                  <div className="p-6 bg-white rounded-2xl shadow-lg border">
                    <QRCodeDisplay
                      qrCode={user.qrCode}
                      studentName={user.name}
                      schoolId={schoolId}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            {/* Today's Status */}
            <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Today's Status</CardTitle>
                <CardDescription className="text-slate-600">{new Date().toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`flex items-center gap-3 p-4 rounded-xl border-2 ${
                  isPresentToday 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                    : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200'
                }`}>
                  {isPresentToday ? (
                    <>
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-green-700">Present</p>
                        <p className="text-sm text-green-600">
                          Marked at {attendanceRecords.find(r => r.date === today)?.time}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                        <XCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-red-700">Not Marked</p>
                        <p className="text-sm text-red-600">
                          Show your QR code to mark attendance
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100 hover:shadow-md transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm text-green-700">Days Present</CardTitle>
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold text-green-900">{presentDays}</div>
                  <p className="text-xs text-green-600">
                    Out of {totalDays} days
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-md transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm text-blue-700">Attendance Rate</CardTitle>
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold text-blue-900">{attendancePercentage}%</div>
                  <p className="text-xs text-blue-600">
                    Overall attendance
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-gradient-to-br from-red-50 to-red-100 hover:shadow-md transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm text-red-700">Days Absent</CardTitle>
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                    <XCircle className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold text-red-900">{totalDays - presentDays}</div>
                  <p className="text-xs text-red-600">
                    Missed days
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Student Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>My Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p>{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">School ID</p>
                    <p>{schoolId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p>{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">QR Code</p>
                    <p className="text-xs bg-muted p-1 rounded">{user.qrCode}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Attendance History</CardTitle>
                <CardDescription>Your recent attendance records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentAttendance.map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-3 rounded border">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <div>
                          <p>{new Date(record.date).toLocaleDateString()}</p>
                          <p className="text-sm text-muted-foreground">
                            Marked at {record.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-green-600">Present</div>
                    </div>
                  ))}
                  {recentAttendance.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No attendance records yet</p>
                      <p className="text-sm">Show your QR code to teachers to mark attendance</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}