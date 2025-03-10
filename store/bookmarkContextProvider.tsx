import React, { createContext, useState, ReactNode } from 'react';

interface SavedItemsContextType {
  savedItems: [];
  addItem: (item: any) => void;
}

export const BookmarkContext = createContext<SavedItemsContextType>({
  savedItems: [],
  addItem: () => {},
});

interface SavedItemsProviderProps {
  children: ReactNode;
}

export const BookmarkContextProvider: React.FC<SavedItemsProviderProps> = ({ children }) => {
  const [savedItems, setSavedItems] = useState<any>([]);

  const addItem = (item: any) => {
    setSavedItems(item);
  };

  return (
    <BookmarkContext.Provider value={{ savedItems, addItem}}>
      {children}
    </BookmarkContext.Provider>
  );
};
