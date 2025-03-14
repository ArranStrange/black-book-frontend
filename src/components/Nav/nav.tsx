import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./nav.css";

//typescript defining props
interface Props {
  onSelectLetter: (letter: string) => void;
}

export default function Nav({
  //props
  onSelectLetter,
}: Props) {
  //
  //state
  // selected letter state starts with an empty string
  const [selectedLetter, setSelectedLetter] = useState("");
  //
  //
  // handles the letter click, takes
  const handleLetterClick = (letter: string) => {
    // calls the prop function and passes the selected letter
    onSelectLetter(letter);
    // updates the letter state so Nav can disaply the letter
    setSelectedLetter(letter);
    // scrolls to the top/to the start of the array
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  //
  // useEffect calls the letter click function on render with no params
  useEffect(() => {
    handleLetterClick("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav>
      <motion.h1 className="current-letter">{selectedLetter}</motion.h1>
      <div className="alphabet">
        {
          // passes an object with a length property set to 26 to Array.from.
          Array.from(
            { length: 26 },
            // maps over the array converting it to the corresponding uppercase letter (A-Z)
            // 65 = ASCII (and Unicode) code for A
            (_, i) => String.fromCharCode(65 + i)
            // then iterates over it with .map() to render each letter as a list item
          ).map((letter, index) => (
            <motion.li
              whileHover={{ scale: 1.5 }}
              key={index}
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </motion.li>
          ))
        }
      </div>
    </nav>
  );
}
