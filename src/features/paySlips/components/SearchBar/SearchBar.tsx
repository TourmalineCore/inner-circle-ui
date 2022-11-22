import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function SearchBar({ startDate, setStartDate } : { startDate : Date | null, setStartDate: React.Dispatch<React.SetStateAction<Date | null>> }) {
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      fixedHeight
      dateFormat="dd/MM/yyy"
      placeholderText="dd/mm/yyyy"
    />
  );
}

export default SearchBar;
