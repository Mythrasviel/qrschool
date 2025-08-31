import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Plus, Edit, Trash2, QrCode } from 'lucide-react';
import { Student } from '../App';
import QRCodeDisplay from './QRCodeDisplay';
import { toast } from 'sonner';

interface StudentManagementProps {
  students: Student[];
  onAddStudent: (student: Student) => void;
  onUpdateStudent: (student: Student) => void;
  onDeleteStudent: (studentId: string) => void;
}

export default function StudentManagement({
  students,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent
}: StudentManagementProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    class: '',
    schoolId: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.class.trim()) {
      newErrors.class = 'Class is required';
    }

    if (!formData.schoolId.trim()) {
      newErrors.schoolId = 'School ID is required';
    } else if (students.some(s => s.schoolId === formData.schoolId && (!selectedStudent || s.id !== selectedStudent.id))) {
      newErrors.schoolId = 'This School ID is already taken';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const newStudent: Student = {
      id: Date.now().toString(),
      ...formData,
      qrCode: `${formData.schoolId}-${formData.name.replace(/\s+/g, '-').toUpperCase()}`
    };
    onAddStudent(newStudent);
    setFormData({ name: '', email: '', class: '', schoolId: '' });
    setErrors({});
    setIsAddDialogOpen(false);
    toast.success(`Student ${formData.name} has been added successfully.`);
  };

  const handleEditStudent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !selectedStudent) {
      return;
    }

    const updatedStudent: Student = {
      ...selectedStudent,
      ...formData,
      qrCode: `${formData.schoolId}-${formData.name.replace(/\s+/g, '-').toUpperCase()}`
    };
    onUpdateStudent(updatedStudent);
    setIsEditDialogOpen(false);
    setSelectedStudent(null);
    setErrors({});
    toast.success(`Student ${formData.name} has been updated successfully.`);
  };

  const openEditDialog = (student: Student) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      class: student.class,
      schoolId: student.schoolId
    });
    setErrors({});
    setIsEditDialogOpen(true);
  };

  const openQRDialog = (student: Student) => {
    setSelectedStudent(student);
    setIsQRDialogOpen(true);
  };

  const openDeleteDialog = (student: Student) => {
    setStudentToDelete(student);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteStudent = () => {
    if (studentToDelete) {
      onDeleteStudent(studentToDelete.id);
      toast.success(`Student ${studentToDelete.name} has been deleted.`);
      setIsDeleteDialogOpen(false);
      setStudentToDelete(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Student Management</CardTitle>
            <CardDescription>Manage student records and QR codes</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
            setIsAddDialogOpen(open);
            if (!open) {
              setFormData({ name: '', email: '', class: '', schoolId: '' });
              setErrors({});
            }
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="border-0 shadow-lg">
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Plus className="h-5 w-5 text-blue-600" />
                  </div>
                  <DialogTitle className="text-blue-900">Add New Student</DialogTitle>
                </div>
                <DialogDescription className="text-slate-600">
                  Enter the student's information to create a new record.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddStudent} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={errors.name ? 'border-destructive' : ''}
                    required
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={errors.email ? 'border-destructive' : ''}
                    required
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Input
                    id="class"
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className={errors.class ? 'border-destructive' : ''}
                    required
                  />
                  {errors.class && (
                    <p className="text-destructive text-sm">{errors.class}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schoolId">School ID</Label>
                  <Input
                    id="schoolId"
                    value={formData.schoolId}
                    onChange={(e) => setFormData({ ...formData, schoolId: e.target.value })}
                    className={errors.schoolId ? 'border-destructive' : ''}
                    required
                  />
                  {errors.schoolId && (
                    <p className="text-destructive text-sm">{errors.schoolId}</p>
                  )}
                </div>
                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-slate-200 text-slate-700 hover:bg-slate-50">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 shadow-sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Student
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>School ID</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.schoolId}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openQRDialog(student)}
                    >
                      <QrCode className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(student)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDeleteDialog(student)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={(open) => {
          setIsEditDialogOpen(open);
          if (!open) {
            setSelectedStudent(null);
            setFormData({ name: '', email: '', class: '', schoolId: '' });
            setErrors({});
          }
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Student</DialogTitle>
              <DialogDescription>
                Update the student's information.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditStudent} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={errors.name ? 'border-destructive' : ''}
                  required
                />
                {errors.name && (
                  <p className="text-destructive text-sm">{errors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={errors.email ? 'border-destructive' : ''}
                  required
                />
                {errors.email && (
                  <p className="text-destructive text-sm">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-class">Class</Label>
                <Input
                  id="edit-class"
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  className={errors.class ? 'border-destructive' : ''}
                  required
                />
                {errors.class && (
                  <p className="text-destructive text-sm">{errors.class}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-schoolId">School ID</Label>
                <Input
                  id="edit-schoolId"
                  value={formData.schoolId}
                  onChange={(e) => setFormData({ ...formData, schoolId: e.target.value })}
                  className={errors.schoolId ? 'border-destructive' : ''}
                  required
                />
                {errors.schoolId && (
                  <p className="text-destructive text-sm">{errors.schoolId}</p>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Update Student</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* QR Code Dialog */}
        <Dialog open={isQRDialogOpen} onOpenChange={setIsQRDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Student QR Code</DialogTitle>
              <DialogDescription>
                {selectedStudent?.name}'s QR code for attendance
              </DialogDescription>
            </DialogHeader>
            {selectedStudent && (
              <QRCodeDisplay
                qrCode={selectedStudent.qrCode}
                studentName={selectedStudent.name}
                schoolId={selectedStudent.schoolId}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent className="border-0 shadow-lg">
            <AlertDialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="h-5 w-5 text-red-600" />
                </div>
                <AlertDialogTitle className="text-red-900">Delete Student</AlertDialogTitle>
              </div>
              <AlertDialogDescription className="text-slate-600 leading-relaxed">
                Are you sure you want to delete <strong className="text-slate-900">{studentToDelete?.name}</strong> (School ID: <strong className="text-slate-900">{studentToDelete?.schoolId}</strong>)? 
                <br /><br />
                This action cannot be undone and will also remove all associated attendance records.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-3">
              <AlertDialogCancel className="border-slate-200 text-slate-700 hover:bg-slate-50">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteStudent}
                className="bg-red-600 text-white hover:bg-red-700 shadow-sm"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Student
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}