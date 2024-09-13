function Users({ onlineUsers, selectedUser, setSelectedUser }) {
  return (
    <div className="sidebar">
      <h2> Online Users </h2>
      <ul>
        {onlineUsers.map((user) => (
          <li
            key={user}
            onClick={() => setSelectedUser(user)}
            style={{
              cursor: "pointer",
              fontWeight: selectedUser === user ? "bold" : "normal",
              color: selectedUser === user ? "green" : "black",
            }}
          >
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Users;
