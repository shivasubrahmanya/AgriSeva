import { useState, useEffect, useCallback } from 'react';
import localforage from 'localforage';

interface UseOfflineStorageReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  setItem: (value: T) => Promise<void>;
  removeItem: () => Promise<void>;
  clear: () => Promise<void>;
}

// Generic offline storage hook
export const useOfflineStorage = <T>(key: string, defaultValue: T | null = null): UseOfflineStorageReturn<T> => {
  const [data, setData] = useState<T | null>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize localforage with custom config
  useEffect(() => {
    localforage.config({
      driver: localforage.INDEXEDDB,
      name: 'AgriSeva',
      version: 1.0,
      storeName: 'agriseva_store',
    });
  }, []);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const value = await localforage.getItem<T>(key);
        setData(value || defaultValue);
        setError(null);
      } catch (err) {
        setError('Failed to load data from storage');
        console.error('Storage load error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [key, defaultValue]);

  const setItem = useCallback(async (value: T) => {
    try {
      await localforage.setItem(key, value);
      setData(value);
      setError(null);
    } catch (err) {
      setError('Failed to save data to storage');
      console.error('Storage save error:', err);
      throw err;
    }
  }, [key]);

  const removeItem = useCallback(async () => {
    try {
      await localforage.removeItem(key);
      setData(defaultValue);
      setError(null);
    } catch (err) {
      setError('Failed to remove data from storage');
      console.error('Storage remove error:', err);
      throw err;
    }
  }, [key, defaultValue]);

  const clear = useCallback(async () => {
    try {
      await localforage.clear();
      setData(defaultValue);
      setError(null);
    } catch (err) {
      setError('Failed to clear storage');
      console.error('Storage clear error:', err);
      throw err;
    }
  }, [defaultValue]);

  return {
    data,
    loading,
    error,
    setItem,
    removeItem,
    clear,
  };
};

// Specific hooks for different data types
export const useOfflineDrafts = () => {
  return useOfflineStorage<any[]>('drafts', []);
};

export const useOfflineCache = () => {
  return useOfflineStorage<{ [key: string]: any }>('cache', {});
};

export const useOfflineUserPreferences = () => {
  return useOfflineStorage<{
    language: string;
    theme: string;
    voiceEnabled: boolean;
    location: string;
  }>('userPreferences', {
    language: 'en',
    theme: 'light',
    voiceEnabled: true,
    location: '',
  });
};

// Queue manager for offline operations
interface QueueItem {
  id: string;
  type: string;
  data: any;
  timestamp: number;
  retryCount: number;
}

export const useOfflineQueue = () => {
  const { data: queue, setItem: setQueue } = useOfflineStorage<QueueItem[]>('offline_queue', []);

  const addToQueue = useCallback(async (type: string, data: any) => {
    const newItem: QueueItem = {
      id: Date.now().toString(),
      type,
      data,
      timestamp: Date.now(),
      retryCount: 0,
    };

    const currentQueue = queue || [];
    await setQueue([...currentQueue, newItem]);
  }, [queue, setQueue]);

  const removeFromQueue = useCallback(async (id: string) => {
    if (!queue) return;
    const updatedQueue = queue.filter(item => item.id !== id);
    await setQueue(updatedQueue);
  }, [queue, setQueue]);

  const processQueue = useCallback(async (processor: (item: QueueItem) => Promise<boolean>) => {
    if (!queue || queue.length === 0) return;

    const processedItems: string[] = [];

    for (const item of queue) {
      try {
        const success = await processor(item);
        if (success) {
          processedItems.push(item.id);
        } else {
          // Increment retry count
          item.retryCount++;
          if (item.retryCount >= 3) {
            processedItems.push(item.id); // Remove after 3 failed attempts
          }
        }
      } catch (error) {
        console.error('Queue processing error:', error);
        item.retryCount++;
        if (item.retryCount >= 3) {
          processedItems.push(item.id);
        }
      }
    }

    // Remove processed items
    const updatedQueue = queue.filter(item => !processedItems.includes(item.id));
    await setQueue(updatedQueue);
  }, [queue, setQueue]);

  return {
    queue: queue || [],
    addToQueue,
    removeFromQueue,
    processQueue,
  };
};

// Network status hook
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};