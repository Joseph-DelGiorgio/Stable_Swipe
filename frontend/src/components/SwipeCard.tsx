import React from "react";
import { motion, useAnimation } from "framer-motion";
import type { PanInfo } from "framer-motion";

export type SwipeCardProps = {
  name: string;
  age: number;
  bio: string;
  imageUri: string;
  onTip: () => void;
  onSuperLike: () => void;
  onSwipe: (dir: "left" | "right" | "up") => void;
  index: number;
};

const SwipeCard: React.FC<SwipeCardProps> = ({
  name,
  age,
  bio,
  imageUri,
  onTip,
  onSuperLike,
  onSwipe,
  index,
}) => {
  const controls = useAnimation();
  const [dragging, setDragging] = React.useState(false);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 120) {
      controls.start({ x: 500, opacity: 0 });
      onSwipe("right");
    } else if (info.offset.x < -120) {
      controls.start({ x: -500, opacity: 0 });
      onSwipe("left");
    } else if (info.offset.y < -100) {
      controls.start({ y: -500, opacity: 0 });
      onSwipe("up");
    } else {
      controls.start({ x: 0, y: 0 });
    }
    setDragging(false);
  };

  return (
    <motion.div
      className={`absolute w-full max-w-md select-none cursor-grab ${dragging ? "z-30" : "z-20"}`}
      style={{ top: index * 8, left: index * 8, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.18}
      onDragStart={() => setDragging(true)}
      onDragEnd={handleDragEnd}
      animate={controls}
      initial={{ scale: 1 - index * 0.04, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col items-center p-4">
        <img
          src={imageUri}
          alt={name}
          className="w-40 h-40 object-cover rounded-full border-4 border-blue-100 mb-4"
        />
        <h2 className="text-2xl font-bold mb-1">{name}, {age}</h2>
        <p className="text-gray-500 mb-3 text-center">{bio}</p>
        <div className="flex gap-4 mt-2">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-full text-xl shadow hover:bg-red-600"
            onClick={() => { controls.start({ x: -500, opacity: 0 }); onSwipe("left"); }}
            aria-label="Dislike"
          >❌</button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full text-xl shadow hover:bg-blue-600"
            onClick={onSuperLike}
            aria-label="Super Like"
          >⭐</button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-full text-xl shadow hover:bg-green-600"
            onClick={() => { controls.start({ x: 500, opacity: 0 }); onSwipe("right"); }}
            aria-label="Like"
          >💚</button>
          <button
            className="bg-yellow-400 text-white px-4 py-2 rounded-full text-xl shadow hover:bg-yellow-500"
            onClick={onTip}
            aria-label="Tip"
          >💸</button>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeCard;
