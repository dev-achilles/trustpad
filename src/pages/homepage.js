import React, { useState } from "react";
import "./homepage.css";
import "./mobile.css";
import { ethers, Signer } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./utils/config";
export const Homepage = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  //Contract Connection
  const Contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    provider
  );
  const [state, setState] = useState({
    isJoined: false,
    balance: 0,
    address: "hjsdsah",
    image: "",
  });

  const connectWallet = async () => {
    const result = await provider.send("eth_requestAccounts", []);

    const balance = await provider.getBalance(result[0]);

    localStorage.setItem("address", result[0]);

    setState({
      ...state,
      address: result[0],
      balance: ethers.utils.formatEther(balance),
      isJoined: true,
    });
    //console.log(state);
  };

  const getAddressFromLocal = () => {
    const address = localStorage.getItem("address");
    // console.log(address);

    if (address && !state.isJoined) {
      connectWallet();
    }
  };

  getAddressFromLocal();

  const JoinAirDrop = async () => {
    const signer = provider.getSigner();
    const contract = Contract.connect(signer);

    const price = ethers.utils.parseUnits("1", "ether");

    const result = await contract.join({ value: price });

    console.log(result);
  };
  return (
    <section className="homepage">
      <header>
        <div className="left">
          <img
            src="https://trustpad-defi.org/img/tpad-logo-img.5eaa1084.9890389c.svg"
            alt="trust-pad-logo"
          />
          <div className="logo-words">
            <h1>TRUSTPAD-DEFI</h1>
            <p>The #1 Multi-Chain Launchpad.</p>
          </div>
        </div>

        <div className="right">
          {state.isJoined ? (
            <div className="is-joined-payload">
              <p>{state.balance} ETH</p>
              <p className="addr">{state.address.slice(0, 7)}</p>
              <img src="" height={10} />
            </div>
          ) : (
            <p onClick={() => connectWallet()} className="con">
              Connect Wallet
            </p>
          )}

          <h5>{new Date().toDateString()}</h5>
        </div>
      </header>

      <section className="middle">
        <div className="left">
          <div className="storm-header">
            <img
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/2297.png"
              alt="storm-logo"
            />
            <div className="storm-write">
              <h1>STORMX</h1>
              <h5>
                <i className="fa fa-unlock-alt"></i>Opening
              </h5>
            </div>
          </div>

          <div className="connect">
            {!state.isJoined ? (
              <>
                <h5>Connect your wallet to get started.</h5>
                <p onClick={() => connectWallet()}>Connect Wallet</p>
              </>
            ) : (
              <p onClick={() => JoinAirDrop()}>Join Airdrop</p>
            )}

            {/* <p>Join Airdrop</p> */}
          </div>

          <h3>Claim $500 in STMX</h3>

          <label>Total Claimed</label>
          <br></br>
          <progress min="0" value="91.62" max="100">
            91.62
          </progress>
          <p className="total">Total airdrop pool: $250000 STMX</p>
        </div>

        <div className="right">
          <div className="header">
            <img
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/2297.png"
              alt="storm-logo"
            />
            <h1>STORMX</h1>
          </div>

          <p className="storm-writeup">
            Founded in 2015, StormX is one of the first global
            cryptocurrency-based solutions to reach worldwide markets. As a
            mobile app and browser extension, StormX aims to bring users
            cashback in crypto for most of their online purchases. With
            enterprise partners like Samsung, Nike and Lego. StormX also allows
            users to stake the native STMX token to boost their rewards.
          </p>

          <img
            className="banner"
            src="https://i.imgur.com/VEdzwGa.jpg"
            alt="storm-image"
          />

          <div className="links">
            <i className="fab fa-telegram"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-firefox"></i>
          </div>

          <h2>TOKEN</h2>
          {/* <ul> */}
          <li>
            Token: <span>StormX</span>
          </li>
          <li>Type: ERC-20</li>
          <li>Total Supply: 10,000,000,000 STMX</li>
          <li>
            Market Cap: <span>$210,617,832</span>
          </li>
          {/* </ul> */}

          <h2>Distribution</h2>
          {/* <ul> */}
          <li>Distribution: Claimed via Airdrop</li>
          {/* </ul> */}
        </div>
      </section>

      <section className="footer">
        <p>
          Participants/Citizens from the following countries are strictly
          excluded/not allowed to participate in the IDOs: Bolivia, Cambodia,
          Iran, Iraq, Libya, Nepal, Zimbabwe, Liberia, Myanmar, North Korea. ©
          Copyright LaunchPad 2022. All rights reserved.
        </p>
      </section>
    </section>
  );
};
