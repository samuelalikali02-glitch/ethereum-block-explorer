
# Ethereum Block Explorer

A web application for exploring Ethereum blockchain data. Search for blocks, look up transaction hashes, inspect wallet addresses, and view ETH balances.

**[Live Demo](https://ethereum-block-explorer-two.vercel.app/) · [GitHub Repository](https://github.com/samuelalikali02-glitch/ethereum-block-explorer)**

## Project Preview

![Ethereum Block Explorer screenshot](screenshots/ethereum-block-explorer.jpg)

## Features

- **Block search:** Look up Ethereum blocks by block number.
- **Transaction search:** Search for a transaction using its hash.
- **Wallet lookup:** Retrieve information for a wallet address.
- **ETH balance:** Display the ETH balance associated with a wallet.
- **Etherscan link:** Navigate to the corresponding wallet on Etherscan.
- **Web deployment:** Access the application through its Vercel deployment.

## Technologies Used

- **React** — user interface.
- **JavaScript** — application logic.
- **Alchemy SDK** — access to Ethereum blockchain data.
- **React Router** — client-side navigation.
- **Git and GitHub** — source control and project hosting.
- **Vercel** — application deployment.

## Run Locally

### Prerequisites

Install [Node.js and npm](https://nodejs.org/). You will also need an Alchemy account and an Ethereum API key.

### 1. Clone the repository

```bash
git clone https://github.com/samuelalikali02-glitch/ethereum-block-explorer.git
```

### 2. Enter the project directory

```bash
cd ethereum-block-explorer
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure the API key

Create a `.env` file in the project root and add:

```env
REACT_APP_ALCHEMY_API_KEY=YOUR_ALCHEMY_API_KEY
```

Replace the placeholder with your own API key. Never commit your `.env` file or expose private credentials.

### 5. Start the application

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The application is deployed on Vercel:

https://ethereum-block-explorer-two.vercel.app/

For a production deployment, configure the required environment variables in your Vercel project settings and redeploy after making changes.

## What I Learned

- Accessing Ethereum blockchain data through an SDK.
- Working with block numbers, transaction hashes, and wallet addresses.
- Managing environment variables for API configuration.
- Using Git and GitHub to maintain a project.
- Deploying a React application with Vercel.

## Future Improvements

- Display detailed block and transaction information.
- Add clearer validation and error messages for invalid searches.
- Improve mobile responsiveness and accessibility.
- Add transaction history and additional wallet information.

## Author

**Samuel Alikali-Ojima**

- [Portfolio](https://samuelalikali02-glitch.github.io/#projects)
- [GitHub](https://github.com/samuelalikali02-glitch)

---

Built as a hands-on Web3 learning project.
