import React, { useState } from 'react';
import FormLevelOne from './FormLevelOne';
import FormLevelTwo from './FormLevelTwo';
import FormLevelThree from './FormLevelThree';

enum selectForm {
  LEVEL_ONE,
  LEVEL_TWO,
  LEVEL_THREE
}

const App: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<selectForm>(selectForm.LEVEL_ONE);

  const handleClick = (payload: string) => {
    switch (payload) {
      case 'LEVEL_ONE':
        setSelectedForm(selectForm.LEVEL_ONE);
        break;
      case 'LEVEL_TWO':
        setSelectedForm(selectForm.LEVEL_TWO);
        break;
      case 'LEVEL_THREE':
        setSelectedForm(selectForm.LEVEL_THREE);
        break;
      default:
        setSelectedForm(selectForm.LEVEL_ONE);
    }
  };

  const getNavbarClass = () => {
    switch (selectedForm) {
      case selectForm.LEVEL_ONE:
        return 'bg-purple-600';
      case selectForm.LEVEL_TWO:
        return 'bg-orange-600';
      case selectForm.LEVEL_THREE:
        return 'bg-red-600';
      default:
        return 'bg-purple-600';
    }
  };

  return (
    <div className="App">
      <header className={`App-header ${getNavbarClass()} text-white py-4`}>
        <h1 className="text-2xl text-center">Event Registration Form</h1>
      </header>
      <main className="p-4">
        <div className="flex items-center justify-around gap-5">
          <button
            className="w-full py-2 px-4 bg-violet-500 text-white rounded hover:bg-violet-600"
            onClick={() => handleClick('LEVEL_ONE')}
          >
            Level 1
          </button>
          <button
            className="w-full py-2 px-4 bg-orange-500 text-white rounded hover:bg-orange-600"
            onClick={() => handleClick('LEVEL_TWO')}
          >
            Level 2
          </button>
          <button
            className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => handleClick('LEVEL_THREE')}
          >
            Level 3
          </button>
        </div>
        {selectedForm === selectForm.LEVEL_ONE && <FormLevelOne />}
        {selectedForm === selectForm.LEVEL_TWO && <FormLevelTwo />}
        {selectedForm === selectForm.LEVEL_THREE && <FormLevelThree />}
      </main>
    </div>
  );
};

export default App;
