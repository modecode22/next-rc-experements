'use client'
import React, { useState } from 'react';
import { LuPlus } from 'react-icons/lu';

interface SvgConverterProps {
  onAddIcon: (icon: string) => void;
}

const SvgConverter: React.FC<SvgConverterProps> = ({ onAddIcon }) => {
  const [svgInput, setSvgInput] = useState('');

  const handleSvgInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSvgInput(e.target.value);
  };

  const handleConvertClick = () => {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgInput, 'image/svg+xml');
    const svgElement = svgDoc.getElementsByTagName('svg')[0];

    if (svgElement) {
      svgElement.removeAttribute('width');
      svgElement.removeAttribute('height');
      svgElement.setAttribute('class', 'size-5');
      Array.from(svgElement.getElementsByTagName('path')).forEach(path => {
        if (path.getAttribute('stroke')) {
          path.setAttribute('stroke', 'currentColor');
        }
      });

      const svgString = new XMLSerializer().serializeToString(svgDoc);
      onAddIcon(svgString);
      setSvgInput('');
    } else {
      alert('Invalid SVG code. Please check your input.');
    }
  };

  return (
    <div className="flex  items-start gap-2 w-full">
      <input
        value={svgInput}
        // onChangeCapture={handleSvgInputChange}
        onChange={handleSvgInputChange}
        placeholder="Paste your SVG code here..."
        className=" h-8 p-2 border rounded w-1/2 bg-neutral-900/50 border-neutral-900 placeholder:text-neutral-500"
      />
      <button
        onClick={handleConvertClick}
        className="bg-neutral-700 h-8 px-6 rounded-xl w-fit hover:bg-neutral-700/80 active:bg-neutral-700/60  shadow-sm hover:shadow-none duration-75 flex items-center gap-2"
      >
        Convert & Add Icon <LuPlus className='size-5' />
      </button>
    </div>
  );
};

export default SvgConverter;
