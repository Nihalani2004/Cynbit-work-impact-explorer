export function BrandLogo() {
  return (
    <svg
      className="brand__logo"
      viewBox="0 0 126 60"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="brand__loop"
        d="M29 6C14.7 6 3.5 16.7 3.5 30S14.7 54 29 54c12.2 0 21.3-10.8 31.8-24C70.7 17.5 79.6 6 92.1 6c14.3 0 25.4 10.7 25.4 24s-11.1 24-25.4 24c-12.5 0-21.4-11.5-31.3-24C50.3 16.9 41.2 6 29 6Z"
      />
      <text className="brand__letters brand__letters--left" x="13" y="38">YN</text>
      <text className="brand__letters brand__letters--right" x="77" y="38">BIT</text>
    </svg>
  )
}
