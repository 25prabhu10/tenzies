export const Button = ({ className, children, handleClick }) => (
  <button className={className} onClick={handleClick}>
    {children}
  </button>
);
