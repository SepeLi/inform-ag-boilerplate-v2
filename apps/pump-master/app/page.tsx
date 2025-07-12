'use client';
import styles from './page.module.css';
import { LoginForm } from '@inform-ag-boilerplate-v2/ui';
export default function Index() {
  // Placeholder for login logic
  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    // TODO: Connect to tRPC login mutation and Redux
    console.log(values);
  };

  return (
    <div className={styles.page}>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
      >
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}
