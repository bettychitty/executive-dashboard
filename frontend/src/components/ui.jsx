import clsx from 'clsx';
import React from 'react';

/**
 * Priority badge component
 */
export const PriorityBadge = ({ priority }) => {
  const styles = {
    urgent: 'bg-urgent-100 text-urgent-700 border border-urgent-300',
    high: 'bg-progress-100 text-progress-700 border border-progress-300',
    medium: 'bg-slate-100 text-slate-700 border border-slate-300',
    low: 'bg-slate-50 text-slate-600 border border-slate-200',
  };

  const labels = {
    urgent: 'Urgent',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  };

  return (
    <span className={clsx('px-3 py-1 text-xs font-semibold rounded-full', styles[priority])}>
      {labels[priority]}
    </span>
  );
};

/**
 * Status badge component
 */
export const StatusBadge = ({ status }) => {
  const styles = {
    not_started: 'bg-slate-100 text-slate-700 border border-slate-300',
    in_progress: 'bg-progress-100 text-progress-700 border border-progress-300',
    done: 'bg-done-100 text-done-700 border border-done-300',
  };

  const labels = {
    not_started: 'Not Started',
    in_progress: 'In Progress',
    done: 'Done',
  };

  return (
    <span className={clsx('px-3 py-1 text-xs font-semibold rounded-full', styles[status])}>
      {labels[status]}
    </span>
  );
};

/**
 * Confidence badge component
 */
export const ConfidenceBadge = ({ confidence }) => {
  const styles = {
    high: 'bg-done-50 text-done-700 border border-done-300',
    medium: 'bg-progress-50 text-progress-700 border border-progress-300',
    low: 'bg-slate-50 text-slate-600 border border-slate-200',
  };

  const labels = {
    high: 'High Confidence',
    medium: 'Medium Confidence',
    low: 'Low Confidence',
  };

  return (
    <span className={clsx('px-2 py-1 text-xs font-medium rounded', styles[confidence])}>
      {labels[confidence]}
    </span>
  );
};

/**
 * Button component
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 active:scale-95',
    success: 'bg-done-500 text-white hover:bg-done-600 active:scale-95',
    danger: 'bg-urgent-500 text-white hover:bg-urgent-600 active:scale-95',
    secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300 active:scale-95',
    ghost: 'text-slate-600 hover:bg-slate-100 active:scale-95',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * Card component
 */
export const Card = ({ children, className, ...props }) => (
  <div
    className={clsx(
      'bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

/**
 * Section header component
 */
export const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
    {subtitle && <p className="text-sm text-slate-600 mt-1">{subtitle}</p>}
  </div>
);

/**
 * Loading spinner component
 */
export const Spinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
  </div>
);

/**
 * Empty state component
 */
export const EmptyState = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    {Icon && <Icon className="w-12 h-12 text-slate-300 mb-4" />}
    <h3 className="text-lg font-semibold text-slate-700 mb-2">{title}</h3>
    {description && <p className="text-sm text-slate-500">{description}</p>}
  </div>
);
