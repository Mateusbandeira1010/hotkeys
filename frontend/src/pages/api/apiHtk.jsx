import { useEffect, useState } from "react";

const ApiHtk = () => {
  const [test, settest] = useState([]);

  useEffect(() => {
    fetch("test")
      .then((res) => res.json())
      .then((data) => setPokemon(data.results));
  }, []);

  return (
    <div>
      <h1>Em andamento</h1>
      <ul>
        {test.map((test, index) => (
          <li key={index}>{test.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ApiHtk;
