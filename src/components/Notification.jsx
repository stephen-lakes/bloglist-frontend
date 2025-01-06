const Notification = ({ message, type }) => {
  if (message === null) return null;
  return (
    <>
      <div className={`${type === "success" ? "success" : "error"}`}>
        {message}
      </div>
    </>
  );
};

Notification.prototype = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Notification;
