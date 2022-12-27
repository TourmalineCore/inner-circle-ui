import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigation = useNavigate();

  useEffect(() => {
    navigation('/analytics');
  }, []);
  return (
    <div />
  );
}

export default HomePage;
