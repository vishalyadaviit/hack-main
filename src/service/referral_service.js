
import * as ls from 'local-storage';

const STORE_KEY = 'localStore001';

export function addReferral(name, email, mobileNo) {
  const referrals = ls.get(STORE_KEY) || {};

  referrals[email] = { name, email, mobileNo };

  ls.set(STORE_KEY, referrals);
}

export function listReferrals() {
  const referrals = ls.get(STORE_KEY) || {};
  return referrals;
}
