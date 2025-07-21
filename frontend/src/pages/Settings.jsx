// pages/Settings.jsx
import { getUser } from '../hooks/useAuth';

const Settings = () => {
  const user = getUser();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p>Username: {user?.username || 'Not logged in'}</p>
      <p>Email: example@email.com</p>
      <p>Additional settings can go here...</p>
    </div>
  );
};

export default Settings;
