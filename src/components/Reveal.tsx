import { motion, type HTMLMotionProps } from "framer-motion";

export function Reveal({ delay = 0, blur = false, ...props }: HTMLMotionProps<"div"> & { delay?: number; blur?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: blur ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.2, 0.7, 0.2, 1] }}
      {...props}
    />
  );
}
