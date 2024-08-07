import { IDictionary } from "@/model";

const cardsDictionary: IDictionary<string> = {
  "603799": "melli",
  "589210": "sepah",
  "627961": "sanatmadan",
  "603770": "keshavarsi",
  "628023": "maskan",
  "627760": "postbank",
  "502908": "tosehe",
  "627412": "eghtesad",
  "622106": "parsian",
  "502229": "pasargad",
  "627488": "karafarin",
  "621986": "saman",
  "639346": "sina",
  "639607": "sarmaye",
  "502806": "shahr",
  "502938": "day",
  "603769": "saderat",
  "610433": "mellat",
  "627353": "tejarat",
  "585983": "tejarat",
  "589463": "refah",
  "627381": "ansar",
  "639370": "mehreqtesad",
  "639599": "ghavamin",
  "504172": "resalat",
  "636214": "ayandeh",
  "585947": "khavarmianeh",
};

const banks: IDictionary<string> = {
  "010": "markazi",
  "011": "sanatmadan",
  "012": "mellat",
  "013": "refah",
  "014": "maskan",
  "015": "sepah",
  "016": "keshavarzi",
  "017": "melli",
  "018": "tejarat",
  "019": "saderat",
  "021": "postbank",
  "051": "tosehe",
  "053": "karafarin",
  "054": "parsian",
  "055": "eghtesad",
  "056": "saman",
  "057": "pasargad",
  "058": "sarmaye",
  "062": "ayandeh",
  "070": "resalat",
  "078": "khavarmianeh",
};

const useBankHelpers = () => {
  const bankCardHelper = (cardnumber: string) => {
    function validateCard(code: string) {
      if (
        parseInt(code.substr(1, 10), 10) === 0 ||
        parseInt(code.substr(10, 6), 10) === 0
      )
        return false;
      let s = 0;
      let k;
      let d;
      for (let i = 0; i < 16; i++) {
        k = i % 2 === 0 ? 2 : 1;
        d = parseInt(code.substr(i, 1), 10) * k;
        s += d > 9 ? d - 9 : d;
      }
      return s % 10 === 0;
    }

    if (validateCard(cardnumber) === false) return null;

    const number = cardnumber.substring(6, -16);

    if (cardsDictionary[number]) return cardsDictionary[number];

    return null;
  };

  const shebaNumberHelper = (number: string) => {
    const iban = `IR${String(number)}`.trim().replace(/\s|-/g, "");
    const ibanRegex = /^IR\d{2}(\d{3})\d{19}$/;

    if (!number) return null;
    if (!iban.match(ibanRegex)) return null;

    const bank = iban.match(ibanRegex)?.[1];
    if (!bank) return null;

    return banks[bank[1]];
  };

  return { bankCardHelper, shebaNumberHelper };
};

export { useBankHelpers };
