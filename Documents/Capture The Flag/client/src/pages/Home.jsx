import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {user ? (
        <p>You are logged in as <b>{user.first_name} {user.last_name}</b></p>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
}

export default Home;