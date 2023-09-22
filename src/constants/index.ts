export const INSTALLED_KEY = Symbol('INSTALLED_KEY')

/** 1 month */
export const TOKEN_EXP = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30
