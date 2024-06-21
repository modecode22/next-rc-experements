"use client";
import React, { useState, useEffect } from "react";
import { LuCopy, LuDownload, LuTrash } from "react-icons/lu";
import SvgConverter from "./SvgConverter";

export default function Home() {
  const [icons, setIcons] = useState<string[]>([]);

  useEffect(() => {
    const storedIcons = localStorage.getItem("icons");
    if (storedIcons) {
      setIcons(JSON.parse(storedIcons));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("icons", JSON.stringify(icons));
  }, [icons]);

  const handleAddIcon = (icon: string) => {
    setIcons([...icons, icon]);
  };

  const handleDeleteIcon = (index: number) => {
    const updatedIcons = icons.filter((_, i) => i !== index);
    setIcons(updatedIcons);
  };
  return (
    <div className="">
      <header className="w-full h-14 shadow-sm bg-neutral-800 flex items-center px-6">
        <SvgConverter onAddIcon={handleAddIcon} />
      </header>
      <main className="p-6 flex gap-4 flex-wrap">

        
        {icons.map((icon, index) => (
          <section
            key={index}
            className="bg-neutral-800 shadow-md rounded-xl flex flex-col p-2 w-fit gap-2"
          >
            <div className="w-full shadow-inner bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 rounded-xl p-6 flex justify-center items-center">
              <div dangerouslySetInnerHTML={{ __html: icon }} />
            </div>
            <div className="flex items-center gap-2 w-full justify-center">
              <button onClick={() => navigator.clipboard.writeText(icon)}>
                <LuCopy />
              </button>
              <button onClick={() => downloadTSX(icon, index)}>
                <LuDownload />
              </button>
              <button onClick={() => handleDeleteIcon(index)}>
                <LuTrash />
              </button>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

const downloadTSX = (svg: string, index: number) => {
  const jsx = svg.replace(/<svg/, '<svg {...props} className="size-5"');
  const element = document.createElement("a");
  const file = new Blob(
    [
      `import React from 'react';
  
  interface IconProps extends React.SVGProps<SVGSVGElement> {}
  
  const Icon${index}: React.FC<IconProps> = (props) => (${jsx});
  
  export default Icon${index};
  `,
    ],
    { type: "text/plain" }
  );
  element.href = URL.createObjectURL(file);
  element.download = `icon-${index}.tsx`;
  document.body.appendChild(element);
  element.click();
};
