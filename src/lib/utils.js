import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('QuizDB', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('quizHistory')) {
        db.createObjectStore('quizHistory', { keyPath: 'id' });
      }
    };
  });
};

export const getQuizHistory = async () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('QuizDB', 1);

    request.onerror = () => reject(request.error);

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['quizHistory'], 'readonly');
      const store = transaction.objectStore('quizHistory');
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => {
        resolve(getAllRequest.result.sort((a, b) => new Date(b.date) - new Date(a.date)));
      };

      getAllRequest.onerror = () => reject(getAllRequest.error);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('quizHistory')) {
        db.createObjectStore('quizHistory', { keyPath: 'id' });
      }
    };
  });
};
