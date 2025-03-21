
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import TrustScoreIndicator from "./TrustScoreIndicator";
import { ArrowUpRight, Shield, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

interface ScanResultProps {
  results: {
    address: string;
    score: number;
    verifiedSource: boolean;
    auditStatus: "verified" | "unverified" | "issues";
    riskFactors: string[];
    positiveFactors: string[];
    recommendation: string;
  };
}

export const ScanResult: React.FC<ScanResultProps> = ({ results }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <Card className="overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.div variants={item} className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Trust Analysis</h3>
              <p className="text-sm text-muted-foreground truncate max-w-xs">
                {results.address}
              </p>
            </div>
            <TrustScoreIndicator score={results.score} />
          </motion.div>

          <Separator className="bg-border/50" />

          <motion.div variants={item} className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center justify-center text-center p-3 space-y-2">
              <div className={`p-2 rounded-full ${
                results.verifiedSource 
                  ? "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400" 
                  : "bg-yellow-100 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400"
              }`}>
                <Shield className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Source Code</span>
              <span className="text-xs text-muted-foreground">
                {results.verifiedSource ? "Verified" : "Unverified"}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center p-3 space-y-2">
              <div className={`p-2 rounded-full ${
                results.auditStatus === "verified" 
                  ? "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400" 
                  : results.auditStatus === "unverified"
                  ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400"
                  : "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400"
              }`}>
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Audit Status</span>
              <span className="text-xs text-muted-foreground capitalize">
                {results.auditStatus}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center p-3 space-y-2">
              <div className={`p-2 rounded-full ${
                results.riskFactors.length === 0 
                  ? "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400" 
                  : results.riskFactors.length < 3
                  ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400"
                  : "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400"
              }`}>
                <AlertTriangle className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Risk Factors</span>
              <span className="text-xs text-muted-foreground">
                {results.riskFactors.length} detected
              </span>
            </div>
          </motion.div>

          <Separator className="bg-border/50" />

          <motion.div variants={item} className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-1">
                <XCircle className="h-4 w-4 text-red-500" />
                Risk Factors
              </h4>
              <ul className="text-sm space-y-1 pl-5 list-disc">
                {results.riskFactors.length > 0 ? (
                  results.riskFactors.map((factor, index) => (
                    <li key={index} className="text-muted-foreground">
                      {factor}
                    </li>
                  ))
                ) : (
                  <li className="text-muted-foreground">No significant risks detected</li>
                )}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Positive Indicators
              </h4>
              <ul className="text-sm space-y-1 pl-5 list-disc">
                {results.positiveFactors.length > 0 ? (
                  results.positiveFactors.map((factor, index) => (
                    <li key={index} className="text-muted-foreground">
                      {factor}
                    </li>
                  ))
                ) : (
                  <li className="text-muted-foreground">No positive indicators found</li>
                )}
              </ul>
            </div>
          </motion.div>

          <motion.div 
            variants={item}
            className="bg-secondary/50 p-4 rounded-lg border border-border/50"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Recommendation</h4>
                <p className="text-sm text-muted-foreground">{results.recommendation}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="text-center">
            <a
              href={`https://etherscan.io/address/${results.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs text-primary hover:text-primary/80 transition-colors"
            >
              View on Etherscan
              <ArrowUpRight className="ml-1 h-3 w-3" />
            </a>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ScanResult;
