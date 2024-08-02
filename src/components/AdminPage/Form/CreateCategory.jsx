import { Button, Modal, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

// Action
import {
  handleCloseModalCreateCategoryAction,
  handleChangeNameCateAction
} from '../../../store/actions/admin/modal.action';
import { createCategoryAction } from '../../../store/actions/admin/apiRequest.action';

const CreateCategory = () => {
  const dispatch = useDispatch();
  const { user, token } = JSON.parse(sessionStorage.getItem('user'));
  const { createCategory } = useSelector(reduxData => reduxData.modalAdminReducer);
  const { open, name } = createCategory;

  const handleCreateCategory = () => {
    const category = {
      name
    }

    dispatch(createCategoryAction(category, token));
  }

  return (
    <Modal
      title="Create Category"
      open={open}
      footer={[
        <Button
          key="back"
          danger
          onClick={() => dispatch(handleCloseModalCreateCategoryAction())}
        >
          Cancel
        </Button>,

        <Button key="submit" onClick={() => handleCreateCategory()}>
          Create
        </Button>,
      ]}
      onCancel={() => dispatch(handleCloseModalCreateCategoryAction())}
    >
      <Input
        placeholder='Name Category'
        value={name}
        onChange={(e) => dispatch(handleChangeNameCateAction(e.target.value))}
      />
    </Modal>

  );
};

export default CreateCategory;