import { useContext } from 'react';
import { ThemeContext } from '../../theme/themeContext';

function ThemeColorPicker() {
  const { setThemeColor, themeColors } = useContext(ThemeContext);

  return (
    <div className="theme-color-picker">
      {themeColors.map((color: {
        key: string;
        pickerBtnColor: string;
      }) => (
        <button
          key={color.key}
          type="button"
          className="theme-color-picker__button"
          style={{
            backgroundColor: color.pickerBtnColor,
          }}
          onClick={() => setThemeColor(color.key)}
        />
      ))}
    </div>
  );
}

export default ThemeColorPicker;
