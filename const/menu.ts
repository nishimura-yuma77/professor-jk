import { XTWITTER_LINK, YOUTUBE_LINK } from "@/const/constants"

export const MENU = {
  home: {
    label: "HOME",
    href: "/",
  },
  contact: {
    label: "CONTACT",
    href: "/contact",
  },
} as const

export const EXTERNAL_MENU = {
  youtube: {
    label: "YOUTUBE",
    href: YOUTUBE_LINK,
  },
  xTwitter: {
    label: "X / TWITTER",
    href: XTWITTER_LINK,
  },
} as const
