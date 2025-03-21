
import React from "react";
import { motion } from "framer-motion";
import ContractScanner from "@/components/ContractScanner";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-background/80 px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-2"
        >
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              <path d="M8 11V5l8 3" />
            </svg>
          </div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-medium tracking-tight mb-2"
        >
          TrustScore Scanner
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground max-w-md mx-auto"
        >
          Analyze any EVM smart contract address instantly for potential security risks and trust factors
        </motion.p>
      </motion.div>
      
      <ContractScanner />
      
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xs text-muted-foreground mt-12 text-center"
      >
        <p>
          This tool provides an analysis for informational purposes only. Always conduct your own research.
        </p>
      </motion.footer>
    </div>
  );
};

export default Index;
