import React, { useState } from 'react';
import Card, { CardBody, CardHeader, CardFooter } from '../components/UI/Card';
import Button from '../components/UI/Button';
import { User, Lock, Bell, CreditCard, FileText } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'personal' | 'security' | 'notifications' | 'payments' | 'medical'>('personal');
  
  // Mock user data
  const userData = {
    firstName: 'Sachini',
    lastName: 'Apsara',
    email: 'sachini@example.com',
    phone: '(+94) 713-627-559',
    dateOfBirth: '2002-02-23',
    address: '123 Main St,Mirrissa,Matara',
    insurance: {
      provider: 'Blue Cross Blue Shield',
      policyNumber: 'BCB1234567',
      groupNumber: 'GRP987654',
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-2 text-lg text-gray-600">
          Manage your personal information, preferences, and medical history
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 bg-gray-50 p-6 border-b md:border-b-0 md:border-r border-gray-200">
            <div className="flex items-center justify-center md:justify-start mb-6">
              <div className="h-20 w-20 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 text-xl font-bold">
                {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
              </div>
              <div className="ml-4 hidden md:block">
                <h2 className="text-lg font-semibold text-gray-900">{userData.firstName} {userData.lastName}</h2>
                <p className="text-sm text-gray-600">{userData.email}</p>
              </div>
            </div>
            
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('personal')}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'personal'
                    ? 'bg-cyan-700 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User className="h-5 w-5 mr-3" />
                Personal Information
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'security'
                    ? 'bg-cyan-700 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Lock className="h-5 w-5 mr-3" />
                Security
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'notifications'
                    ? 'bg-cyan-700 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Bell className="h-5 w-5 mr-3" />
                Notifications
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'payments'
                    ? 'bg-cyan-700 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <CreditCard className="h-5 w-5 mr-3" />
                Payment Methods
              </button>
              <button
                onClick={() => setActiveTab('medical')}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'medical'
                    ? 'bg-cyan-700 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FileText className="h-5 w-5 mr-3" />
                Medical Records
              </button>
            </nav>
          </div>
          
          <div className="w-full md:w-3/4 p-6">
            {activeTab === 'personal' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        defaultValue={userData.firstName}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-700 focus:border-cyan-700"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        defaultValue={userData.lastName}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-700 focus:border-cyan-700"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        defaultValue={userData.email}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-700 focus:border-cyan-700"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        defaultValue={userData.phone}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-700 focus:border-cyan-700"
                      />
                    </div>
                    <div>
                      <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        defaultValue={userData.dateOfBirth}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-700 focus:border-cyan-700"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        defaultValue={userData.address}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-700 focus:border-cyan-700"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
                
                <Card className="mb-6">
                  <CardHeader>
                    <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
                  </CardHeader>
                  <CardBody>
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="currentPassword"
                          name="currentPassword"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-700 focus:border-cyan-700"
                        />
                      </div>
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-700 focus:border-cyan-700"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-700 focus:border-cyan-700"
                        />
                      </div>
                    </form>
                  </CardBody>
                  <CardFooter>
                    <div className="flex justify-end">
                      <Button>Update Password</Button>
                    </div>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
                  </CardHeader>
                  <CardBody>
                    <p className="text-sm text-gray-600 mb-4">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="two-factor"
                          name="two-factor"
                          type="checkbox"
                          className="h-4 w-4 text-cyan-700 focus:ring-cyan-700 border-gray-300 rounded"
                        />
                        <label htmlFor="two-factor" className="ml-2 block text-sm text-gray-700">
                          Enable two-factor authentication
                        </label>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
                
                <Card className="mb-6">
                  <CardHeader>
                    <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-4">
                      {[
                        'Appointment reminders',
                        'Appointment confirmations',
                        'Appointment cancellations',
                        'Doctor recommendations',
                        'Health tips and news',
                      ].map((notification, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            id={`email-notification-${index}`}
                            name={`email-notification-${index}`}
                            type="checkbox"
                            defaultChecked={index < 3}
                            className="h-4 w-4 text-cyan-700 focus:ring-cyan-700 border-gray-300 rounded"
                          />
                          <label htmlFor={`email-notification-${index}`} className="ml-2 block text-sm text-gray-700">
                            {notification}
                          </label>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
                
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-medium text-gray-900">SMS Notifications</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-4">
                      {[
                        'Appointment reminders (24 hours before)',
                        'Appointment reminders (1 hour before)',
                        'Booking confirmations',
                        'Prescription refill reminders',
                      ].map((notification, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            id={`sms-notification-${index}`}
                            name={`sms-notification-${index}`}
                            type="checkbox"
                            defaultChecked={index < 2}
                            className="h-4 w-4 text-cyan-700 focus:ring-cyan-700 border-gray-300 rounded"
                          />
                          <label htmlFor={`sms-notification-${index}`} className="ml-2 block text-sm text-gray-700">
                            {notification}
                          </label>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                  <CardFooter>
                    <div className="flex justify-end">
                      <Button>Save Preferences</Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            )}
            
            {activeTab === 'payments' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Methods</h2>
                
                <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-cyan-800">
                    Your payment information is encrypted and securely stored. We only charge you when you confirm an appointment that requires payment.
                  </p>
                </div>
                
                <Card className="mb-6">
                  <CardHeader className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Saved Payment Methods</h3>
                    <Button variant="outline" size="sm">Add New</Button>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="h-10 w-16 bg-blue-500 rounded flex items-center justify-center text-white text-sm font-semibold">
                            VISA
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">Visa ending in 4242</p>
                            <p className="text-xs text-gray-600">Expires 05/2026</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">Remove</Button>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-medium text-gray-900">Insurance Information</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="insuranceProvider" className="block text-sm font-medium text-gray-700 mb-1">
                          Insurance Provider
                        </label>
                        <input
                          type="text"
                          id="insuranceProvider"
                          name="insuranceProvider"
                          defaultValue={userData.insurance.provider}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-700 focus:border-cyan-700"
                        />
                      </div>
                      <div>
                        <label htmlFor="policyNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Policy Number
                        </label>
                        <input
                          type="text"
                          id="policyNumber"
                          name="policyNumber"
                          defaultValue={userData.insurance.policyNumber}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-700 focus:border-cyan-700"
                        />
                      </div>
                      <div>
                        <label htmlFor="groupNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Group Number
                        </label>
                        <input
                          type="text"
                          id="groupNumber"
                          name="groupNumber"
                          defaultValue={userData.insurance.groupNumber}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-700 focus:border-cyan-700"
                        />
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter>
                    <div className="flex justify-end">
                      <Button>Update Insurance</Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            )}
            
            {activeTab === 'medical' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Medical Records</h2>
                
                <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-cyan-800">
                    Your medical records are private and secure. Only you and your healthcare providers can access this information.
                  </p>
                </div>
                
                <Card className="mb-6">
                  <CardHeader>
                    <h3 className="text-lg font-medium text-gray-900">Medical History</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Allergies</h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Penicillin
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Peanuts
                          </span>
                          <Button variant="ghost" size="sm">+ Add</Button>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Current Medications</h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">
                            Lisinopril 10mg
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">
                            Vitamin D3
                          </span>
                          <Button variant="ghost" size="sm">+ Add</Button>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Past Surgeries</h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Appendectomy (2018)
                          </span>
                          <Button variant="ghost" size="sm">+ Add</Button>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                
                <Card>
                  <CardHeader className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Documents</h3>
                    <Button variant="outline" size="sm">Upload</Button>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">Lab Results.pdf</p>
                            <p className="text-xs text-gray-600">Uploaded on Jun 12, 2025</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">Vaccination Record.pdf</p>
                            <p className="text-xs text-gray-600">Uploaded on May 03, 2025</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;