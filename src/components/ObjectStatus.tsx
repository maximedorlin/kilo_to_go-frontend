import React from "react";

// Définition des types pour les props du composant Rectangle
interface RectangleProps {
  content: string;
  zIndex: number;
  backgroundColor: string;
}

// Composant Rectangle
export const Rectangle: React.FC<RectangleProps> = ({
  content,
  zIndex,
  backgroundColor,
}) => {
  return (
    <div
      className="relative w-full h-11"
      style={{
        backgroundColor,
        zIndex,
      }}
    >
      <div
        className="absolute top-0 right-[-25px] w-0 h-0"
        style={{
          borderTop: "22px solid transparent",
          borderBottom: "22px solid transparent",
          borderLeft: `25px solid ${backgroundColor}`,
          zIndex,
        }}
      />
      <span className="absolute inset-0 flex items-center justify-center text-white">
        {content}
      </span>
    </div>
  );
};

// Définition des types pour les props du composant RectangleSingle
interface RectangleSingleProps {
  content: string;
  zIndex: number;
  backgroundColor: string;
}

// Composant RectangleSingle
export const RectangleSingle: React.FC<RectangleSingleProps> = ({
  content,
  zIndex,
  backgroundColor,
}) => {
  return (
    <div
      className="relative w-full h-11 px-4"
      style={{
        backgroundColor,
        zIndex,
      }}
    >
      <span className="absolute inset-0 flex items-center justify-center text-white px-6">
        {content}
      </span>
    </div>
  );
};

// Composant principal AppBARR
const ObjectStatus: React.FC = () => {
  return (
    <div className="flex w-full">
      <Rectangle content="Rectangle 1" zIndex={4} backgroundColor="gray" />
      <Rectangle content="Rectangle 2" zIndex={3} backgroundColor="#6e6e6e" />
      <Rectangle content="Rectangle 3" zIndex={2} backgroundColor="gray" />
      <RectangleSingle
        content="Single Rectangle"
        zIndex={1}
        backgroundColor="gray"
      />
    </div>
  );
};

export default ObjectStatus;
