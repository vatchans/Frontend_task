import './App.css';
import { useState } from 'react';
function App() {
  const [elements, setElements] = useState([]);
  const [CurrentElement, setCurrent] = useState('And')
  const [inputElements, setInputElements] = useState([])
  const [result,setResult]=useState('')

  const handleInputChange = (index, inputValue) => {
    setInputElements((Prev) => {
      const newInputs = [...Prev];
      newInputs[index] = { ...newInputs[index], inputValue };
      return newInputs;
    })
  }
  const handleSelectOption = (index, selectedoption) => {
    setInputElements((Prev) => {
      const newInputs = [...Prev];
      newInputs[index] = { ...newInputs[index], selectedoption };
      return newInputs;
    })
  }

  const handleInput = () => {
    setInputElements((Prev) => [
      ...Prev,
      { inputValue: "", selectedoption: "" },
    ]);
  }

  const handleSelectChange = (event, index) => {
    const selectedValue = event.target.value;
    setCurrent(selectedValue)
    if (selectedValue === "And") {
      const newElement = { id: index, value: selectedValue };
      setElements([...elements, newElement]);
    }
  };

  const handleDeleteClick = (index) => {
    const updatedElements = elements.filter((element) => element.id !== index);
    setElements(updatedElements);
  };

  const elementOptions = [
    inputElements,
    ['True', 'False'],
    ['Constant', 'argument', 'And', 'Or'],
  ];


  return (
    <div className='container'>

      <div>
        {inputElements.map((input, index) =>
          <div key={index}>
            <input type='text' value={input.inputValue} onChange={(e) => {
              handleInputChange(index, e.target.value)
            }} />
            <select className='selectOption' value={input.selectedoption} onChange={(e) => handleSelectOption(index, e.target.value)}>
              <option value='true'>True</option>
              <option value='false'>false</option>
            </select>

          </div>
        )}
        <button onClick={handleInput}>Add argument</button>
      </div>
      <div style={{display:"flex",gap:'1rem'}}>
      {CurrentElement=== 'argument' ? <select onChange={(e) =>{setResult(e.target.value)}}>
            {inputElements.map((e, i) => {
              return <>
                <option key={i} value={e.selectedoption}>{e.inputValue}</option>
              </>
            })}
          </select>:<select onChange={(event) => {
            CurrentElement==="Or"?setResult(event.target.value):CurrentElement==="Constant"?setResult(event.target.value)
            :handleSelectChange(event, elements.length)}}>
        <option value="default">Select an option</option>
        {elementOptions[CurrentElement === 'And' ? 2 : CurrentElement === "Constant" ? 1 : CurrentElement === "Or" ? 1 : <></>].map((e, i) => {

            return <>
              <option value={e}>{e}</option>
            </>
          })
        }
      </select>
      }

      <button onClick={() => setCurrent('And')}>X</button>
      </div>

      {elements.map((element, i) => (
        <div key={element.id}>
          {element.value == 'argument' ? <select value={element.value} onChange={(event) => setResult(event.target.value)}>
            {inputElements.map((e, i) => {
              return <>
                <option  value={e.selectedoption}>{e.inputValue}</option>
              </>
            })}
          </select> : <select value={element.value} onChange={(event) => handleSelectChange(event, element.id)}>
            {elementOptions[element.value === 'And' ? 2 : element.value === "constant" ? 1 : element.value === "or" ? 2 : <></>].map((option, optionIndex) => (
                <option key={optionIndex} value={option}>
                  {option}
                </option>
              ))}
          </select>}
          <button onClick={() => handleDeleteClick(element.id)}>Delete</button>
        </div>
      ))}

    <p>The Result is {result}</p>


    </div>
  );
}

export default App;
