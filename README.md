# TrastScore Scanner

TrastScore Scanner is a web application that allows users to assess the security of EVM smart contracts by simply pasting the contract address into a dedicated input field. The smart contract code is analyzed using AI, and a **trust score** is generated based on multiple security factors.  

This project was developed for **ETH Warsaw Spring Hack** to help developers and users quickly evaluate the trustworthiness of smart contracts before interacting with them.

## Features

- 🛠 **AI-Powered Security Analysis**: Uses advanced AI models to examine smart contract code for vulnerabilities.
- 🔍 **Comprehensive Trust Score**: Evaluates multiple security aspects, including:
  - Reentrancy attacks
  - Integer overflows and underflows
  - Access control issues
  - Unverified external calls
  - Other common Solidity vulnerabilities
- 📝 **User-Friendly Interface**: Paste the contract address and get an instant security assessment.
- ⚡️ **Fast and Reliable**: Analyzes contracts efficiently without requiring manual audits.

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/trastscore-scanner.git
   cd trastscore-scanner
