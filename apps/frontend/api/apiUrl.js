import React from 'react';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const API_URL = `${BASE_URL}/api`

export const loginUrl = `${API_URL}/auth/login`;

export const authUrl = `${API_URL}/auth/code`;

export const profileUrl = `${API_URL}/profile`;

export const profileUpdateUrl = `${API_URL}/profile/update`;

export const platformsUrl = `${API_URL}/platforms/?offset_from=0&offset_to=100`;

export const filtersUrl = `${API_URL}/filters`;

export const bookmarkPlatforms = `${API_URL}/filters/bookmark`;

export const termsUrl = `${API_URL}/terms`;

export const presetsUrl = `${API_URL}/filters/presets`;

export const onboardingUrl = `${API_URL}/onboarding`;

export const onePlatformsUrl = `${API_URL}/platforms/`;

export const bookmarkPlatform = `${API_URL}/platforms/bookmark`;

export default {
  loginUrl,
  authUrl,
  profileUrl,
  profileUpdateUrl,
  platformsUrl,
  filtersUrl,
  bookmarkPlatforms,
  termsUrl,
  presetsUrl,
  onboardingUrl,
  onePlatformsUrl,
  BASE_URL
};
