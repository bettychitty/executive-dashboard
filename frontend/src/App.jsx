import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { NeedsAttentionSection, TasksSection } from './components/TasksSection';
import { SuggestionsSection, SourceItemsSection } from './components/SuggestionsSection';
import { QuickTaskModal } from './components/QuickTaskModal';
import { api } from './api';
import './index.css';

function App() {
  // State management
  const [tasks, setTasks] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [sourceItems, setSourceItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [approvingId, setApprovingId] = useState(null);
  const [dismissingId, setDismissingId] = useState(null);
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [creatingTask, setCreatingTask] = useState(false);

  /**
   * Load all data from backend
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [tasksData, suggestionsData, sourceItemsData] = await Promise.all([
        api.getTasks(),
        api.getSuggestions(),
        api.getSourceItems(),
      ]);

      setTasks(tasksData);
      setSuggestions(suggestionsData);
      setSourceItems(sourceItemsData);
    } catch (error) {
      console.error('Failed to load data:', error);
      alert('Failed to load data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Load data on component mount
   */
  useEffect(() => {
    loadData();
  }, [loadData]);

  /**
   * Handle task status change (optimistic update)
   */
  const handleTaskStatusChange = async (taskId, newStatus) => {
    // Optimistic update
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    try {
      await api.updateTaskStatus(taskId, newStatus);
    } catch (error) {
      console.error('Failed to update task:', error);
      alert('Failed to update task');
      // Reload data on error
      loadData();
    }
  };

  /**
   * Handle suggestion approval
   */
  const handleApproveSuggestion = async (suggestionId) => {
    setApprovingId(suggestionId);
    try {
      await api.approveSuggestion(suggestionId);
      // Update suggestion state
      setSuggestions((prev) =>
        prev.map((s) =>
          s.id === suggestionId ? { ...s, state: 'approved' } : s
        )
      );
      // Reload tasks to show new task
      await loadData();
    } catch (error) {
      console.error('Failed to approve suggestion:', error);
      alert('Failed to approve suggestion');
    } finally {
      setApprovingId(null);
    }
  };

  /**
   * Handle suggestion dismissal
   */
  const handleDismissSuggestion = async (suggestionId) => {
    setDismissingId(suggestionId);
    try {
      await api.dismissSuggestion(suggestionId);
      // Update suggestion state
      setSuggestions((prev) =>
        prev.map((s) =>
          s.id === suggestionId ? { ...s, state: 'dismissed' } : s
        )
      );
    } catch (error) {
      console.error('Failed to dismiss suggestion:', error);
      alert('Failed to dismiss suggestion');
    } finally {
      setDismissingId(null);
    }
  };

  /**
   * Handle source item state change
   */
  const handleSourceItemStateChange = async (itemId, newState) => {
    setUpdatingItemId(itemId);
    try {
      await api.updateSourceItemState(itemId, newState);
      // Update item state
      setSourceItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, state: newState } : item
        )
      );
    } catch (error) {
      console.error('Failed to update source item:', error);
      alert('Failed to update message state');
    } finally {
      setUpdatingItemId(null);
    }
  };

  /**
   * Handle quick task creation
   */
  const handleQuickTaskCreate = async (taskData) => {
    setCreatingTask(true);
    try {
      const newTask = await api.createTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
      setModalOpen(false);
    } catch (error) {
      console.error('Failed to create task:', error);
      alert('Failed to create task');
    } finally {
      setCreatingTask(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <Header
        onRefresh={loadData}
        onQuickTask={() => setModalOpen(true)}
        isRefreshing={loading}
      />

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Needs Attention Section */}
        <NeedsAttentionSection
          tasks={tasks}
          isLoading={loading}
          onTaskStatusChange={handleTaskStatusChange}
        />

        {/* Tasks Section */}
        <TasksSection
          tasks={tasks}
          isLoading={loading}
          onTaskStatusChange={handleTaskStatusChange}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Suggestions Section */}
        <SuggestionsSection
          suggestions={suggestions}
          isLoading={loading}
          onApprove={handleApproveSuggestion}
          onDismiss={handleDismissSuggestion}
          approvingId={approvingId}
          dismissingId={dismissingId}
        />

        {/* Source Items Section */}
        <SourceItemsSection
          sourceItems={sourceItems}
          isLoading={loading}
          onStateChange={handleSourceItemStateChange}
          updatingId={updatingItemId}
        />
      </main>

      {/* Quick Task Modal */}
      <QuickTaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleQuickTaskCreate}
        isLoading={creatingTask}
      />
    </div>
  );
}

export default App;
