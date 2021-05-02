import React from 'react';
import AuthProvider from '../modules/auth/useAuthStore';
import Header from '../modules/ui/header/Header' 
import TodoProvider from '../modules/todolist/useTodolistStore'
import App from '../modules/app/App'

export default function AppPage() {

  return (
    <AuthProvider>
      <TodoProvider>
        <Header />
        <App />
      </TodoProvider>
    </AuthProvider>
  ) 
};