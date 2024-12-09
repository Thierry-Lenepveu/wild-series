import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface CategoryProps {
  id: number;
  name: string;
}
function Programs() {
  const [categories, setCategories] = useState<CategoryProps[]>(
    Array<CategoryProps>(0),
  );

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then((response) => response.json())
      .then((dataReceived) => setCategories(dataReceived));
  }, []);

  return (
    <>
      <section className="categories">
        <Link to="/categories/new">Ajouter</Link>
        {categories.map((category) => {
          return (
            <figure key={category.id}>
              <figcaption>
                <Link to={`/categories/${category.id}`}>{category.name}</Link>
              </figcaption>
            </figure>
          );
        })}
      </section>
    </>
  );
}

export default Programs;
