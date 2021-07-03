import Grid from './components/grid'
import shapeColor from './shape.json'
import { useState} from 'react'

function App() {
  const shapes: String[] = []
  const colors: String[] = []

  interface IShapeColor {
    name: String,
    color: String
  }

  function initShapeColor() {
    shapeColor.forEach(sc =>  {
      if(!shapes.includes(sc.name)) {
        shapes.push(sc.name)
      }
      if(!colors.includes(sc.color)) {
        colors.push(sc.color)
      }
    })
  }

  initShapeColor() //populate the shapes and colors array


  const [selectedShape, setSelectedShape] = useState(shapes);
  const [selectedColor, setSelectedColor] = useState(colors);
  const [filterText, setFilterText] = useState('All items')
  const [filterCount, setFilterCount] = useState(shapes.length * colors.length)

  //filter and return match shape and color
  function filtering(shape: IShapeColor) {
    if(!selectedShape.length && !selectedColor.length) {
      setSelectedShape(shapes)
      setSelectedColor(colors)
      return shapes.includes(shape.name) && colors.includes(shape.color)
    }
    else if(selectedShape.length && !selectedColor.length) {
      setSelectedColor(colors)
      return selectedShape.includes(shape.name)
    }
    else if(!selectedShape.length && selectedColor.length) {
      setSelectedShape(shapes)
      return selectedColor.includes(shape.color)
    }
    else if(selectedShape.length && selectedColor.length) {
      return selectedShape.includes(shape.name) && selectedColor.includes(shape.color)
    }
  }

  // populate the selectedShape and selectedColor
  const insertFilter = (filter: String, type: String) => {
    if(type === 'shape') {
      if(!selectedShape.includes(filter)) {
        selectedShape.push(filter)
        const newSelectedShape = [...selectedShape]
        setSelectedShape(newSelectedShape)
      } else {
        selectedShape.splice(selectedShape.indexOf(filter), 1)
        const newSelectedShape = selectedShape.filter(shape => shape !== filter);
        setSelectedShape(newSelectedShape)
      }
    }
    else if(type === 'color') {
      if(!selectedColor.includes(filter)) {
        selectedColor.push(filter)
        const newSelectedColor = [...selectedColor]
        setSelectedColor(newSelectedColor)
      } else {
        selectedColor.splice(selectedColor.indexOf(filter), 1)
        const newSelectedColor = selectedColor.filter(color => color !== filter);
        setSelectedColor(newSelectedColor)
      }
    }

    const ssl = selectedShape.length;
    const scl = selectedColor.length;
    const sl = shapes.length
    const cl = colors.length

    if (ssl === sl && scl === cl) {
      setFilterText('All items')
    }
    else if((ssl === sl && scl > 1) || (ssl > 1 && scl === cl)) {
      setFilterText('Multiple items')
    }
    else if((ssl === sl && scl === 1)) {
      setFilterText(`All ${selectedColor[0]} items`)
    }
    else if((ssl > 1 && scl === 1)) {
      setFilterText(`Multiple ${selectedColor[0]} items`)
    }
    else if((ssl === 1 && scl > 1)) {
      setFilterText(`Multiple ${selectedShape[0]} items`)
    }
    else if((ssl === 1 && scl === cl)) {
      setFilterText(`All ${selectedShape[0]} items`)
    }
    else if((ssl === 1 && scl === 1)) {
      setFilterText(`${selectedColor[0]} ${selectedShape[0]} item`)
    }
    setFilterCount(ssl * scl)
  }
  
  return (
    <div className="main">
        <div className="shape-filter">
        <h3>Filter</h3>
        <h3>Shapes</h3>
        <div>
          {shapes.map((shape) => (
            <div key={shapes.indexOf(shape)} onClick={() => insertFilter(shape, 'shape')} className={`shape-filter-element ${selectedShape.includes(shape) ? 'shape-active' : 'null'}`}>{shape}</div>
          ))}
        </div>
        </div>
        <div className="color-filter">
            <h3>Colors</h3>
            <div>
              {colors.map((color) => (
                <div key={colors.indexOf(color)} onClick={() => insertFilter(color, 'color')}  className={`color-round ${selectedColor.includes(color) ? 'color-active' : 'null'} ${color}`}></div>
              ))}
            </div>
        </div>
        <div>
          {filterText} ({filterCount})
        </div>
        <div className="shape-grid">
          <Grid shapes={shapeColor.filter(filtering)} />
        </div>
        </div>
      
  );
}

export default App;
