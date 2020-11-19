import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Quote = ({ quote, author, fade, fadeState, color }) => {
  const noAuthor = "Author Unknown";

  return (
    <div
      onAnimationEnd={fadeState}
      className={fade ? "quote fade-in" : "quote"}
    >
      <h3 id="text" className="mb-2">
        <FontAwesomeIcon
          className="quotation"
          icon="quote-left"
          size="2x"
          style={{ color: color }}
        />
        {quote}
      </h3>
      <h5 id="author" className="text-muted font-italic float-right">
        - {author === null ? noAuthor : author}
      </h5>
    </div>
  );
};

export default Quote;
