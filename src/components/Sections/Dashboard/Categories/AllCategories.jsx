import React from "react";
import CategoriesTable from "./CategoriesTable";

function AllCategories() {
  const categories = [
    {
      id: "m5gr84i9",
      image:
        "https://revision.codesupply.co/revision/wp-content/uploads/sites/2/2024/09/Travel@2x.webp",
      title: "travel",
      posts: 316,
    },
    {
      id: "m5gr84i9",
      image:
        "https://revision.codesupply.co/revision/wp-content/uploads/sites/2/2024/09/Travel@2x.webp",
      title: "travel",
      posts: 316,
    },
    {
      id: "m5gr84i9",
      image:
        "https://revision.codesupply.co/revision/wp-content/uploads/sites/2/2024/09/Travel@2x.webp",
      title: "travel",
      posts: 316,
    },
    {
      id: "m5gr84i9",
      image:
        "https://revision.codesupply.co/revision/wp-content/uploads/sites/2/2024/09/Travel@2x.webp",
      title: "travel",
      posts: 316,
    },
    {
      id: "m5gr84i9",
      image:
        "https://revision.codesupply.co/revision/wp-content/uploads/sites/2/2024/09/Travel@2x.webp",
      title: "travel",
      posts: 316,
    },
    {
      id: "m5gr84i9",
      image:
        "https://revision.codesupply.co/revision/wp-content/uploads/sites/2/2024/09/Travel@2x.webp",
      title: "travel",
      posts: 316,
    },
    {
      id: "m5gr84i9",
      image:
        "https://revision.codesupply.co/revision/wp-content/uploads/sites/2/2024/09/Travel@2x.webp",
      title: "travel",
      posts: 316,
    },
    {
      id: "m5gr84i9",
      image:
        "https://revision.codesupply.co/revision/wp-content/uploads/sites/2/2024/09/Travel@2x.webp",
      title: "travel",
      posts: 316,
    },
  ];
  return (
    <section>
      <h1 className={"title-dashboard-pages"}>Categories</h1>
      <CategoriesTable data={categories} />
    </section>
  );
}

export default AllCategories;
