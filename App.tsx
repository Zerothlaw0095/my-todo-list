// App.tsx
import React from 'react';
import LandingPage from './components/LandingPage';
import TodoList from './components/TodoList';
import './globals.css'; // Import global styles

const App = () => {
  const [showTodoList, setShowTodoList] = React.useState(false);

  // Function to handle navigation to TodoList component
  const handleStartTodoList = () => {
    setShowTodoList(true);
  };

  return (
    <div className="app-container">
      {!showTodoList ? (
        <LandingPage onStartTodoList={handleStartTodoList} />
      ) : (
        <TodoList />
      )}
    </div>
  );
};

export default App;

