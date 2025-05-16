export const LOGO = "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"

export const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer' + process.env.REACT_APP_GROQ_API_KEY
    }
  };

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w780"

export const BG_URL="https://assets.nflxext.com/ffe/siteui/vlv3/69bec183-9cc8-49d4-8fc2-08228d3c91b4/web/IN-en-20250414-TRIFECTA-perspective_c8273fb1-8860-4ff5-bd1c-c2c4b44d5f2a_small.jpg"

export const SUPPORTED_LANGUAGES = [

  {identifier: "en" , name: "English"},
  {identifier: "hindi" , name: "Hindi"},
  {identifier: "spanish" , name: "Spanish"},

]

export const GROQ_API_KEY = process.env.REACT_APP_TMDB_KEY