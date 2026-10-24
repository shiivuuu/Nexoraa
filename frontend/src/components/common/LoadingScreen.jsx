import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(20);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setProgress(60), 200);
    const t2 = setTimeout(() => setProgress(100), 500);
    const t3 = setTimeout(() => {
      setIsDone(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 300);
    }, 750);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#F5F0E8] text-[#252922] select-none"
        >
          <div className="flex flex-col items-center gap-6 max-w-xs w-full px-6 text-center">
            <span className="font-serif text-4xl tracking-tight text-[#244638]">
              NEXORA
            </span>

            <div className="w-full bg-[#E6DFD3] h-[2px] rounded-full overflow-hidden">
              <motion.div
                className="bg-[#244638] h-full"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>

            <span className="text-mono text-[11px] text-[#686B61] tracking-widest">
              TECHNOLOGY COLLECTIVE
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
