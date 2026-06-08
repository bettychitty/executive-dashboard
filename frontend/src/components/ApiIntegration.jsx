import React, { useState } from 'react';
import { Mail, MessageSquare } from 'lucide-react';
import { Button, Card, SectionHeader } from './ui';

/**
 * API Integration Section
 * Allows users to import tasks from external sources
 */
export const ApiIntegrationSection = ({ onImportComplete }) => {
  const [activeTab, setActiveTab] = useState('email');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Email import form
  const [emailData, setEmailData] = useState({
    sender: '',
    subject: '',
    body: '',
  });

  // Teams import form
  const [teamsData, setTeamsData] = useState({
    sender: '',
    channel: '',
    message: '',
  });

  const handleEmailImport = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:8000'}/api/import/source-item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_type: 'email',
          sender: emailData.sender,
          subject: emailData.subject,
          body: emailData.body,
        }),
      });

      if (!response.ok) throw new Error('Failed to import email');

      const data = await response.json();
      setResult({
        type: 'success',
        message: 'Email imported successfully!',
        data,
      });

      // Clear form
      setEmailData({ sender: '', subject: '', body: '' });

      // Notify parent
      if (onImportComplete) onImportComplete();
    } catch (err) {
      setError(err.message);
      setResult({
        type: 'error',
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTeamsImport = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:8000'}/api/import/source-item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_type: 'teams',
          sender: teamsData.sender,
          channel: teamsData.channel,
          body: teamsData.message,
        }),
      });

      if (!response.ok) throw new Error('Failed to import Teams message');

      const data = await response.json();
      setResult({
        type: 'success',
        message: 'Teams message imported successfully!',
        data,
      });

      // Clear form
      setTeamsData({ sender: '', channel: '', message: '' });

      // Notify parent
      if (onImportComplete) onImportComplete();
    } catch (err) {
      setError(err.message);
      setResult({
        type: 'error',
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <SectionHeader
        title="🔌 API Integration"
        subtitle="Import tasks from emails and Teams messages"
      />

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('email')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'email'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Mail className="w-4 h-4 inline mr-2" />
          Email Import
        </button>
        <button
          onClick={() => setActiveTab('teams')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'teams'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <MessageSquare className="w-4 h-4 inline mr-2" />
          Teams Import
        </button>
      </div>

      {/* Email Import Form */}
      {activeTab === 'email' && (
        <Card>
          <form onSubmit={handleEmailImport} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                From Email
              </label>
              <input
                type="email"
                value={emailData.sender}
                onChange={(e) => setEmailData({ ...emailData, sender: e.target.value })}
                placeholder="sender@example.com"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={emailData.subject}
                onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                placeholder="Email subject"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Body
              </label>
              <textarea
                value={emailData.body}
                onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
                placeholder="Email content..."
                rows="6"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="p-3 bg-urgent-50 border border-urgent-200 rounded-lg text-urgent-700 text-sm">
                {error}
              </div>
            )}

            {result?.type === 'success' && (
              <div className="p-3 bg-done-50 border border-done-200 rounded-lg text-done-700 text-sm">
                {result.message}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              disabled={loading || !emailData.sender || !emailData.subject || !emailData.body}
              className="w-full"
            >
              {loading ? 'Importing...' : 'Import Email'}
            </Button>
          </form>
        </Card>
      )}

      {/* Teams Import Form */}
      {activeTab === 'teams' && (
        <Card>
          <form onSubmit={handleTeamsImport} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                From User
              </label>
              <input
                type="text"
                value={teamsData.sender}
                onChange={(e) => setTeamsData({ ...teamsData, sender: e.target.value })}
                placeholder="User name"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Channel
              </label>
              <input
                type="text"
                value={teamsData.channel}
                onChange={(e) => setTeamsData({ ...teamsData, channel: e.target.value })}
                placeholder="Channel name"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Message
              </label>
              <textarea
                value={teamsData.message}
                onChange={(e) => setTeamsData({ ...teamsData, message: e.target.value })}
                placeholder="Teams message content..."
                rows="6"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="p-3 bg-urgent-50 border border-urgent-200 rounded-lg text-urgent-700 text-sm">
                {error}
              </div>
            )}

            {result?.type === 'success' && (
              <div className="p-3 bg-done-50 border border-done-200 rounded-lg text-done-700 text-sm">
                {result.message}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              disabled={loading || !teamsData.sender || !teamsData.channel || !teamsData.message}
              className="w-full"
            >
              {loading ? 'Importing...' : 'Import Teams Message'}
            </Button>
          </form>
        </Card>
      )}

      {/* API Documentation */}
      <Card className="mt-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-3">📚 API Documentation</h3>
        <p className="text-sm text-blue-700 mb-3">
          Import messages from external sources. The backend will automatically extract task suggestions.
        </p>
        <code className="block text-xs bg-white p-3 rounded border border-blue-200 text-slate-900 overflow-x-auto">
          POST /api/import/source-item
        </code>
        <p className="text-xs text-blue-700 mt-2">
          Response includes extracted suggestions and source item ID for tracking.
        </p>
      </Card>
    </div>
  );
};
