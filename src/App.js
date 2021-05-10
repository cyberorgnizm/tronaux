import { useState, useEffect } from "react";
import "./App.css";
import AppNavbar from "./components/Navbar";
import Hero from "./components/Hero";
import Description from "./components/Description";
import Guide from "./components/Guide";
import { DepositModal, StatisticsModal, InvestModal } from "./components/Modal";
import Contact from "./components/Contact";
import Contract from "./components/Contract";
import TronWebContext from "./contexts";

// =========================
// States variables
// =========================
const contractAddress = "TK24Fi6dTYnNxeihPcp36pPX5TmX2DY1Jx";
const abi = [
  {
    inputs: [
      { name: "marketingAddr", type: "address" },
      { name: "projectAddr", type: "address" },
    ],
    stateMutability: "Nonpayable",
    type: "Constructor",
  },
  {
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { name: "totalAmount", type: "uint256" },
    ],
    name: "FeePayed",
    type: "Event",
  },
  {
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "NewDeposit",
    type: "Event",
  },
  {
    inputs: [{ name: "user", type: "address" }],
    name: "Newbie",
    type: "Event",
  },
  {
    inputs: [
      { indexed: true, name: "referrer", type: "address" },
      { indexed: true, name: "referral", type: "address" },
      { indexed: true, name: "level", type: "uint256" },
      { name: "amount", type: "uint256" },
    ],
    name: "RefBonus",
    type: "Event",
  },
  {
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "Withdrawn",
    type: "Event",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    name: "BASE_PERCENT",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    name: "CONTRACT_BALANCE_STEP",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    name: "INVEST_MIN_AMOUNT",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    name: "MARKETING_FEE",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    name: "PERCENTS_DIVIDER",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    name: "PROJECT_FEE",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    inputs: [{ type: "uint256" }],
    name: "REFERRAL_PERCENTS",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    name: "TIME_STEP",
    stateMutability: "View",
    type: "Function",
  },
  {
    name: "destroyContract",
    stateMutability: "Nonpayable",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    name: "getContractBalance",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    name: "getContractBalanceRate",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    inputs: [{ name: "userAddress", type: "address" }],
    name: "getHoldBonus",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    inputs: [{ name: "userAddress", type: "address" }],
    name: "getUserAmountOfDeposits",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    inputs: [{ name: "userAddress", type: "address" }],
    name: "getUserAvailableBalanceForWithdrawal",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    inputs: [{ name: "userAddress", type: "address" }],
    name: "getUserCheckpoint",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }, { type: "uint256" }, { type: "uint256" }],
    constant: true,
    inputs: [
      { name: "userAddress", type: "address" },
      { name: "index", type: "uint256" },
    ],
    name: "getUserDepositInfo",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    inputs: [{ name: "userAddress", type: "address" }],
    name: "getUserDividends",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }, { type: "uint256" }, { type: "uint256" }],
    constant: true,
    inputs: [{ name: "userAddress", type: "address" }],
    name: "getUserDownlineCount",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    inputs: [{ name: "userAddress", type: "address" }],
    name: "getUserPercentRate",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    inputs: [{ name: "userAddress", type: "address" }],
    name: "getUserReferralBonus",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    inputs: [{ name: "userAddress", type: "address" }],
    name: "getUserReferralWithdraw",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "address" }],
    constant: true,
    inputs: [{ name: "userAddress", type: "address" }],
    name: "getUserReferrer",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    inputs: [{ name: "userAddress", type: "address" }],
    name: "getUserTotalDeposits",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    inputs: [{ name: "userAddress", type: "address" }],
    name: "getUserTotalWithdrawn",
    stateMutability: "View",
    type: "Function",
  },
  {
    payable: true,
    inputs: [{ name: "referrer", type: "address" }],
    name: "invest",
    stateMutability: "Payable",
    type: "Function",
  },
  {
    outputs: [{ type: "bool" }],
    constant: true,
    inputs: [{ name: "userAddress", type: "address" }],
    name: "isActive",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "address" }],
    constant: true,
    name: "marketingAddress",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "address" }],
    constant: true,
    name: "projectAddress",
    stateMutability: "View",
    type: "Function",
  },
  {
    inputs: [{ name: "_addr", type: "address" }],
    name: "removeWhitelist",
    stateMutability: "Nonpayable",
    type: "Function",
  },
  {
    inputs: [{ name: "_addr", type: "address" }],
    name: "setWhitelist",
    stateMutability: "Nonpayable",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    name: "totalDeposits",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    name: "totalInvested",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    name: "totalUsers",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    name: "totalWithdrawn",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "bool" }],
    constant: true,
    inputs: [{ type: "address" }],
    name: "whiteListed",
    stateMutability: "View",
    type: "Function",
  },
  { name: "withdraw", stateMutability: "Nonpayable", type: "Function" },
];

// =========================
// TronWeb hook
// =========================
function useTronWeb() {
  const [tronWeb, setTronWeb] = useState();

  useEffect(() => {
    let interval;

    if (!tronWeb) {
      interval = setInterval(() => {
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
          setTronWeb(window.tronWeb);
        }
      }, 3000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [tronWeb]);

  return tronWeb;
}

// ========================
// Component
// ========================
function App() {
  const [showDeposit, setShowDeposit] = useState(false);
  const [showStat, setShowStat] = useState(false);
  const [showInvest, setShowInvest] = useState(false);

  const handleShowDeposit = () => setShowDeposit(!showDeposit);
  const handleShowStat = () => setShowStat(!showStat);
  const handleShowInvest = () => setShowInvest(!showInvest);

  const tronWeb = useTronWeb();

  const contract = tronWeb && tronWeb.contract(abi, contractAddress);

  return (
    <>
      <AppNavbar
        onToggleDeposit={handleShowDeposit}
        onToggleStat={handleShowStat}
      />
      <TronWebContext.Provider value={tronWeb && tronWeb}>
        <div style={{overflowX: "hidden", maxWidth: "100vw"}}>
          <Hero contract={contract} onToggleDeposit={handleShowDeposit} />
          <Description contract={contract} />
          <Guide contract={contract} onToggleInvest={handleShowInvest} onToggleDeposit={handleShowDeposit}/>
          {/* Deposit Modal */}
          <DepositModal
            isOpen={showDeposit}
            onToggle={handleShowDeposit}
            contract={contract}
          />
          {/* Statistics Modal */}
          <StatisticsModal
            isOpen={showStat}
            onToggle={handleShowStat}
            contract={contract}
          />
          <InvestModal isOpen={showInvest} onToggle={handleShowInvest} />
          <Contract />
          <Contact
            onToggleDeposit={handleShowDeposit}
            onToggleStat={handleShowStat}
          />
        </div>
      </TronWebContext.Provider>
    </>
  );
}

export default App;
