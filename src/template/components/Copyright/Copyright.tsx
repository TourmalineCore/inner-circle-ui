export function Copyright() {
  return (
    <div className="copyright">
      made by
      {` `}
      <a
        className="copyright__link"
        href="https://tourmalinecore.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Tourmaline Core
      </a>
      {` `}
      2022 -
      {` `}
      {new Date()
        .getFullYear()}
    </div>
  )
}
