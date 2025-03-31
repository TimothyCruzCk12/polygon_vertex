import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';

const PolygonVertex = () => {
  const [selectedShape, setSelectedShape] = useState('triangle');
  const [selectedVertices, setSelectedVertices] = useState(new Set());
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasError, setHasError] = useState(false);

  const shapeInfo = {
    'triangle': { name: 'Triangle', plural: 'Triangles', vertices: 3 },
    'square': { name: 'Square', plural: 'Squares', vertices: 4 },
    'pentagon': { name: 'Pentagon', plural: 'Pentagons', vertices: 5 },
    'hexagon': { name: 'Hexagon', plural: 'Hexagons', vertices: 6 }
  };

  const shapes = {
    triangle: {
      points: [
        [200, 100],
        [100, 300],
        [300, 300]
      ]
    },
    square: {
      points: [
        [150, 150],
        [250, 150],
        [250, 250],
        [150, 250]
      ]
    },
    pentagon: {
      points: [
        [200, 100],
        [280, 160],
        [250, 250],
        [150, 250],
        [120, 160]
      ]
    },
    hexagon: {
      points: [
        [200, 100],
        [280, 150],
        [280, 250],
        [200, 300],
        [120, 250],
        [120, 150]
      ]
    }
  };

  const handleAnswerSubmit = () => {
    const correctAnswer = shapeInfo[selectedShape].vertices;
    if (parseInt(userAnswer) === correctAnswer) {
      setIsCorrect(true);
      setHasError(false);
    } else {
      setHasError(true);
    }
  };

  const resetAnswer = () => {
    setUserAnswer('');
    setIsCorrect(false);
    setHasError(false);
  };

  const handleVertexClick = (index, event) => {
    event.stopPropagation();
    setSelectedVertices(prev => {
      const newSet = new Set(prev);
      newSet.add(`${selectedShape}-${index}`);
      return newSet;
    });
  };

  const handleShapeChange = (shape) => {
    setSelectedShape(shape);
    setSelectedVertices(new Set());
    resetAnswer();
  };

  const renderPolygon = () => {
    const shape = shapes[selectedShape];
    const points = shape.points.map(point => point.join(',')).join(' ');

    return (
      <svg width="400" height="400" className="bg-sky-50 rounded-lg shadow-md">
        <polygon
          points={points}
          fill="#0ea5e9"
          fillOpacity="0.2"
          stroke="#0ea5e9"
          strokeWidth="2"
        />
        {shape.points.map((point, index) => (
          <circle
            key={index}
            cx={point[0]}
            cy={point[1]}
            r={selectedVertices.has(`${selectedShape}-${index}`) ? "6" : "4"}
            fill={selectedVertices.has(`${selectedShape}-${index}`) ? "#22c55e" : "#0ea5e9"}
            stroke="white"
            strokeWidth="2"
            className="cursor-pointer hover:fill-green-400"
            onClick={(e) => handleVertexClick(index, e)}
          />
        ))}
      </svg>
    );
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <Card className="w-full max-w-4xl mx-auto shadow-md bg-white">
        <CardHeader className="bg-sky-100 text-sky-800">
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-bold">Polygon Vertex Explorer</CardTitle>
          </div>
          <CardDescription className="text-sky-700 text-lg">Learn about vertices in polygons!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <Alert className="bg-blue-50 border-blue-100">
            <AlertTitle className="text-blue-700">What is a Vertex?</AlertTitle>
            <AlertDescription className="text-blue-600">
              A vertex is a point where two sides of a polygon meet. You can think of it as a corner of the shape. For example, a triangle has three vertices where its sides meet.
            </AlertDescription>
          </Alert>
          <div className="space-y-6">
            <div className="flex gap-3 flex-wrap justify-center">
              {Object.entries(shapeInfo).map(([shape, info]) => (
                <button
                  key={shape}
                  onClick={() => handleShapeChange(shape)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedShape === shape
                      ? 'bg-sky-500 text-white'
                      : 'bg-sky-100 hover:bg-sky-200 text-sky-700'
                  }`}
                >
                  {info.name}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              {renderPolygon()}
            </div>
            <div className="flex justify-center items-center space-x-4">
              {!isCorrect ? (
                <>
                  <p className="text-sky-700">How many vertices do {shapeInfo[selectedShape].plural} have?</p>
                  <input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className={`w-20 px-3 py-2 border rounded-lg ${
                      hasError ? 'border-red-500 focus:ring-red-500' : 'border-sky-200 focus:ring-sky-500'
                    } focus:outline-none focus:ring-2`}
                  />
                  <button
                    onClick={handleAnswerSubmit}
                    className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                  >
                    Check
                  </button>
                </>
              ) : (
                <p className="text-green-600 font-medium">
                  {shapeInfo[selectedShape].plural} have {shapeInfo[selectedShape].vertices} vertices!
                </p>
              )}
            </div>
            <p className="text-sm text-sky-600 text-center">
              Click on the vertices to highlight them
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PolygonVertex;