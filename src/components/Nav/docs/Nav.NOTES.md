# 🧭 Nav Component Notes

This component renders the alphabetical navigation bar used to filter drinks by the first letter of their name.

---

## Props

```ts
interface Props {
  onSelectLetter: (letter: string) => void;
}
onSelectLetter: A callback function passed from the parent component that receives the selected letter when clicked.

State
ts
Copy
Edit
const [selectedLetter, setSelectedLetter] = useState("");
Stores the currently selected letter.

Initialized to an empty string so the list isn't filtered on initial render.

handleLetterClick(letter)
Calls the onSelectLetter function with the given letter.

Updates selectedLetter state so the component can visually reflect the selection.

Scrolls to the top of the page for a smooth UX when a new letter is selected.

ts
Copy
Edit
const handleLetterClick = (letter: string) => {
  onSelectLetter(letter);
  setSelectedLetter(letter);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
useEffect on Mount
ts
Copy
Edit
useEffect(() => {
  handleLetterClick("");
}, []);
Automatically calls handleLetterClick with an empty string when the component mounts.

This ensures the full, unfiltered drink list is displayed initially.

UI Structure
<h1 className="current-letter">
Displays the currently selected letter at the top of the nav bar.

<ul className="alphabet">
Contains clickable <li> elements for each letter A–Z.

Array.from({ length: 26 }) is used to dynamically generate the letters using ASCII codes.

Clicking a letter triggers the handleLetterClick function.

tsx
Copy
Edit
<ul className="alphabet">
  {Array.from({ length: 26 }, (_, i) => {
    const letter = String.fromCharCode(65 + i);
    return <li onClick={() => handleLetterClick(letter)}>{letter}</li>;
  })}
</ul>
```
