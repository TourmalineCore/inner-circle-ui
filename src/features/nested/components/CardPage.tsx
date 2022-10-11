import ContentCard from '../../../components/ContentCard/ContentCard';
import DefaultCardHeader from '../../../components/DefaultCardHeader/DefaultCardHeader';

function CardPage() {
  return (
    <ContentCard
      isStickyHead
      headerContent={(
        <DefaultCardHeader>This is content card with sticky head</DefaultCardHeader>
      )}
    >
      <div style={{ height: 2000, backgroundColor: '#f8fcff' }} />
    </ContentCard>
  );
}

export default CardPage;
