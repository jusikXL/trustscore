import axios from "axios";

// Regular expression for EVM addresses
const EVM_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

/**
 * Validates if a string is a valid EVM address
 */
export const validateAddress = (address: string): boolean => {
  // Basic validation: 0x followed by 40 hex characters
  return EVM_ADDRESS_REGEX.test(address);
};

const API_KEY = "F23WAAZaPK5KBuTfASuGi7HpO5FKf9dH6t5yoSnJ"

async function fetchTokenInfo(tokenAddress: string) {
  try {
    const response = await axios.get(`https://check-api.quillai.network/api/v1/tokens/information/${tokenAddress}?8453`, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching token information:", error);
  }
}

/**
 * Mock function to simulate scanning a contract for trust issues
 * In a real implementation, this would call an API service
 */
export const scanContract = async (address: string): Promise<any> => {
  console.log(`Scanning contract at address: ${address}`);
  
  let response = await fetchTokenInfo(address);
  console.log(response);
  
  // Generate deterministic but pseudo-random results based on address
  // This is just for demo purposes - a real implementation would use actual analysis
  const seed = Array.from(address.toLowerCase()).reduce(
    (sum, char) => sum + char.charCodeAt(0), 0
  );
  
  const random = (min: number, max: number) => {
    const rnd = Math.sin(seed * (Math.floor(min) + 1)) * 10000;
    return Math.floor((rnd - Math.floor(rnd)) * (max - min + 1)) + min;
  };
  
  // Generate a score between 0-100
  const score = random(0, 100);
  
  // Generate risk factors based on the score
  const availableRisks = [
    "Unverified source code",
    "No formal security audit",
    "Centralized admin controls",
    "Known reentrancy vulnerabilities",
    "Uses deprecated Solidity patterns",
    "Contains self-destruct capability",
    "Unlimited token approvals",
    "High gas usage patterns",
    "Proxy implementation with storage conflicts"
  ];
  
  const availablePositives = [
    "Verified source code",
    "Multiple security audits",
    "Time-locked admin functions",
    "No centralized control mechanisms",
    "Uses recent Solidity version",
    "Implementation follows EIP standards",
    "Low complexity code",
    "Community-reviewed",
    "Transparent upgradeability pattern"
  ];
  
  // Select a subset of risks based on the score
  const riskFactors = score < 85 
    ? availableRisks.slice(0, Math.floor((100 - score) / 15)) 
    : [];
    
  // Select a subset of positives based on the score
  const positiveFactors = availablePositives.slice(0, Math.floor(score / 15));
  
  // Determine audit status
  let auditStatus: "verified" | "unverified" | "issues" = "unverified";
  if (score >= 70) {
    auditStatus = "verified";
  } else if (score < 40) {
    auditStatus = "issues";
  }
  
  // Source code verification
  const verifiedSource = score > 50;
  
  // Generate a recommendation
  let recommendation = "";
  if (score >= 85) {
    recommendation = "This contract appears to be well-constructed and secure. Standard precautions are advised but no specific concerns were identified.";
  } else if (score >= 70) {
    recommendation = "This contract is generally trustworthy, but consider reviewing the identified minor concerns before engaging with high-value transactions.";
  } else if (score >= 50) {
    recommendation = "Exercise caution when interacting with this contract. Consider consulting with a security expert before proceeding with significant transactions.";
  } else if (score >= 30) {
    recommendation = "This contract has significant security concerns. We recommend avoiding interactions unless you fully understand the associated risks.";
  } else {
    recommendation = "This contract has critical security issues. We strongly advise against any interaction with this contract.";
  }
  
  return {
    address,
    score,
    verifiedSource,
    auditStatus,
    riskFactors,
    positiveFactors,
    recommendation
  };
};
