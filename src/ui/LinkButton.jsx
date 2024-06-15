/* eslint-disable react/prop-types */
import { Link, useNavigate } from 'react-router-dom';

function LinkButton({ children, to, type, onClick }) {
  const navigate = useNavigate();
  let className = 'text-sm ';

  if (type === 'text') className += ' text-blue-500 hover:text-blue-600';
  else if (type === 'background')
    className += ' text-white hover:text-gray-950';

  if (to === '-1')
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link onClick={onClick} to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
