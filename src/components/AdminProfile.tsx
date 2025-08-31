import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { User, Shield, Key, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AdminProfileProps {
  adminEmail: string;
  adminName: string;
  onChangePassword: (newPassword: string) => void;
}

export default function AdminProfile({ adminEmail, adminName, onChangePassword }: AdminProfileProps) {
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  // For demo purposes, we'll use a default admin password
  const defaultAdminPassword = 'admin123';

  const validatePasswordForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    } else if (passwordForm.currentPassword !== defaultAdminPassword) {
      newErrors.currentPassword = 'Current password is incorrect';
    }

    if (!passwordForm.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordForm.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    } else if (passwordForm.newPassword === defaultAdminPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    if (!passwordForm.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate password change process
    setTimeout(() => {
      onChangePassword(passwordForm.newPassword);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setIsPasswordDialogOpen(false);
      setIsLoading(false);
      
      toast.success('Password changed successfully', {
        description: 'Your admin password has been updated'
      });
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setPasswordForm(prev => ({ ...prev, [field]: value }));
    if (passwordErrors[field]) {
      setPasswordErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const resetPasswordForm = () => {
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setPasswordErrors({});
  };

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <User className="h-5 w-5" />
            Admin Profile
          </CardTitle>
          <CardDescription className="text-purple-600">Your administrator account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label className="text-sm text-purple-700">Full Name</Label>
              <p className="p-2 bg-white/60 rounded border border-purple-100">{adminName}</p>
            </div>
            <div>
              <Label className="text-sm text-purple-700">Email Address</Label>
              <p className="p-2 bg-white/60 rounded border border-purple-100">{adminEmail}</p>
            </div>
            <div>
              <Label className="text-sm text-purple-700">Role</Label>
              <p className="p-2 bg-white/60 rounded border border-purple-100">System Administrator</p>
            </div>
            <div>
              <Label className="text-sm text-purple-700">Access Level</Label>
              <p className="p-2 bg-white/60 rounded border border-purple-100">Full System Access</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
          <CardDescription className="text-slate-600">Manage your admin account security and password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Password Management */}
          <div className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-center gap-3">
              <Key className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-blue-800">Administrator Password</p>
                <p className="text-sm text-blue-600">
                  Last updated: Never (using default password)
                </p>
              </div>
            </div>
            <Dialog open={isPasswordDialogOpen} onOpenChange={(open) => {
              setIsPasswordDialogOpen(open);
              if (open) resetPasswordForm();
            }}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                  Change Password
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Admin Password</DialogTitle>
                  <DialogDescription>
                    Create a new password for your administrator account. Make sure it's secure and memorable.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                      className={passwordErrors.currentPassword ? 'border-destructive' : ''}
                      placeholder="Enter your current password"
                    />
                    {passwordErrors.currentPassword && (
                      <p className="text-destructive text-sm">{passwordErrors.currentPassword}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => handleInputChange('newPassword', e.target.value)}
                      className={passwordErrors.newPassword ? 'border-destructive' : ''}
                      placeholder="Enter your new password"
                    />
                    {passwordErrors.newPassword && (
                      <p className="text-destructive text-sm">{passwordErrors.newPassword}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Password must be at least 6 characters long
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={passwordErrors.confirmPassword ? 'border-destructive' : ''}
                      placeholder="Confirm your new password"
                    />
                    {passwordErrors.confirmPassword && (
                      <p className="text-destructive text-sm">{passwordErrors.confirmPassword}</p>
                    )}
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsPasswordDialogOpen(false)}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Changing...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Change Password
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Administrator Privileges */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
            <h4 className="text-purple-800 mb-2">Administrator Privileges</h4>
            <div className="text-sm text-purple-700 space-y-1">
              <p>• Manage teacher accounts and credentials</p>
              <p>• View and edit student information</p>
              <p>• Access all attendance reports and analytics</p>
              <p>• System configuration and settings</p>
              <p>• User role and permission management</p>
            </div>
          </div>

          {/* Security Best Practices */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="mb-2">Security Best Practices</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Use a strong, unique password for your admin account</p>
              <p>• Change your password regularly (every 3-6 months)</p>
              <p>• Never share your admin credentials with others</p>
              <p>• Log out when finished with administrative tasks</p>
              <p>• Monitor system access logs regularly</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}