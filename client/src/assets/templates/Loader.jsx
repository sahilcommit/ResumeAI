const Loader = ({ fullScreen = true }) => {
    return (
      <div
        className={`flex items-center justify-center ${
          fullScreen ? "h-screen" : "h-full"
        }`}
      >
        <div className="w-12 h-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  };
  
  export default Loader;