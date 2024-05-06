export const FOUNDATIONS = /*css*/ `
  @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz@6..12&display=swap');

  :root {
    /* COLORS - PRIMARY */
    --color-primary-100: #282B67;
    --color-primary-80: #575A99;
    --color-primary-60: #8487C2;
    --color-primary-40: #D0D1E5;
    --color-primary-20: #F1F1F8;
    --color-primary-10: #FFFFFF;
    /* COLORS - DECORATIVE-A */
    --color-decorative-a-100: #D66600;
    --color-decorative-a-80: #FFB36E;
    --color-decorative-a-70: #FFCA9A;
    --color-decorative-a-40: #FFE1C5;
    --color-decorative-a-10: #FFF7F1;
    /* COLORS - DECORATIVE-B */
    --color-decorative-b-100: #29897E;
    --color-decorative-b-80: #48F4DF;
    --color-decorative-b-70: #7FF7E9;
    --color-decorative-b-40: #B6FBF2;
    --color-decorative-b-10: #EDFEFC;
    /* COLORS - DECORATIVE-C */
    --color-decorative-c-100: #994D96;
    --color-decorative-c-80: #FF81FA;
    --color-decorative-c-70: #FFA7FC;
    --color-decorative-c-40: #FFCDFD;
    --color-decorative-c-10: #FFF2FF;
    /* COLORS - DECORATIVE-D */
    --color-decorative-d-100: #526299;
    --color-decorative-d-80: #8DA4FF;
    --color-decorative-d-70: #AEBFFF;
    --color-decorative-d-40: #D1DBFF;
    --color-decorative-d-10: #F3F6FF;
    /* MEASURES */
    --measure-1: 1px;
    --measure-2: 2px;
    --measure-4: 4px;
    --measure-8: 8px;
    --measure-12: 12px;
    --measure-16: 16px;
    --measure-24: 24px;
    --measure-32: 32px;
    --measure-40: 40px;
    --measure-48: 48px;
    --measure-56: 56px;
    --measure-64: 64px;
    --measure-72: 72px;
    --measure-80: 80px;
    --measure-88: 88px;
    --measure-max: 100%;
    /* BOX SHADOW */
    --shadow-1: 0px 2px 12px 0px;
    /* TYPOGRAPHY - SIZE */
    --font-size-12: 12px;
    --font-size-14: 14px;
    --font-size-16: 16px;
    --font-size-18: 18px;
    --font-size-24: 24px;
    /* TYPOGRAPHY - WEIGHT */
    --font-weight-400: 400;
    --font-weight-500: 500;
    --font-weight-600: 600;
    --font-weight-700: 700;
  }

  * {
    font-family: "Nunito Sans", sans-serif;
    margin: 0;
    padding: 0;
    color: var(--color-primary-100);
    box-sizing: border-box;
  }

  #root {
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: column;
    gap: var(--measure-16);
    padding: var(--measure-16);
    height: 100vh;
  }
`;
