import React from "react";

const CategoryHeader = ({ category }: { category: string }) => {
  return <h1 className="text-xl">{category}</h1>;
};

export default CategoryHeader;
