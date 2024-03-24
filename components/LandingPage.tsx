// components/LandingPage.tsx
import React from 'react';
import styles from './styles/LandingPage.module.css'; // Import landing page styles

interface LandingPageProps {
  onStartTodoList: () => void; // Callback function to handle navigation to TodoList
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartTodoList }) => {
  return (
    <div className={styles.landingPage}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroHeading}>Akash Pathak TodoApp</h1>
          <p className={styles.heroSubheading}>Make your day productive.</p>
          <button onClick={onStartTodoList} className={styles.ctaButton}>Start Your To-Do List</button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
