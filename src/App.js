import React, { useState } from 'react';
import './App.css';
import { Stage, Layer, Circle, Star, Text as KonvaText, Rect, Shape } from 'react-konva';

function App() {
  const [shapes, setShapes] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleDragEnd = (index, e) => {
    const newShapes = [...shapes];
    const updatedShape = newShapes[index];

    if (updatedShape) {
      updatedShape.x = e.target.x();
      updatedShape.y = e.target.y();
      setShapes(newShapes);
    }
  };

  const addShape = (type) => {
    const newShapes = [...shapes];
    newShapes.push({
      type: type,
      x: Math.random() * 400 + 50,
      y: Math.random() * 300 + 50,
    });
    setShapes(newShapes);
  };

  const addText = () => {
    const newShapes = [...shapes];
    newShapes.push({
      type: 'Text',
      text: inputText,
      x: Math.random() * 400 + 50,
      y: Math.random() * 300 + 50,
    });
    setShapes(newShapes);
    setInputText('');
  };

  const addCustomShape = () => {
    const newShapes = [...shapes];
    newShapes.push({
      type: 'CustomShape',
      x: Math.random() * 400 + 50,
      y: Math.random() * 300 + 50,
    });
    setShapes(newShapes);
  };

  const trailLength = 1; // Set the length of the trail
  const arrowSize = 20; // Set the size of the arrowhead

  return (
    <div style={{ textAlign: 'center', padding: '20px', marginBottom: '20px' }}>
      <h1>Drag and Drop Canvas</h1>
      <div style={{ position: 'relative', border: '1px solid #ddd' }}>
        <Stage width={window.innerWidth}
          height={400}
          style={{ border: '1px solid grey' }}>
          <Layer>
            {shapes.map((shape, index) => (
              <React.Fragment key={index}>
                {shape.type === 'Circle' && (
                  <Circle
                    x={shape.x}
                    y={shape.y}
                    radius={10}
                    fill="red"
                    draggable
                    onDragEnd={(e) => handleDragEnd(index, e)}
                  />

                )}
                {shape.type === 'Star' && (

                  <Star
                    x={shape.x}
                    y={shape.y}
                    numPoints={5}
                    innerRadius={10}
                    outerRadius={20}
                    fill="yellow"
                    draggable
                    onDragEnd={(e) => handleDragEnd(index, e)}
                  />

                )}
                {shape.type === 'Text' && (
                  <KonvaText
                    key={index}
                    x={shape.x}
                    y={shape.y}
                    text={shape.text}
                    fontSize={16}
                    draggable
                    onDragEnd={(e) => handleDragEnd(index, e)}
                  />
                )}
                {shape.type === 'CustomShape' && (
                  <Shape
                    sceneFunc={(context, shape) => {
                      // Draw the trail
                      context.beginPath();
                      context.lineTo(20 - trailLength, 50);
                      context.closePath();
                      context.fillStrokeShape(shape);

                      // Draw the arrow line
                      context.beginPath();
                      context.moveTo(20 - trailLength, 80);
                      context.lineTo(220, 80);
                      context.closePath();
                      context.fillStrokeShape(shape);

                      // Draw the arrowhead
                      context.beginPath();
                      context.moveTo(220, 80);
                      context.lineTo(220 - arrowSize, 80 - arrowSize / 2);
                      context.moveTo(220, 80);
                      context.lineTo(220 - arrowSize, 80 + arrowSize / 2);
                      context.closePath();
                      context.fillStrokeShape(shape);
                    }}
                    fill="#00D2FF"
                    stroke="black"
                    strokeWidth={4}
                    draggable
                    onDragEnd={(e) => handleDragEnd(index, e)}

                  />

                )}
              </React.Fragment>
            ))}
          </Layer>
        </Stage>
      </div>
      {/* Buttons for adding shapes to the canvas */}
      <button onClick={() => addShape('Circle')}>
        Add Circle
      </button>
      <button onClick={() => addShape('Star')}>
        Add Star
      </button>
      <button onClick={addCustomShape}>
        Add Custom Shape
      </button>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text"
        />
        <button onClick={addText}>Add Text</button>
      </div>
    </div>
  );
}

export default App;
