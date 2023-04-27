import React from "react";

type Props = {};

const CardQuestion: React.FC<Props> = (index) => {
  return (
    <div>
      <input
        type="text"
        name={`question${index}`}
        placeholder={`Pregunta ${index}`}
        className="input-ghost input text-xl font-semibold hover:outline hover:outline-primary focus:bg-transparent focus:outline-primary "
      />
    </div>
  );
};

export default CardQuestion;
