import React from 'react';

function Features() {
  return (
    <div>
    <div className="py-16 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-4">Features</h2>
      <p className="text-lg mb-8">Here are some amazing features of Simplenote.</p>
      <div className="max-w-4xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 bg-white rounded shadow-md">
          <h3 className="text-2xl font-bold mb-2">Feature 1</h3>
          <p>Short description of feature 1.</p>
        </div>
        <div className="p-4 bg-white rounded shadow-md">
          <h3 className="text-2xl font-bold mb-2">Feature 2</h3>
          <p>Short description of feature 2.</p>
        </div>
        <div className="p-4 bg-white rounded shadow-md">
          <h3 className="text-2xl font-bold mb-2">Feature 3</h3>
          <p>Short description of feature 3.</p>
        </div>
      </div>
    </div>
        <footer className="bg-custom-dark text-white py-8 text-center">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} Simplenote. All rights reserved.</p>
        </div>
      </footer>
      </div>
  );
}

export default Features;
