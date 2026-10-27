
import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import './App.css';

const alchemy = new Alchemy({
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
});

function App() {
  const [block, setBlock] = useState(null);
  const [blockNumber, setBlockNumber] = useState('');
  const [txHash, setTxHash] = useState('');
  const [transaction, setTransaction] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
const [walletBalance, setWalletBalance] = useState(null);

  useEffect(() => {
    async function loadLatestBlock() {
      try {
        setLoading(true);
        const number = await alchemy.core.getBlockNumber();
        const result = await alchemy.core.getBlock(number);
        setBlock(result);
        setBlockNumber(String(number));
      } catch (err) {
        console.error(err);
        setError('Could not load the latest block. Check your API key and connection.');
      } finally {
        setLoading(false);
      }
    }

    loadLatestBlock();
  }, []);

  
  async function searchBlock(event) {
    event.preventDefault();
    setError('');
    setTransaction(null);
    setReceipt(null);

    if (!/^\d+$/.test(blockNumber)) {
      setError('Enter a valid block number.');
      return;
    }

    try {
      setLoading(true);
      const latest = await alchemy.core.getBlockNumber();

      if (Number(blockNumber) > latest) {
        throw new Error('That block number is higher than the latest block.');
      }

      const result = await alchemy.core.getBlock(Number(blockNumber));

      if (!result) {
        throw new Error('Block not found.');
      }

      setBlock(result);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Could not load block.');
      setBlock(null);
    } finally {
      setLoading(false);
    }
  }

  async function searchTransaction(event) {
    event.preventDefault();
    setError('');
    setBlock(null);
    setTransaction(null);
    setReceipt(null);

    const hash = txHash.trim();

    if (!/^0x[a-fA-F0-9]{64}$/.test(hash)) {
      setError('Enter a valid 66-character transaction hash starting with 0x.');
      return;
    }

    try {
      setLoading(true);

      const tx = await alchemy.core.getTransaction(hash);

      if (!tx) {
        throw new Error('Transaction not found. Check the hash and network.');
      }

      const txReceipt = await alchemy.core.getTransactionReceipt(hash);

      setTransaction(tx);
      setReceipt(txReceipt);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Could not load transaction.');
    } finally {
      setLoading(false);
    }
  }
async function searchWallet(event) {
  event.preventDefault();

  setError('');
  setBlock(null);
  setTransaction(null);
  setReceipt(null);
  setWalletBalance(null);

  const address = walletAddress.trim();

  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    setError('Enter a valid Ethereum wallet address.');
    return;
  }

  try {
    setLoading(true);

    const balance = await alchemy.core.getBalance(address);

    setWalletBalance({
      address,
      eth: (Number(balance.toString()) / 1e18).toFixed(6),
    });
  } catch (err) {
    console.error(err);
    setError('Could not load wallet balance. Check your connection and API key.');
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="App">
      <h1>Ethereum Block Explorer</h1>

      <section className="search-section">
        <h2>Search by Block Number</h2>
        <form onSubmit={searchBlock}>
          <input
            type="number"
            min="0"
            step="1"
            placeholder="Enter block number"
            value={blockNumber}
            onChange={(event) => setBlockNumber(event.target.value)}
          />
          <button type="submit" disabled={loading}>Search Block</button>
        </form>
      </section>

      <section className="search-section">
        <h2>Search by Transaction Hash</h2>
        <form onSubmit={searchTransaction}>
          <input
            type="text"
            placeholder="0x..."
            value={txHash}
            onChange={(event) => setTxHash(event.target.value)}
          />
          <button type="submit" disabled={loading}>Search Transaction</button>
        </form>
      </section>
             
          <section className="search-section">
  <h2>Search by Wallet Address</h2>

  <form onSubmit={searchWallet}>
    <input
      type="text"
      placeholder="Enter Ethereum wallet address (0x...)"
      value={walletAddress}
      onChange={(event) => setWalletAddress(event.target.value)}
    />

    <button type="submit" disabled={loading}>
      Search Wallet
    </button>
  </form>
</section>

      {loading && <p>Loading blockchain data...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && block && (
        <div className="block-details">
          <h2>Block Details</h2>
          <p><strong>Block Number:</strong> {block.number}</p>
          <p><strong>Block Hash:</strong><br /><code>{block.hash}</code></p>
          <p><strong>Timestamp:</strong> {new Date(block.timestamp * 1000).toLocaleString()}</p>
          <p><strong>Transactions:</strong> {block.transactions.length}</p>
          <p><strong>Gas Used:</strong> {block.gasUsed.toString()}</p>
          <p><strong>Gas Limit:</strong> {block.gasLimit.toString()}</p>
          <p><strong>Miner / Fee Recipient:</strong><br /><code>{block.miner}</code></p>
        </div>
      )}

      {!loading && transaction && (
        <div className="block-details">
          <h2>Transaction Details</h2>
          <p><strong>Transaction Hash:</strong><br /><code>{transaction.hash}</code></p>
          <p><strong>Block Number:</strong> {transaction.blockNumber ?? 'Pending'}</p>
          <p><strong>From:</strong><br /><code>{transaction.from}</code></p>
          <p><strong>To:</strong><br /><code>{transaction.to || 'Contract creation'}</code></p>
          <p><strong>Value:</strong> {transaction.value.toString()} wei</p>
          <p><strong>Gas Limit:</strong> {transaction.gasLimit.toString()}</p>
          <p><strong>Gas Price:</strong> {transaction.gasPrice?.toString() ?? 'Not available'} wei</p>
          <p>
            <strong>Status:</strong>{' '}
            {!receipt
              ? 'Receipt unavailable'
              : receipt.status === 1
                ? 'Successful'
                : 'Failed'}
          </p>
          <p><strong>Gas Used:</strong> {receipt?.gasUsed?.toString() ?? 'Not available'}</p>
        </div>
      )}

      {!loading && walletBalance && (
  <div className="block-details">
    <h2>Wallet Details</h2>

    <p>
      <strong>Address:</strong>
      <br />
      <code>{walletBalance.address}</code>
    </p>

    <p>
      <strong>ETH Balance:</strong> {walletBalance.eth} ETH
    </p>

    <p>
      <a
        href={`https://etherscan.io/address/${walletBalance.address}`}
        target="_blank"
        rel="noreferrer"
      >
        View wallet on Etherscan
      </a>
    </p>
  </div>
)}
    </div>
  );
}

export default App;
