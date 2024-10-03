import React from "react";

type EmptyMessageProps = {
  title?: string;
  description?: string;
};

const EmptyMessage = ({ title, description }: EmptyMessageProps) => {
  return (
    <section className="flex flex-col gap-2">
      <h1 className="text-3xl text-light">{title}</h1>
      <p className="text-lg text-light/70">{description}</p>
    </section>
  );
};

export default EmptyMessage;
