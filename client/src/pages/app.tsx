import React from 'react';
import AuthProvider from '../modules/auth/useAuthStore';
import Header from '../modules/ui/header/Header' 
import TodoProvider from '../modules/todolist/useTodolistStore'

export default function App() {

  return (
    <AuthProvider>
      <TodoProvider>
        <Header />
      </TodoProvider>
    </AuthProvider>
  ) 
};