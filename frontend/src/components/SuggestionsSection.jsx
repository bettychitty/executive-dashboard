import React from 'react';
import { Zap, Mail, MessageSquare, Lightbulb, Trash2 } from 'lucide-react';
import {
  Button,
  Card,
  SectionHeader,
  EmptyState,
  ConfidenceBadge,
  PriorityBadge,
} from './ui';

/**
 * Suggested Tasks Section
 * Shows auto-extracted tasks from emails and Teams messages
 * User can approve (create task) or dismiss
 */
export const SuggestionsSection = ({
  suggestions,
  isLoading,
  onApprove,
  onDismiss,
  approvingId,
  dismissingId,
}) => {
  if (isLoading) {
    return (
      <div className="mb-8">
        <SectionHeader title="💡 Suggestions" />
        <div className="text-center text-slate-500 py-8">Loading suggestions...</div>
      </div>
    );
  }

  const pendingSuggestions = suggestions.filter((s) => s.state === 'pending');

  return (
    <div className="mb-8">
      <SectionHeader
        title="💡 Suggestions"
        subtitle={`${pendingSuggestions.length} extracted from messages`}
      />

      {pendingSuggestions.length === 0 ? (
        <EmptyState
          icon={Lightbulb}
          title="No suggestions"
          description="Auto-extracted tasks from emails and Teams will appear here"
        />
      ) : (
        <div className="space-y-3">
          {pendingSuggestions.map((suggestion) => (
            <Card key={suggestion.id} className="border-l-4 border-l-blue-500">
              <div className="flex flex-col gap-3">
                {/* Header row with title and confidence */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 break-words">
                      {suggestion.title}
                    </h3>
                  </div>
                  <ConfidenceBadge confidence={suggestion.confidence} />
                </div>

                {/* Meta information */}
                <div className="flex items-center gap-3 flex-wrap text-sm">
                  <span className="text-slate-600">
                    {suggestion.source === 'email' && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        From Email
                      </span>
                    )}
                    {suggestion.source === 'teams' && (
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        From Teams
                      </span>
                    )}
                  </span>
                  <PriorityBadge priority={suggestion.priority} />
                </div>

                {/* Reason */}
                {suggestion.reason && (
                  <p className="text-xs text-slate-500 italic">{suggestion.reason}</p>
                )}

                {/* Action buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => onApprove(suggestion.id)}
                    disabled={approvingId === suggestion.id}
                    className="flex-1"
                  >
                    {approvingId === suggestion.id ? '✓ Creating...' : '✓ Approve'}
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDismiss(suggestion.id)}
                    disabled={dismissingId === suggestion.id}
                    className="flex-1"
                  >
                    {dismissingId === suggestion.id ? '✗ Dismissing...' : '✗ Dismiss'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Source Items Section
 * Shows emails and Teams messages that have been imported
 * User can mark as completed or dismissed
 */
export const SourceItemsSection = ({
  sourceItems,
  isLoading,
  onStateChange,
  updatingId,
}) => {
  if (isLoading) {
    return (
      <div className="mb-8">
        <SectionHeader title="📧 Messages" />
        <div className="text-center text-slate-500 py-8">Loading messages...</div>
      </div>
    );
  }

  const openItems = sourceItems.filter((item) => item.state === 'open');

  return (
    <div className="mb-8">
      <SectionHeader
        title="📧 Messages"
        subtitle={`${openItems.length} open message${openItems.length !== 1 ? 's' : ''}`}
      />

      {openItems.length === 0 ? (
        <EmptyState
          icon={Mail}
          title="No open messages"
          description="All messages have been processed"
        />
      ) : (
        <div className="space-y-3">
          {openItems.map((item) => (
            <Card key={item.id}>
              <div className="flex flex-col gap-3">
                {/* Header with source type icon */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {item.source_type === 'email' ? (
                      <Mail className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <MessageSquare className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 break-words">
                        {item.subject}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">From: {item.sender}</p>
                    </div>
                  </div>
                </div>

                {/* Message preview */}
                <p className="text-sm text-slate-600 line-clamp-2">{item.body}</p>

                {/* Meta information */}
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{new Date(item.received_at).toLocaleDateString()}</span>
                  {item.extracted && (
                    <span className="bg-done-100 text-done-700 px-2 py-1 rounded">
                      ✓ Tasks extracted
                    </span>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => onStateChange(item.id, 'completed')}
                    disabled={updatingId === item.id}
                    className="flex-1"
                  >
                    {updatingId === item.id ? '✓ Marking...' : '✓ Completed'}
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onStateChange(item.id, 'dismissed')}
                    disabled={updatingId === item.id}
                    className="flex-1"
                  >
                    {updatingId === item.id ? '✗ Dismissing...' : '✗ Dismiss'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
