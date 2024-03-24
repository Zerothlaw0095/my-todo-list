//pages/index.tsx
import { useState } from 'react';
import LandingPage from '../components/LandingPage';
import TodoList from '../components/TodoList';
import styles from '../components/styles/Home.module.css';

const Home = () => {
  const [showTodoList, setShowTodoList] = useState(false);

  const handleStartTodoList = () => {
    setShowTodoList(true);
  };

  return (
    <div className={styles.container}>
      {!showTodoList ? <LandingPage onStartTodoList={handleStartTodoList} /> : <TodoList />}
    </div>
  );
};

export default Home;
