function Profile({ user }) {
  return (
    <div style={{ width: "30vw", height: "30vh" }}>
      <img
        src={user.photo}
        style={{ width: "100px", height: "100px", objectFit: "contain" }}
      />
      <h4> {user.name}</h4>
    </div>
  );
}
