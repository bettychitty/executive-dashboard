import React from 'react';
import {
  Mail, MessageSquare, CheckCircle2, Circle, AlertCircle, Trash2
} from 'lucide-react';
import { Button, Card, SectionHeader, EmptyState, StatusBadge } from './ui';

/**
 * Needs Attention Section
 * Shows urgent items that require immediate action
 */
export const NeedsAttentionSection = ({ tasks, isLoading, onTaskStatusChange }) => {
  const urgentTasks = tasks.filter(
    (task) => task.priority === 'urgent' && task.status !== 'done'
  );

  if (isLoading) {
    return <div className="py-8 text-center text-slate-500">Loading...</div>;
  }

  return (
    <div className="mb-8">
      <SectionHeader
        title="⚡ Needs Attention"
        subtitle={`${urgentTasks.length} urgent item${urgentTasks.length !== 1 ? 's' : ''}`}
      />

      {urgentTasks.length === 0 ? (
        <EmptyState
          icon={AlertCircle}
          title="All clear!"
          description="No urgent items right now"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {urgentTasks.map((task) => (
            <Card key={task.id} className="border-l-4 border-l-urgent-500">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 break-words">
                    {task.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    {task.source === 'email' && 'From: Email'}
                    {task.source === 'teams' && 'From: Teams'}
                    {task.source === 'manual' && 'Manual task'}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => onTaskStatusChange(task.id, 'in_progress')}
                    title="Mark in progress"
                  >
                    ▶
                  </Button>
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => onTaskStatusChange(task.id, 'done')}
                    title="Mark done"
                  >
                    ✓
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
 * Tasks Section
 * Main task list with search and filtering
 */
export const TasksSection = ({ tasks, isLoading, onTaskStatusChange, searchTerm, onSearchChange }) => {
  const filteredTasks = tasks.filter(
    (task) =>
      task.status !== 'done' &&
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completedTasks = tasks.filter((task) => task.status === 'done');

  return (
    <div className="mb-8">
      <SectionHeader
        title="📋 Tasks"
        subtitle={`${filteredTasks.length} active, ${completedTasks.length} completed`}
      />

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isLoading ? (
        <div className="text-center text-slate-500 py-8">Loading tasks...</div>
      ) : filteredTasks.length === 0 ? (
        <EmptyState
          icon={Circle}
          title="No active tasks"
          description="All caught up! Create a new task to get started"
        />
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <Card
              key={task.id}
              className={clsx(
                'flex items-center justify-between',
                task.status === 'in_progress' && 'bg-progress-50 border-progress-200'
              )}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  {task.status === 'in_progress' && (
                    <div className="w-3 h-3 bg-progress-500 rounded-full animate-pulse flex-shrink-0" />
                  )}
                  <h3 className="font-medium text-slate-900 break-words">{task.title}</h3>
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <StatusBadge status={task.status} />
                  {task.due_date && (
                    <span className="text-xs text-slate-500">Due: {task.due_date}</span>
                  )}
                </div>
              </div>

              <div className="flex gap-2 flex-shrink-0 ml-4">
                {task.status !== 'in_progress' && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onTaskStatusChange(task.id, 'in_progress')}
                    title="Start task"
                  >
                    ▶
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => onTaskStatusChange(task.id, 'done')}
                  title="Complete task"
                >
                  ✓
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// Import clsx
import clsx from 'clsx';
