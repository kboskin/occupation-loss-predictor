import { NextRequest, NextResponse } from 'next/server'
import * as Sentry from "@sentry/nextjs";
import AVAILABLE_LOCALES from './utils/available_locales';

// Regex to check whether something has an extension, e.g. .jpg
const PUBLIC_FILE = /\.(.*)$/

export async function middleware(req: NextRequest) {
  // Cookie locale
  const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value
  // console.log(cookieLocale)

  // Client country, defaults to us
  const country = req.geo?.country?.toLowerCase() || 'us'

  // Client language, defaults to en
  const language =
    req.headers
      .get('accept-language')
      ?.split(',')?.[0]
      .split('-')?.[0]
      .toLowerCase() || 'en'

  // Helpful console.log for debugging
  // console.log({
  //   country: country,
  //   language: language,
  //   cookieLocale: cookieLocale,
  // });

  try {
    // Early return if we do not need to or want to run middleware
    if (
      req.nextUrl.pathname.startsWith('/_next') ||
      req.nextUrl.pathname.includes('/api/') ||
      PUBLIC_FILE.test(req.nextUrl.pathname)
    ) {
      return
    }

    // Early return if we are on a locale other than default
    if (req.nextUrl.locale !== 'default') {
      return
    }

    // Early return if there is a cookie present and on default locale
    // We can redirect right away to the value of the cookie
    // Still falls back to en just in case
    if (cookieLocale && req.nextUrl.locale === 'default') {
      return NextResponse.redirect(
        new URL(
          `/${cookieLocale}${req.nextUrl.pathname}${req.nextUrl.search}`,
          req.url,
        ),
      )
    }

    for (let locale of AVAILABLE_LOCALES) {
        if (language === locale) {
            return NextResponse.redirect(
                new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url),
            )
        }
    }

    // Handle the default locale fallback to english
    if (req.nextUrl.locale === 'default') {
      return NextResponse.redirect(
        new URL(`/uk${req.nextUrl.pathname}${req.nextUrl.search}`, req.url),
      )
    }
  } catch (error) {
    // console.log(error)
    Sentry.captureException(error)
  }
}