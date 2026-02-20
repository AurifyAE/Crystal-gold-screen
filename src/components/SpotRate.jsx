import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";

import goldImg from "/icons/gold-biscut.png";
import silverImg from "/icons/silver-biscut.png";

const SpotRate = () => {
  const { goldData, silverData } = useSpotRate();
  const [goldBidDir, setGoldBidDir] = useState("neutral");
  const [goldAskDir, setGoldAskDir] = useState("neutral");
  const [silverBidDir, setSilverBidDir] = useState("neutral");
  const [silverAskDir, setSilverAskDir] = useState("neutral");

  const prev = useRef({
    goldBid: null,
    goldAsk: null,
    silverBid: null,
    silverAsk: null,
  });

  const detectChange = (prevVal, currVal, setDir) => {
    if (prevVal === null) return currVal;

    if (currVal > prevVal) {
      setDir("rise");
      setTimeout(() => setDir("neutral"), 800);
    } else if (currVal < prevVal) {
      setDir("fall");
      setTimeout(() => setDir("neutral"), 800);
    }

    return currVal;
  };

  useEffect(() => {
    prev.current.goldBid = detectChange(prev.current.goldBid, goldData.bid, setGoldBidDir);
  }, [goldData.bid]);

  useEffect(() => {
    prev.current.goldAsk = detectChange(prev.current.goldAsk, goldData.ask, setGoldAskDir);
  }, [goldData.ask]);

  useEffect(() => {
    prev.current.silverBid = detectChange(prev.current.silverBid, silverData.bid, setSilverBidDir);
  }, [silverData.bid]);

  useEffect(() => {
    prev.current.silverAsk = detectChange(prev.current.silverAsk, silverData.ask, setSilverAskDir);
  }, [silverData.ask]);



  const MetalPanel = ({ metalImg, data, bidDir, askDir, theme }) => {
    const isGold = theme === "gold";

    return (
      <Box
        sx={{
          background: 'hsla(0 100% 45.1% / 0.01)',
          borderRadius: "1.2vw",
          padding: "1vw 0vw ",
          border: "0.12vw solid #c9a227",
          boxShadow: "0 0 2vw rgba(201,162,39,0.25)",
          color: "#fff",
          backdropFilter: 'blur(10px)'
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: '1fr 1fr 1fr',
            alignItems: 'center',
            // gap: "2vw",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: 'column',
              alignItems: "center",
              gap: "0.5vw",
            }}
          >

            <Box
              component="img"
              src={metalImg}
              sx={{
                width: "3.5vw",
                height: "3.5vw",
                objectFit: "contain",
              }}
            />
            <Typography
              sx={{
                fontSize: "2vw",
                fontWeight: 800,
                letterSpacing: "0.2vw",
                color: isGold ? "#FFD700" : "#C0C0C0",
              }}
            >
              {isGold ? "GOLD" : "SILVER"}
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              textAlign: "center",
              position: 'relative'
            }}
          >
            <Box
              sx={{
                height: '100%',
                width: "2px",
                backgroundImage: 'linear-gradient(to bottom,transparent,#c9a227,transparent)',
                position: 'absolute',
                left: '0px',
                top: '0px',

              }}
            />
            <Typography
              sx={{
                fontSize: "2.5vw",
                fontWeight: 700,
                color: "#dcdcdc",
              }}
            >
              BID $
            </Typography>

            <Typography
              sx={{
                fontSize: "2.5vw",
                fontWeight: 800,
                color:
                  bidDir === "rise"
                    ? "#00ff9d"
                    : bidDir === "fall"
                      ? "#FF113D"
                      : "#ffffff",
                transition: "0.3s",
              }}
            >
              {data.bid?.toLocaleString()}
            </Typography>

            <Typography
              sx={{
                fontSize: "1.5vw",
                fontWeight: 600,
                color: "#aaa",
              }}
            >
              LOW{" "}
              <span style={{ color: "#ff3b3b", fontWeight: 700 }}>
                {data.low}
              </span>
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              textAlign: "center",
              position: 'relative'
            }}
          >
            <Box
              sx={{
                height: '100%',
                width: "2px",
                backgroundImage: 'linear-gradient(to bottom,transparent,#c9a227,transparent)',
                position: 'absolute',
                left: '0px',
                top: '0px',
              }}
            />

            <Typography
              sx={{
                fontSize: "2.5vw",
                fontWeight: 700,
                color: "#dcdcdc",
              }}
            >
              ASK $
            </Typography>

            <Typography
              sx={{
                fontSize: "2.5vw",
                fontWeight: 800,
                color:
                  askDir === "rise"
                    ? "#00ff9d"
                    : askDir === "fall"
                      ? "#ff4d6d"
                      : "#ffffff",
                transition: "0.3s",
              }}
            >
              {data.ask?.toLocaleString()}
            </Typography>

            <Typography
              sx={{
                fontSize: "1.5vw",
                fontWeight: 600,
                color: "#aaa",
              }}
            >
              HIGH{" "}
              <span style={{ color: "#00ff66", fontWeight: 700 }}>
                {data.high}
              </span>
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };



  return (
    <Box  >
      <Box sx={{ display: "grid", gridTemplateColumns: '1fr 1fr', gap: "2vw" }}>
        <MetalPanel
          // titleImg={goldLabel}
          metalImg={goldImg}
          data={goldData}
          bidDir={goldBidDir}
          askDir={goldAskDir}
          theme="gold"
        />

        <MetalPanel
          // titleImg={silverLabel}
          metalImg={silverImg}
          data={silverData}
          bidDir={silverBidDir}
          askDir={silverAskDir}
          theme="silver"
        />
      </Box>


    </Box>
  );
};

export default SpotRate;