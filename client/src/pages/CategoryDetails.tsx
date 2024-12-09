import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CategoryDeleteForm from "../components/CategoryDeleteForm";

type Category = {
  id: number;
  name: string;
};

function CategoryDetails() {
  const { id } = useParams();
  const [category, setCategory] = useState(null as null | Category);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories/${id}`)
      .then((response) => response.json())
      .then((data: Category) => {
        setCategory(data);
      });
  }, [id]);

  return (
    category && (
      <section className="category-details">
        <h1>{category.name}</h1>
        <div className="link-container">
          <Link to={`/categories/${category.id}/edit`}>Modifier</Link>
        </div>
        <CategoryDeleteForm id={category.id}>Supprimer</CategoryDeleteForm>
      </section>
    )
  );
}

export default CategoryDetails;
