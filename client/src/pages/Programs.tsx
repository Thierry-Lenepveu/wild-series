import { useEffect, useState } from "react";

interface ProgramProps {
  id: number;
  title: string;
  poster: string;
  country: string;
  synopsis: string;
  year: number;
}
function Programs() {
  const [programs, setPrograms] = useState<ProgramProps[]>(
    Array<ProgramProps>(0),
  );

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs`)
      .then((response) => response.json())
      .then((dataReceived) => setPrograms(dataReceived));
  }, []);

  return (
    <>
      <section className="programs">
        {programs.map((program) => {
          return (
            <figure key={program.id}>
              <img src={program.poster} alt={program.title} />
              <figcaption>{`${program.title} - ${program.country}, ${program.year}`}</figcaption>
              <p>{program.synopsis}</p>
            </figure>
          );
        })}
      </section>
    </>
  );
}

export default Programs;
