declare global {
  interface Window {
    gtag: (command: string, action: string, params?: object) => void
    dataLayer: unknown[]
    scrollDepth25?: boolean
    scrollDepth50?: boolean
    scrollDepth75?: boolean
    scrollDepth90?: boolean
  }
}

export {}
