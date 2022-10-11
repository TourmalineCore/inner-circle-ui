import { useState } from 'react';

import { Modal } from '@tourmalinecore/react-tc-modal';
import { Button } from '@tourmalinecore/react-tc-ui-kit';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

import ContentCard from '../../components/ContentCard/ContentCard';
import DefaultCardHeader from '../../components/DefaultCardHeader/DefaultCardHeader';

function ModalPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <ContentCard
      isStickyHead
      headerContent={(
        <DefaultCardHeader>Modal Demo</DefaultCardHeader>
      )}
    >

      <Button
        onClick={() => setIsModalVisible(true)}
      >
        Open Modal
      </Button>

      {isModalVisible && (
        <Modal
          title="Modal title"
          subtitle="Modal subtitle"
          icon={<FontAwesomeIcon icon={faFlag} />}
          content="Modal content text"
          overlay
          onClose={() => setIsModalVisible(false)}
          showApply
          onApply={() => setIsModalVisible(false)}
          applyText="Apply"
          showCancel
          onCancel={() => setIsModalVisible(false)}
        />
      )}
    </ContentCard>
  );
}

export default ModalPage;
