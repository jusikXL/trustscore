
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Scan } from "lucide-react";
import { ScanResult } from "./ScanResult";
import { validateAddress, scanContract } from "@/utils/scannerService";

export const ContractScanner: React.FC = () => {
  const { toast } = useToast();
  const [address, setAddress] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<any | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    if (!hasInteracted) setHasInteracted(true);
  };

  const handleScan = async () => {
    if (!address) {
      toast({
        title: "Error",
        description: "Please enter a contract address",
        variant: "destructive",
      });
      return;
    }

    if (!validateAddress(address)) {
      toast({
        title: "Invalid address",
        description: "Please enter a valid EVM contract address",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    setScanResults(null);

    try {
      // Simulate a network request
      const results = await scanContract(address);
      setScanResults(results);
      
      if (results.score > 70) {
        toast({
          title: "Analysis Complete",
          description: "This contract appears to be trustworthy",
          variant: "default",
        });
      } else if (results.score > 40) {
        toast({
          title: "Analysis Complete",
          description: "This contract has some potential issues",
          variant: "default",
        });
      } else {
        toast({
          title: "Caution",
          description: "This contract has significant trust issues",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze the contract",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsScanning(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleScan();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="glass-panel p-8 rounded-2xl">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-2 mb-6"
          >
            <h2 className="text-xl font-medium tracking-tight text-foreground">
              Contract Trust Scanner
            </h2>
            <p className="text-sm text-muted-foreground">
              Enter an EVM smart contract address to verify its trustworthiness
            </p>
          </motion.div>

          <div className="relative">
            <Input
              placeholder="0x123...abc"
              value={address}
              onChange={handleAddressChange}
              onKeyDown={handleKeyDown}
              className={`h-14 px-4 text-base rounded-xl border-2 transition-all bg-background/70 ${
                hasInteracted
                  ? validateAddress(address)
                    ? "border-green-500/50 focus-visible:ring-green-500/20"
                    : address
                    ? "border-red-500/50 focus-visible:ring-red-500/20"
                    : "border-input"
                  : "border-input"
              }`}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              {hasInteracted && address && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={validateAddress(address) ? "text-green-500" : "text-red-500"}
                >
                  {validateAddress(address) ? (
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex justify-center"
          >
            <Button
              onClick={handleScan}
              disabled={isScanning || !validateAddress(address)}
              className="w-full py-6 text-base font-medium rounded-xl transition-all bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg"
            >
              {isScanning ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2"
                >
                  <Scan className="h-5 w-5" />
                </motion.div>
              ) : (
                <Scan className="h-5 w-5 mr-2" />
              )}
              {isScanning ? "Scanning..." : "Scan Contract"}
            </Button>
          </motion.div>
        </div>

        {scanResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="mt-8"
          >
            <ScanResult results={scanResults} />
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

export default ContractScanner;
