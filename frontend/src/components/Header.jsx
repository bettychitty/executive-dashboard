import React from 'react';
import { RefreshCw, Plus } from 'lucide-react';
import { Button } from './ui';

/**
 * Header with title, refresh button, and quick task button
 */
export const Header = ({ onRefresh, onQuickTask, isRefreshing }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Title */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Executive Dashboard</h1>
            <p className="text-sm text-slate-600 mt-1">Take control. Stay focused. Get things done.</p>
          </div>

          {/* Right: Action buttons */}
          <div className="flex gap-3 flex-shrink-0">
            <Button
              variant="secondary"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2"
              title="Refresh all data"
            >
              <RefreshCw className={clsx('w-4 h-4', isRefreshing && 'animate-spin')} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button
              variant="primary"
              onClick={onQuickTask}
              className="flex items-center gap-2"
              title="Create a quick task"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Quick Task</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Import clsx
import clsx from 'clsx';
