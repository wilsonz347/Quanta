import React from 'react';
import { Button } from '@shadcn/ui';

function App() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Button className="bg-blue-500 text-white p-4 rounded-lg">
        ShadCN Button with Tailwind Styles
      </Button>
    </div>
  );
}

export default App;