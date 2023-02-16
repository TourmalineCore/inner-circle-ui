import Indicators from './components/Indicators/Indicators';
import AnalyticsPageTable from './components/AnalyticsPageTable/AnalyticsPageTable';

import './AnalyticsPage.css';

function AnalyticsPage() {
  return (
    <>
      <AnalyticsPageTable />
      <Indicators />
    </>
  );
}

export default AnalyticsPage;
