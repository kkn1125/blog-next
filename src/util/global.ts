/* use server */
/* post file directory */
export const BLOG_PATH = process.env.BLOG_PATH as string;

/* use client */

export const AUTHOR = process.env.NEXT_PUBLIC_AUTHOR as string;
export const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME as string;
export const BRAND_DESC = process.env.NEXT_PUBLIC_BRAND_DESC as string;
export const NICKNAME = process.env.NEXT_PUBLIC_NICKNAME as string;
export const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY as string;
export const BASEPATH = "127.0.0.1";

/* resource path */
export const PROFILE = process.env.NEXT_PUBLIC_PROFILE as string;
export const BRAND_LOGO_PATH = process.env
  .NEXT_PUBLIC_BRAND_LOGO_PATH as string;

/* links */
export const BLOG = process.env.NEXT_PUBLIC_BLOG as string;
export const EMAIL = process.env.NEXT_PUBLIC_EMAIL as string;
export const GITHUB = process.env.NEXT_PUBLIC_GITHUB as string;
export const WIKI = process.env.NEXT_PUBLIC_WIKI as string;
export const PORTFOLIO = process.env.NEXT_PUBLIC_PORTFOLIO as string;

/* blog descriptions */
export const MAIN_SUBSCRIPTION = process.env
  .NEXT_PUBLIC_MAIN_SUBSCRIPTION as string;

/* resource urls */
export const BRAND_LARGE_COLOR_LOGO = `${BRAND_LOGO_PATH}/large_logo_color.png`;
export const BRAND_LARGE_COLOR_LOGO1 = `${BRAND_LOGO_PATH}/large_logo_color1.png`;
export const BRAND_LARGE_COLOR_LOGO2 = `${BRAND_LOGO_PATH}/large_logo_color2.png`;
export const BRAND_LARGE_COLOR_LOGO3 = `${BRAND_LOGO_PATH}/large_logo_color3.png`;
export const BRAND_LARGE_B_LOGO = `${BRAND_LOGO_PATH}/large_logo_black.png`;
export const BRAND_LARGE_BW_LOGO = `${BRAND_LOGO_PATH}/large_logo_black_white.png`;
export const BRAND_COLOR_LOGO = `${BRAND_LOGO_PATH}/logo_color.png`;
export const BRAND_B_LOGO = `${BRAND_LOGO_PATH}/logo_black.png`;
export const BRAND_BW_LOGO = `${BRAND_LOGO_PATH}/logo_black_white.png`;
export const BRAND_W_LOGO = `${BRAND_LOGO_PATH}/logo_white.png`;

/* blog brand logo */
export const BRAND_LOGO = BRAND_COLOR_LOGO;
export const MAIN_POST_LIMIT = 4;
