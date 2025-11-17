import './SearchBar.scss'

import SearchIcon from '../../assets/icons/icon-search.svg?react'

export const SearchBar = ({
  onChange,
}: {
  onChange: (value: string) => unknown,
}) => {
  return (
    <div className="search-bar">
      <SearchIcon />
      <input
        placeholder="Search for employee"
        className="search-bar__input"
        type="text"
        data-listener-added_4a42d730="true"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
