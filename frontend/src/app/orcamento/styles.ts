export const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#EFF6FF",
    },
  
    card: {
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "10px",
      width: "400px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column" as const,
      gap: "15px",
    },
  
    title: {
      textAlign: "center" as const,
      color: "#1E3A8A",
    },
  
    input: {
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #93C5FD",
    },
  
    button: {
      backgroundColor: "#3B82F6",
      color: "#fff",
      padding: "10px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
    },
  
    secondaryButton: {
      backgroundColor: "#DBEAFE",
      color: "#1E3A8A",
      padding: "10px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
    },
  };