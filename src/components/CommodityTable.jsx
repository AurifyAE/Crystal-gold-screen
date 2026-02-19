import React from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";


const OUNCE = 31.103;
const AED = 3.674;

const UNIT_MULTIPLIER = {
  GM: 1,
  KG: 1000,
  TTB: 116.64,
  TOLA: 11.664,
  OZ: 31.103,
};

const CommodityTable = ({ commodities }) => {
  const { goldData, silverData } = useSpotRate();

  const getSpot = (metal) => {
    const lower = metal.toLowerCase();
    if (lower.includes("gold")) return goldData;
    if (lower.includes("silver")) return silverData;
    return null;
  };

  const purityFactor = (purity) =>
    purity ? purity / 10 ** String(purity).length : 1;

  const formatPrice = (value) => {
    if (value == null || isNaN(value)) return "—";
    const intLen = Math.floor(Math.abs(value)).toString().length;
    let decimals = 3;
    if (intLen >= 4) decimals = 0;
    else if (intLen === 3) decimals = 2;
    return value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const rows = commodities
    ?.map((item) => {
      const spot = getSpot(item.metal);
      if (!spot) return null;

      const mult = UNIT_MULTIPLIER[item.weight] || 1;
      const pur = purityFactor(item.purity);

      const baseBid = (spot.bid / OUNCE) * AED * mult * item.unit * pur;
      const baseAsk = (spot.ask / OUNCE) * AED * mult * item.unit * pur;

      const bid = baseBid + (Number(item.buyCharge) || 0) + (Number(item.buyPremium) || 0);
      const ask = baseAsk + (Number(item.sellCharge) || 0) + (Number(item.sellPremium) || 0);

      return {
        purity: item.purity,
        metal: item.metal,
        unit: `${item.unit} ${item.weight}`,
        bid,
        ask,
      };
    })
    .filter(Boolean) ?? [];

  return (
    <Box
      sx={{
        width: "100%",
        mt: "1.2vw",

      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "grid",
          // gridTemplateColumns: "1fr 1fr 1fr",
          background: 'linear-gradient( 90deg, rgba(72, 54, 12, 0.9) 0%, rgba(123, 93, 21, 0.9) 50%, rgba(72, 54, 12, 0.9) 100%)',
          gridTemplateColumns: "1fr 1fr 1fr  1fr",
          bgcolor: "rgba(18, 28, 35, 0.92)",
          borderBottom: "1px solid rgba(180, 140, 60, 0.38)",
     
          borderRadius: "0.8vw",
          overflow: "hidden",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.2vw",
            fontWeight: 600,
            color: "#e3c078",
            letterSpacing: "0.04vw",
            py: "1vw",
            px: "1.5vw",
            height:'100%',
             textAlign: "start",
          }}
        >
          Commodity
        </Typography>

        <Typography
          sx={{
            fontSize: "1.2vw",
            fontWeight: 600,
            color: "#e3c078",
            textAlign: "center",
            py: "1vw",
            px: "1.5vw",
            height:'100%',
 
          }}
        >
          Unit
        </Typography>

        {/* <Typography
          sx={{
            fontSize: "1.2vw",
            fontWeight: 600,
            color: "#e3c078",
            textAlign: "right",
            pr: "1.2vw",
          }}
        >
          BID
        </Typography> */}
        <Typography
          sx={{
            fontSize: "1.2vw",
            fontWeight: 600,
            color: "#e3c078",
            py: "1vw",
            px: "1.5vw",
            height:'100%',
 
            textAlign: "center",
            pr: "1.2vw",
          }}
        >
          CURRENCY
        </Typography>

        <Typography
          sx={{
            fontSize: "1.2vw",
            fontWeight: 600,
            py: "1vw",
            px: "1.5vw",
            height:'100%',
 
            color: "#e3c078",
            textAlign: "center",
          }}
        >
          ASK
        </Typography>
      </Box>

      {/* Rows */}
      {rows.length === 0 ? (
        <Typography
          sx={{
            py: "3vw",
            textAlign: "center",
            color: "rgba(227,192,120,0.4)",
            fontSize: "1.25vw",
          }}
        >
          No data available
        </Typography>
      ) : (
        rows.map((row, index) => (
          <>
            <Box
              key={index}
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr  1fr",
                alignItems: "end",
                borderBottom: index < rows.length - 1 ? "1px solid rgba(80,90,100,0.18)" : "none",
                background: index % 2 === 0 ? "#09331f" : "#0C2216",
                mt: '0.5vw',
                
              }}
              >
              <Typography
                sx={{
                  fontSize: "1.24vw",
                  fontWeight: 800,
                  color: "#CBA544",
                  display: 'flex',
                  alignItems: 'center ',
                  justifyContent: 'start',
                  gap: '0.3vw',
                  width: '100%',
                  py: "1vw",
                  px: "1.5vw",
                  height:'100%',
                  border: '1px solid #989454'

                }}
              >
                {row.metal}
                <Typography
                  sx={{
                    fontSize: "1vw",
                    fontWeight: 400,
                    color: "#CBA544",
                    // mb:'-0.5vw'
                  }}
                >
                  {row.purity}
                </Typography>
              </Typography>

              <Typography
                sx={{
                  fontSize: "1.18vw",
                  color: "#CBA544",
                  textAlign: "center",
                  py: "1vw",
                  px: "1.5vw",
                  height:'100%',
                  border: '1px solid #989454'
                }}
              >
                {row.unit}
              </Typography>

               
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5vw",
                   py: "1vw",
                  px: "1.5vw",
                  height:'100%',
                  border: '1px solid #989454'
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.32vw",
                    fontWeight: 600,
                    color: "#CBA544", // cyan/teal BID
                  }}
                >
                  AED
                </Typography>

              </Box>

              <Box
                sx={{
                
                  py: "1vw",
                  px: "1.5vw",
                  height:'100%',
                  border: '1px solid #989454'
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.32vw",
                    fontWeight: 600,
                    color: "#CBA544", // soft pink ASK
                  }}
                >
                  {formatPrice(row.ask)}
                </Typography>


              </Box>
            </Box>

          </>
        ))
      )}

    </Box>
  );
};

export default CommodityTable;