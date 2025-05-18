import React, { useState } from 'react';
import { mockAnnouncements } from '../../data/mockData';
import { Bell, Search, Filter, Plus, Pin, Calendar, Download } from 'lucide-react';

const Announcements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('all');

  // Filter announcements based on search term and audience
  const filteredAnnouncements = mockAnnouncements.filter(announcement => {
    const matchesSearch = 
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesAudience = selectedAudience === 'all' || announcement.targetAudience === selectedAudience;
    
    return matchesSearch && matchesAudience;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Announcements</h1>
        <p className="text-gray-600">View and manage school announcements</p>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-blue-600 sm:text-sm"
              />
            </div>

            {/* Audience filter */}
            <div className="relative">
              <select
                value={selectedAudience}
                onChange={(e) => setSelectedAudience(e.target.value)}
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
              >
                <option value="all">All Audiences</option>
                <option value="students">Students</option>
                <option value="teachers">Teachers</option>
                <option value="parents">Parents</option>
                <option value="administrators">Administrators</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <Filter size={16} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Download size={16} className="mr-2" />
              Export
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Plus size={16} className="mr-2" />
              New Announcement
            </button>
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-6">
        {filteredAnnouncements.map((announcement) => (
          <div key={announcement.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${announcement.isImportant ? 'bg-red-100' : 'bg-blue-100'}`}>
                    <Bell size={24} className={announcement.isImportant ? 'text-red-600' : 'text-blue-600'} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                      {announcement.isImportant && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <Pin size={12} className="mr-1" />
                          Important
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {new Date(announcement.date).toLocaleDateString()}
                      </div>
                      <span>•</span>
                      <span>By {announcement.authorName}</span>
                      <span>•</span>
                      <span className="capitalize">{announcement.targetAudience}</span>
                    </div>
                    <p className="mt-3 text-gray-600">{announcement.content}</p>
                    {announcement.attachments && announcement.attachments.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Attachments:</h4>
                        <div className="space-y-2">
                          {announcement.attachments.map((attachment, index) => (
                            <a
                              key={index}
                              href={attachment.url}
                              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                            >
                              <Download size={14} className="mr-1" />
                              {attachment.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredAnnouncements.length === 0 && (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <Bell size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements found</h3>
            <p className="text-gray-600">
              {searchTerm
                ? "No announcements match your search criteria"
                : "There are no announcements to display"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;