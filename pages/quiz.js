/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';

function Quiz() {
  const [name, setName] = useState('');

  useEffect(() => {
    const url = window.location.href;
    const newUrl = new URL(url);
    const params = newUrl.searchParams.get('name');

    setName(params);
  }, []);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <h1 style={{ color: 'red' }}>
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        O {name} ficou louco
      </h1>
    </div>
  );
}

export default Quiz;
