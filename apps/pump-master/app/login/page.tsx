import { Login } from '../../features/auth/components';

export default function Index() {
  return (
    <div>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
      >
        <Login />
      </div>
    </div>
  );
}
