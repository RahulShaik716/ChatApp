import "./ProfileModal.css"; // Include CSS for modal styling

const ProfileModal = ({ closeModal, user }) => {
  return (
    <div
      style={{
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          boxShadow: " 0 2px 10px rgba(0,0,0,0.1)",
          background: "white",
          borderRadius: "8px",
          width: "30vw",
        }}
      >
        <h3 style={{ textAlign: "center" }}>Profile</h3>
        <img
          src={user.photo}
          style={{ objectFit: "contain", height: "30vh" }}
        />
        <p style={{ textTransform: "capitalize", textAlign: "center" }}>
          {" "}
          {user.name}
        </p>
      </div>
    </div>
  );
};

export default ProfileModal;
