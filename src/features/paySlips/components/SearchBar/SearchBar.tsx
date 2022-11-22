import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SearchBar.css';

function SearchBar({ startDate, setStartDate } : { startDate : Date | null, setStartDate: React.Dispatch<React.SetStateAction<Date | null>> }) {
  return (
    <div className="search-bar">
      <div className="search-bar-icon">
        <FontAwesomeIcon size={'2xl' as SizeProp} icon={faCalendarAlt as IconProp} />
      </div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        fixedHeight
        dateFormat="dd/MM/yyy"
        placeholderText="dd/mm/yyyy"
      />
    </div>
  );
}

export default SearchBar;
