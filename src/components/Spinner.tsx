const Spinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={`border-8 border-solid size-12 border-primary border-t-transparent animate-spin rounded-full ${className}`}
    />
  );
};

export default Spinner;
