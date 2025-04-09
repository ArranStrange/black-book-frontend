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
      <h1 className="current-letter">{selectedLetter}</h1>
      <ul className="alphabet">
        {Array.from({ length: 26 }, (_, i) => {
          const letter = String.fromCharCode(65 + i);
          return (
            <li key={i} onClick={() => handleLetterClick(letter)}>
              {letter}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
