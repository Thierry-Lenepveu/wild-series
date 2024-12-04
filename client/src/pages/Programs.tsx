import { useEffect, useState } from "react";

interface ProgramPros {
  id: number;
  title: string;
  poster: string;
  country: string;
  synopsis: string;
  year: number;
}
function Programs() {
  const [programs, setPrograms] = useState<ProgramPros[]>(
    Array<ProgramPros>(0),
  );

  useEffect(() => {
    fetch("http://localhost:3310/api/programs")
      .then((response) => response.json())
      .then((dataReceived) => setPrograms(dataReceived));
  }, []);

  return (
    <>
      <section>
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
